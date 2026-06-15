import type { Metadata } from "next";
import "./globals.css";
import site from "@/content/site.json";
import theme from "@/content/theme.json";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
};

const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.fontHeadingFamily)}:ital,wght@0,400;0,700;1,400&family=${encodeURIComponent(theme.fontBodyFamily)}:wght@400;500;600&display=swap`;

const themeVars = `
  :root {
    --color-brand: ${theme.colorBrand};
    --color-brand-dark: ${theme.colorBrandDark};
    --color-brand-text: ${theme.colorBrandText};
    --color-accent: ${theme.colorAccent};
    --font-heading: "${theme.fontHeadingFamily}", Georgia, serif;
    --font-body: "${theme.fontBodyFamily}", system-ui, sans-serif;
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsUrl} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
