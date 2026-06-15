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

const themeVars = `
  :root {
    --color-brand: ${theme.colorBrand};
    --color-brand-dark: ${theme.colorBrandDark};
    --color-brand-text: ${theme.colorBrandText};
    --color-accent: ${theme.colorAccent};
    --font-heading: ${theme.fontHeading};
    --font-body: ${theme.fontBody};
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
