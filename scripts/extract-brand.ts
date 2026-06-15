#!/usr/bin/env npx tsx
/**
 * Extract brand colours and fonts from a client's existing website.
 *
 *   npm run extract-brand https://example.com
 *
 * Fetches the page, pulls colours from CSS, finds the logo/favicon,
 * then writes content/theme.json with your choices.
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline/promises";

const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run extract-brand <url>");
  process.exit(1);
}

// ---- Helpers ----

function normaliseHex(hex: string): string {
  hex = hex.toLowerCase().replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  return "#" + hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function isUsefulColour(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Skip near-white, near-black, and transparent greys
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2 / 255;
  const saturation = max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1)) / 255;
  return lightness > 0.1 && lightness < 0.92 && saturation > 0.08;
}

function extractColours(css: string): Map<string, number> {
  const counts = new Map<string, number>();

  // Hex colours
  for (const m of css.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    const hex = normaliseHex(m[0]);
    if (isUsefulColour(hex)) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  // rgb() / rgba()
  for (const m of css.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) {
    const hex = rgbToHex(+m[1], +m[2], +m[3]);
    if (isUsefulColour(hex)) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  return counts;
}

function findLogo(html: string, baseUrl: string): string | null {
  const base = new URL(baseUrl);

  // OG image
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og) return new URL(og[1], base.origin).href;

  // Apple touch icon
  const apple = html.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i);
  if (apple) return new URL(apple[1], base.origin).href;

  // Favicon
  const favicon = html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/i);
  if (favicon) return new URL(favicon[1], base.origin).href;

  return `${base.origin}/favicon.ico`;
}

function findFonts(html: string, css: string): string[] {
  const fonts = new Set<string>();
  for (const m of (html + css).matchAll(/font-family:\s*['"]?([A-Z][^'",;{}]+)/gi)) {
    const name = m[1].trim().replace(/['"\s]+$/, "");
    if (!["serif", "sans-serif", "monospace", "inherit", "initial", "system-ui"].includes(name.toLowerCase())) {
      fonts.add(name);
    }
  }
  return [...fonts].slice(0, 5);
}

// ---- Main ----

async function main() {
  console.log(`\nFetching ${url}…`);

  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; PageNest/1.0)" } });
  if (!res.ok) { console.error(`Failed to fetch: ${res.status}`); process.exit(1); }
  const html = await res.text();

  // Collect CSS: inline style tags + linked stylesheets (same origin only)
  let css = "";
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) css += m[1] + "\n";

  const base = new URL(url);
  const sheetLinks = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)];
  for (const m of sheetLinks.slice(0, 5)) {
    try {
      const sheetUrl = new URL(m[1], base.origin).href;
      if (new URL(sheetUrl).origin === base.origin) {
        const r = await fetch(sheetUrl);
        if (r.ok) css += await r.text() + "\n";
      }
    } catch {}
  }

  // Extract colours, sort by frequency
  const colourMap = extractColours(html + css);
  const colours = [...colourMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([hex]) => hex);

  const logoUrl = findLogo(html, url);
  const fonts = findFonts(html, css);

  // ---- Show results ----
  console.log("\n── Colours found (most common first) ──\n");
  colours.forEach((hex, i) => console.log(`  ${i + 1}. ${hex}`));

  if (fonts.length) {
    console.log("\n── Fonts found ──\n");
    fonts.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  }

  if (logoUrl) console.log(`\n── Logo/favicon ──\n  ${logoUrl}`);

  // ---- Ask for choices ----
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n── Map to theme ──\n");
  console.log("Enter the number from the list above, or type a custom hex value.\n");

  async function pick(label: string, fallback: string): Promise<string> {
    const answer = await rl.question(`${label} [${fallback}]: `);
    if (!answer.trim()) return fallback;
    const n = parseInt(answer);
    if (!isNaN(n) && colours[n - 1]) return colours[n - 1];
    if (/^#?[0-9a-fA-F]{3,6}$/.test(answer.trim())) return normaliseHex(answer.trim());
    return fallback;
  }

  const colorBrand    = await pick("Brand (primary) colour", colours[0] ?? "#2c5f2e");
  const colorAccent   = await pick("Accent (background highlight) colour", colours[1] ?? "#f5e6c8");
  const colorBrandDark = await pick("Dark variant of brand colour (hover states)", colours[2] ?? colorBrand);

  let fontHeading = "Georgia, serif";
  let fontBody    = "system-ui, sans-serif";

  if (fonts.length) {
    const fh = await rl.question(`Heading font [${fonts[0] ?? "Georgia"}]: `);
    fontHeading = fh.trim() ? `"${fh.trim()}", serif` : (fonts[0] ? `"${fonts[0]}", serif` : fontHeading);
    const fb = await rl.question(`Body font [${fonts[1] ?? fonts[0] ?? "system-ui"}]: `);
    fontBody = fb.trim() ? `"${fb.trim()}", sans-serif` : (fonts[1] ? `"${fonts[1]}", sans-serif` : fontBody);
  }

  rl.close();

  // ---- Work out readable text colour for brand background ----
  const r = parseInt(colorBrand.slice(1, 3), 16);
  const g = parseInt(colorBrand.slice(3, 5), 16);
  const b = parseInt(colorBrand.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const colorBrandText = luminance > 0.5 ? "#1a1a1a" : "#ffffff";

  // ---- Write theme.json ----
  const theme = { colorBrand, colorAccent, colorBrandDark, colorBrandText, fontHeading, fontBody };
  const themePath = path.join(process.cwd(), "content/theme.json");
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2) + "\n");

  console.log("\n✅ content/theme.json updated:\n");
  console.log(JSON.stringify(theme, null, 2));
  if (logoUrl) console.log(`\nLogo URL to download manually: ${logoUrl}`);
  console.log();
}

main().catch(console.error);
