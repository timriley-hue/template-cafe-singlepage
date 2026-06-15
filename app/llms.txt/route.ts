import { NextResponse } from "next/server";
import site from "@/content/site.json";
import hours from "@/content/hours.json";
import menu from "@/content/menu.json";
import home from "@/content/home.json";

export async function GET() {
  const menuSummary = menu.categories
    .map((cat) => {
      const items = cat.items.map((i) => `  - ${i.name} £${i.price}${i.dietary.length ? ` (${i.dietary.join(", ")})` : ""}`).join("\n");
      return `### ${cat.name}\n${items}`;
    })
    .join("\n\n");

  const hoursSummary = hours.hours.map((r) => `- ${r.days}: ${r.open}–${r.close}`).join("\n");
  const faqSummary = home.faq.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n");

  const text = `# ${site.name}

> ${site.tagline}

${site.name} is an independent cafe located at ${site.address}.

## Contact

- Address: ${site.address}
- Phone: ${site.phone}
- Email: ${site.email}

## Opening Hours

${hoursSummary}
${hours.notes ? `\n${hours.notes}` : ""}

## Menu

${menuSummary}

## Frequently Asked Questions

${faqSummary}
`;

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
