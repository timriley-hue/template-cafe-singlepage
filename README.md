# template-cafe-singlepage

PageNest single-page cafe website template — the £150 offering. All content on one scrollable page with anchor navigation. No blog, no client self-editing panel.

---

## Overview

This template gives you a complete one-page cafe site with:
- Hero section with optional full-bleed photo
- Opening hours strip
- Menu with dietary tags
- About section
- Gallery (optional)
- FAQ accordion
- Contact section with form and optional Google Maps embed

Everything a client needs to fill in is in the `content/` folder. Nothing else needs touching for a standard setup.

---

## Step 1 — Create the client repo

1. Go to [github.com/timriley-hue/template-cafe-singlepage](https://github.com/timriley-hue/template-cafe-singlepage)
2. Click **Use this template → Create a new repository**
3. Name it `cafe-[client-slug]` — e.g. `cafe-the-coffee-house`
4. Set it to **Private**
5. Clone it to your machine:

```bash
git clone https://github.com/timriley-hue/cafe-[client-slug].git
cd cafe-[client-slug]
npm install
```

---

## Step 2 — Start the dev server

```bash
npm run dev -- --port 3002
```

Open [http://localhost:3002](http://localhost:3002). You'll see the template with placeholder content — this is your working preview as you customise.

---

## Step 3 — Extract the client's brand

If the client has an existing website, run:

```bash
npm run extract-brand https://theircurrentwebsite.co.uk
```

This fetches their site, identifies their colours and fonts, and walks you through mapping them to the theme. It writes `content/theme.json` automatically and shows you the logo URL so you can download it manually.

If they have no existing website, edit `content/theme.json` directly:

```json
{
  "colorBrand": "#2c5f2e",
  "colorAccent": "#f5e6c8",
  "colorBrandDark": "#1a3d1b",
  "colorBrandText": "#ffffff",
  "fontHeadingFamily": "Playfair Display",
  "fontBodyFamily": "Inter"
}
```

- `colorBrand` — main brand colour (header, buttons, accents)
- `colorAccent` — light background tint used in section backgrounds
- `colorBrandDark` — darker shade used on hover and headings
- `colorBrandText` — text colour on top of the brand colour (usually white)
- `fontHeadingFamily` / `fontBodyFamily` — any Google Fonts family name

---

## Step 4 — Fill in the client's details

**`content/site.json`** — the basics:

```json
{
  "name": "The Coffee House",
  "tagline": "Great coffee, good people.",
  "address": "1 High Street, Tenterden, Kent TN30 6AA",
  "phone": "01580 000000",
  "email": "hello@thecoffeehouse.co.uk",
  "social": {
    "instagram": "https://instagram.com/...",
    "facebook": "https://facebook.com/..."
  }
}
```

**`content/hours.json`** — opening times:

```json
{
  "hours": [
    { "days": "Monday–Friday", "open": "8:00", "close": "17:00" },
    { "days": "Saturday", "open": "8:30", "close": "17:00" },
    { "days": "Sunday", "open": "9:00", "close": "16:00" }
  ],
  "notes": "Closed bank holidays"
}
```

**`content/menu.json`** — full menu. Each item can have dietary tags: `vegan`, `vegetarian`, `gluten-free`:

```json
{
  "categories": [
    {
      "name": "Hot Drinks",
      "items": [
        { "name": "Flat White", "price": "3.20", "dietary": [] },
        { "name": "Oat Latte", "price": "3.70", "dietary": ["vegan"] }
      ]
    }
  ]
}
```

**`content/about.md`** — the about section. Plain text, paragraphs separated by a blank line. The `# heading` line at the top is ignored:

```markdown
# About

We opened in 2018 with one goal: make Tenterden's best flat white.

We source our beans from small farms and roast in-house every week.
```

**`content/home.json`** — hero text and FAQ:

```json
{
  "hero": {
    "headline": "Good coffee. No fuss.",
    "subheading": "Open seven days a week in the heart of Tenterden."
  },
  "faq": [
    { "question": "Where can I park?", "answer": "Free car park on Recreation Ground Road, two minutes away." },
    { "question": "Do you have Wi-Fi?", "answer": "Yes — ask at the counter for the password." }
  ]
}
```

---

## Step 5 — Add photos

**Hero image** — drop a single file named `hero.jpg` (or `.webp` / `.png`) into the `public/` folder. The site automatically uses it as a full-bleed hero background with a dark overlay. If no file is present, the hero falls back to a solid accent colour — both look intentional.

**Gallery photos** — drop any number of `.jpg`, `.webp`, or `.png` files into `public/gallery/`. They appear in a grid automatically. If the folder is empty and gallery is enabled, a placeholder grid is shown.

---

## Step 6 — Choose which sections to show

Edit `content/modules.json`:

```json
{
  "gallery": true,
  "googleMap": false,
  "tableBooking": false,
  "orderOnline": false
}
```

| Setting | What it does |
|---|---|
| `gallery` | Show or hide the gallery section and nav link |
| `googleMap` | Show a Google Maps embed in the contact section (no API key needed) |
| `tableBooking` | Enable a table booking embed — add the embed code when switching on |
| `orderOnline` | Show an Order Online button in the nav — add the URL when switching on |

---

## Step 7 — Set up the Food Hygiene Rating badge

The footer automatically shows the client's live Food Hygiene Rating, pulled directly from the Food Standards Agency. It updates automatically whenever their rating changes — no manual work needed.

Find their FHRS ID:
1. Go to [ratings.food.gov.uk](https://ratings.food.gov.uk)
2. Search for the business by name and town
3. Open their listing — copy the number from the URL (e.g. `ratings.food.gov.uk/business/en-GB/123456` → ID is `123456`)

Add it to `content/site.json`:

```json
"fhrsId": "123456"
```

Leave it empty (`""`) to hide the badge.

---

## Step 8 — Wire up the contact form

The contact form HTML is ready in `app/page.tsx`. You need to connect it to a form handling service per client. Recommended options:

- **Formspree** — free tier, no code needed, just set the form `action` attribute
- **Cloudflare Turnstile** — adds spam protection (to be added per client)

This is done when setting up the live site, not in the template.

---

## Step 9 — Set up analytics

Add analytics when deploying — not in the template. Recommended:

- **Plausible** or **Umami** — privacy-friendly, GDPR-compliant, lightweight
- Add the tracking snippet to `app/layout.tsx` when the live site is ready

---

## Step 10 — Review everything locally

Before deploying, go through the whole page on both desktop and mobile:

- [ ] Hero image looks good (or accent colour fallback is clean)
- [ ] All menu items, prices, and dietary tags correct
- [ ] Opening hours correct
- [ ] About copy reads well
- [ ] Gallery photos loading (or placeholder looks intentional if empty)
- [ ] FAQ items relevant to this client
- [ ] Contact details (address, phone, email) correct
- [ ] Anchor nav links scroll to the right sections
- [ ] Social links go to the right profiles

---

## Step 11 — Deploy to Vercel

1. Push the client repo to GitHub if not already
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import the repo
3. Select the **PageNest's projects** team
4. Add any environment variables (none required for the basic single-page site)
5. Click **Deploy**

Vercel gives you a preview URL immediately (e.g. `cafe-the-coffee-house.vercel.app`). Share with the client for sign-off before pointing their domain.

---

## Step 12 — Connect the client's domain

1. In Vercel, go to the project → **Domains** → add their domain
2. In their domain registrar (or Cloudflare), add the DNS records Vercel shows you
3. SSL is automatic — wait for it to activate (usually under 5 minutes)
4. Confirm the live URL is working before handing over

---

## Step 13 — Pre-launch checklist

- [ ] All sections reviewed on mobile and desktop
- [ ] Anchor nav links working
- [ ] Contact form tested and submitting
- [ ] Hero image sharp and well-cropped on mobile
- [ ] Google Maps showing correct location (if enabled)
- [ ] SSL active on the live domain
- [ ] Google Business Profile set up or verified
- [ ] Analytics installed and receiving data
- [ ] Client has been walked through what they can and can't change

---

## Content files quick reference

| File | What it controls |
|---|---|
| `content/site.json` | Name, tagline, address, phone, email, social links |
| `content/theme.json` | Brand colours and fonts |
| `content/modules.json` | Which sections appear |
| `content/hours.json` | Opening hours |
| `content/menu.json` | Menu categories, items, prices, dietary tags |
| `content/about.md` | About section copy |
| `content/home.json` | Hero headline, subheading, FAQ items |
| `public/hero.jpg` | Hero background image (optional) |
| `public/gallery/` | Gallery photos (optional) |
