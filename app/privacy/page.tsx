import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `Privacy Policy — ${site.name}` };

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        Privacy Policy
      </h1>
      <div className="space-y-5 text-gray-700 leading-relaxed">
        <p>This website is operated by {site.name}. We take your privacy seriously and only collect information necessary to run the business.</p>
        <h2 className="text-xl font-bold mt-8 mb-2" style={{ fontFamily: "var(--font-heading)" }}>What we collect</h2>
        <p>If you send us a message through the contact form, we collect your name, email address, and the content of your message. We use this only to reply to you.</p>
        <h2 className="text-xl font-bold mt-8 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Analytics</h2>
        <p>This website uses privacy-friendly analytics that do not track you across other sites and do not use cookies. No consent banner is required.</p>
        <h2 className="text-xl font-bold mt-8 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
        <p>For any privacy questions, contact us at <a href={`mailto:${site.email}`} className="text-[var(--color-brand)]">{site.email}</a>.</p>
      </div>
    </div>
  );
}
