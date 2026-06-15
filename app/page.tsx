import { readFileSync } from "fs";
import { join } from "path";
import site from "@/content/site.json";
import hours from "@/content/hours.json";
import menu from "@/content/menu.json";
import home from "@/content/home.json";
import modules from "@/content/modules.json";

const dietaryColours: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-lime-100 text-lime-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

export default function Page() {
  const aboutRaw = readFileSync(join(process.cwd(), "content/about.md"), "utf-8");
  const aboutParagraphs = aboutRaw.replace(/^#.*\n/, "").trim().split(/\n\n+/);

  return (
    <>
      {/* ── Hero ── */}
      <section id="top" className="bg-[var(--color-accent)] py-28 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {home.hero.headline}
          </h1>
          <p className="text-lg text-gray-700 mb-10">{home.hero.subheading}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#menu"
              className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              See our menu
            </a>
            <a
              href="#contact"
              className="border-2 border-[var(--color-brand)] text-[var(--color-brand)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand)] hover:text-[var(--color-brand-text)] transition-colors"
            >
              Find us
            </a>
          </div>
        </div>
      </section>

      {/* ── Hours strip ── */}
      <section className="bg-[var(--color-brand)] text-[var(--color-brand-text)] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4 text-center">Opening Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center">
            {hours.hours.map((row) => (
              <div key={row.days} className="bg-white/10 rounded-lg px-4 py-3">
                <p className="font-medium">{row.days}</p>
                <p className="opacity-80">{row.open}–{row.close}</p>
              </div>
            ))}
          </div>
          {hours.notes && <p className="text-center text-xs opacity-50 mt-3">{hours.notes}</p>}
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold mb-2 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Menu
          </h2>
          <p className="text-gray-500 text-sm mb-12">Prices include VAT. Menu changes seasonally.</p>

          <div className="space-y-14">
            {menu.categories.map((cat) => (
              <div key={cat.name}>
                <h3
                  className="text-xl font-bold border-b-2 border-[var(--color-brand)] pb-2 mb-6 text-[var(--color-brand-dark)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {cat.name}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-medium">{item.name}</span>
                        {item.dietary.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${dietaryColours[tag] ?? "bg-gray-100 text-gray-700"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-700 font-medium whitespace-nowrap">£{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-400">
            Please let us know about any allergies before ordering. Full allergen information available on request.
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-4 bg-[var(--color-accent)]/20 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About us
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
            {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {modules.gallery && (
        <section id="gallery" className="py-20 px-4 bg-white scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl font-bold mb-10 text-[var(--color-brand-dark)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Gallery
            </h2>
            {/* Drop client images into public/gallery/ and list them here */}
            <p className="text-gray-400">Photos coming soon.</p>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-[var(--color-accent)]/30">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold mb-10 text-center text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Good to know
          </h2>
          <dl className="space-y-4">
            {home.faq.map((item) => (
              <details key={item.question} className="group bg-white rounded-xl shadow-sm border border-gray-100">
                <summary className="flex justify-between items-center px-6 py-4 cursor-pointer font-medium list-none">
                  {item.question}
                  <span className="ml-4 text-[var(--color-brand)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 text-sm">{item.answer}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Address</h3>
              <address className="not-italic text-gray-700 leading-relaxed mb-4">{site.address}</address>
              <p className="text-gray-700">
                <a href={`tel:${site.phone}`} className="hover:text-[var(--color-brand)]">{site.phone}</a>
              </p>
              <p className="text-gray-700">
                <a href={`mailto:${site.email}`} className="hover:text-[var(--color-brand)]">{site.email}</a>
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Opening Hours</h3>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  {hours.hours.map((row) => (
                    <tr key={row.days} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 pr-4">{row.days}</td>
                      <td className="py-2 text-right">{row.open}–{row.close}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hours.notes && <p className="text-xs text-gray-400 mt-3">{hours.notes}</p>}
            </div>
          </div>

          <div className="bg-[var(--color-accent)]/30 rounded-2xl p-8">
            <h3
              className="text-2xl font-bold mb-6 text-[var(--color-brand-dark)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Send us a message
            </h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input id="name" name="name" type="text" required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input id="email" name="email" type="email" required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
              </div>
              {/* Cloudflare Turnstile widget goes here */}
              <button type="submit"
                className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors text-sm">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
