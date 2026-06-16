import site from "@/content/site.json";
import hours from "@/content/hours.json";
import FoodHygieneBadge from "@/components/FoodHygieneBadge";

export default async function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-text)]">
      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="font-bold text-base mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {site.name}
          </p>
          <address className="not-italic leading-relaxed opacity-60 mb-4">{site.address}</address>
          <p className="opacity-60 hover:opacity-90 transition-opacity">
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </p>
          <p className="opacity-60 hover:opacity-90 transition-opacity">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div>
          <p className="font-semibold mb-4 opacity-90">Opening Hours</p>
          <ul className="space-y-2">
            {hours.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4 opacity-60">
                <span>{row.days}</span>
                <span className="whitespace-nowrap">{row.open}–{row.close}</span>
              </li>
            ))}
          </ul>
          {hours.notes && <p className="mt-3 opacity-35 text-xs">{hours.notes}</p>}
        </div>

        <div>
          <p className="font-semibold mb-4 opacity-90">Follow us</p>
          <div className="flex gap-5 opacity-60 mb-6">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                Facebook
              </a>
            )}
          </div>
          <FoodHygieneBadge />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-35">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <a href="#top" className="hover:opacity-100 transition-opacity">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
