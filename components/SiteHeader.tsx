"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-[var(--color-brand)] text-[var(--color-brand-text)] transition-shadow duration-200 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#top" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-heading)" }}>
          {site.name}
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="opacity-90 hover:opacity-100 transition-opacity">
              {item.label}
            </a>
          ))}
          {modules.orderOnline && (
            <a href="#contact" className="ml-2 bg-white/15 hover:bg-white/25 px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
              Order online
            </a>
          )}
        </nav>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span className={`block w-5 h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-1.5" : "mb-1.5"}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all ${open ? "opacity-0" : "mb-1.5"}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-[var(--color-brand-dark)] px-4 py-5 flex flex-col gap-5 text-sm font-medium border-t border-white/10">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="opacity-80 hover:opacity-100 transition-opacity" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
