import site from "@/content/site.json";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-text)]">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-bold" style={{ fontFamily: "var(--font-heading)" }}>{site.name}</p>
        <p className="opacity-60 text-xs">{site.address}</p>
        <div className="flex gap-4 opacity-60 text-xs">
          {site.social.instagram && (
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Instagram</a>
          )}
          {site.social.facebook && (
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Facebook</a>
          )}
          <a href="/privacy" className="hover:opacity-100">Privacy</a>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-3 opacity-30">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
