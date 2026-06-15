"use client";

import { useState } from "react";
import site from "@/content/site.json";
import modules from "@/content/modules.json";

const baseNav = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery", module: "gallery" },
  { label: "Contact", href: "#contact" },
];

const nav = baseNav.filter(
  (item) => !("module" in item) || modules[item.module as keyof typeof modules]
);

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-brand)] text-[var(--color-brand-text)] shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#top" className="font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {site.name}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:opacity-75 transition-opacity">
              {item.label}
            </a>
          ))}
          {modules.orderOnline && (
            <a
              href="#contact"
              className="bg-[var(--color-brand-text)] text-[var(--color-brand)] px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Order online
            </a>
          )}
        </nav>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-[var(--color-brand-dark)] px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:opacity-75 transition-opacity" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
