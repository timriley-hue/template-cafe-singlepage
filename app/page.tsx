import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import site from "@/content/site.json";
import hours from "@/content/hours.json";
import menu from "@/content/menu.json";
import home from "@/content/home.json";
import modules from "@/content/modules.json";
import Image from "next/image";

const dietaryColours: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-lime-100 text-lime-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

export default function Page() {
  const aboutRaw = readFileSync(join(process.cwd(), "content/about.md"), "utf-8");
  const aboutParagraphs = aboutRaw.replace(/^#.*\n/, "").trim().split(/\n\n+/);

  const hasHeroImage = existsSync(join(process.cwd(), "public/hero.jpg")) ||
    existsSync(join(process.cwd(), "public/hero.webp")) ||
    existsSync(join(process.cwd(), "public/hero.png"));

  const galleryDir = join(process.cwd(), "public/gallery");
  const galleryImages = existsSync(galleryDir)
    ? readdirSync(galleryDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    : [];

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="top"
        className="relative flex items-center justify-center min-h-[75vh] px-4 text-center"
        style={hasHeroImage ? { backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        {hasHeroImage && <div className="absolute inset-0 bg-black/50" />}
        {!hasHeroImage && <div className="absolute inset-0 bg-[var(--color-accent)]" />}

        <div className="relative z-10 max-w-2xl mx-auto py-24">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-5 leading-tight ${hasHeroImage ? "text-white" : "text-[var(--color-brand-dark)]"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {home.hero.headline}
          </h1>
          <p className={`text-lg md:text-xl mb-10 ${hasHeroImage ? "text-white/85" : "text-gray-600"}`}>
            {home.hero.subheading}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#menu"
              className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors shadow-md"
            >
              See our menu
            </a>
            <a
              href="#contact"
              className={`px-8 py-3.5 rounded-full font-medium transition-colors border-2 ${
                hasHeroImage
                  ? "border-white text-white hover:bg-white hover:text-[var(--color-brand-dark)]"
                  : "border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-brand-text)]"
              }`}
            >
              Find us
            </a>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${hasHeroImage ? "text-white/50" : "text-gray-400"}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </section>

      {/* ── Hours ── */}
      <section className="bg-[var(--color-brand)] text-[var(--color-brand-text)] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-5 text-center font-medium">Opening Hours</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-center">
            {hours.hours.map((row) => (
              <div key={row.days} className="bg-white/10 rounded-xl px-4 py-4">
                <p className="font-semibold mb-0.5">{row.days}</p>
                <p className="opacity-75">{row.open}–{row.close}</p>
              </div>
            ))}
          </div>
          {hours.notes && <p className="text-center text-xs opacity-40 mt-4">{hours.notes}</p>}
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="py-24 px-4 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-3">What we serve</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Menu
          </h2>
          <p className="text-sm text-gray-400 mb-14">Prices include VAT. Menu changes seasonally.</p>

          <div className="space-y-16">
            {menu.categories.map((cat) => (
              <div key={cat.name}>
                <h3 className="text-2xl font-bold pb-3 mb-7 border-b-2 border-[var(--color-brand)] text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  {cat.name}
                </h3>
                <ul className="space-y-4">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        {item.dietary.map((tag) => (
                          <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${dietaryColours[tag] ?? "bg-gray-100 text-gray-600"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-700 font-semibold whitespace-nowrap">£{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-400 border-t border-gray-100 pt-8">
            Please let us know about any allergies before ordering. Full allergen information available on request.
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4 bg-[var(--color-accent)]/20 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-3">Our story</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            About us
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {modules.gallery && (
        <section id="gallery" className="py-24 px-4 bg-white scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-3">Photos</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.length > 0
                ? galleryImages.map((img) => (
                    <div key={img} className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
                      <Image src={`/gallery/${img}`} alt="" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-[var(--color-accent)]/40 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--color-brand)]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-[var(--color-accent)]/25">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-3 text-center">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Good to know
          </h2>
          <dl className="space-y-3">
            {home.faq.map((item) => (
              <details key={item.question} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-medium list-none text-[var(--color-brand-dark)]">
                  {item.question}
                  <span className="ml-4 text-[var(--color-brand)] text-xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">{item.answer}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-4 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-3">Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Find us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Address</p>
              <address className="not-italic text-gray-700 leading-relaxed mb-5">{site.address}</address>
              <p className="mb-1"><a href={`tel:${site.phone}`} className="text-gray-700 hover:text-[var(--color-brand)] transition-colors">{site.phone}</a></p>
              <p><a href={`mailto:${site.email}`} className="text-gray-700 hover:text-[var(--color-brand)] transition-colors">{site.email}</a></p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Opening Hours</p>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  {hours.hours.map((row) => (
                    <tr key={row.days} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4">{row.days}</td>
                      <td className="py-2.5 text-right font-medium">{row.open}–{row.close}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hours.notes && <p className="text-xs text-gray-400 mt-3">{hours.notes}</p>}
            </div>
          </div>

          <div className="bg-[var(--color-accent)]/25 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-7 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Send us a message
            </h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input id="name" name="name" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input id="email" name="email" type="email" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition resize-none" />
              </div>
              <button type="submit" className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors text-sm">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
