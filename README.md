# template-cafe-singlepage

PageNest single-page cafe website template. £150 offering — all sections on one page with anchor navigation. No blog, no client self-editing.

---

## Setting up a new client site

### Step 1 — Create the repo

1. Go to [github.com/timriley-hue/template-cafe-singlepage](https://github.com/timriley-hue/template-cafe-singlepage)
2. Click **Use this template → Create a new repository**
3. Name it `cafe-[client-name]` (e.g. `cafe-the-coffee-house`)
4. Clone it to your machine and run:

```bash
npm install
```

---

### Step 2 — Extract brand colours and fonts

If the client has an existing website, run:

```bash
npm run extract-brand https://theircurrentwebsite.co.uk
```

This fetches their site, finds the most common colours and fonts, and asks you to map them to the theme. It writes `content/theme.json` automatically and outputs the logo URL so you can download it manually.

If they have no existing website, edit `content/theme.json` directly with their brand colours.

---

### Step 3 — Fill in the client details

Edit `content/site.json` — name, tagline, address, phone, email, social links.

Edit `content/hours.json` — opening times.

Edit `content/menu.json` — categories, items, prices, dietary tags.

Edit `content/about.md` — about page copy.

Edit `content/home.json` — homepage headline and FAQ items.

---

### Step 4 — Choose which sections to include

Edit `content/modules.json`:

| Setting | What it does |
|---|---|
| `gallery` | Show or hide the gallery section and nav link |
| `tableBooking` | Enable table booking embed (brunch/tea room cafes) |
| `orderOnline` | Show an order online button in the nav |

---

### Step 5 — Run locally and review

```bash
npm run dev -- --port 3002
```

Open [http://localhost:3002](http://localhost:3002). Check every section scrolls correctly on mobile and desktop.

---

### Step 6 — Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Add new project → Import the repo
3. Deploy — no environment variables needed unless you add Google Reviews later

---

### Step 7 — Connect the domain

1. In Vercel, go to the project → Domains → Add the client's domain
2. In Cloudflare, add the Vercel DNS records
3. SSL is automatic — confirm it's active before handing over

---

### Step 8 — Pre-launch checklist

- [ ] All sections reviewed on mobile and desktop
- [ ] Anchor links working from nav
- [ ] Contact form tested
- [ ] SSL active on the live domain
- [ ] Google Business Profile set up or verified
- [ ] Analytics installed (Umami or Plausible)
- [ ] `llms.txt` correct at `yourdomain.com/llms.txt`

---

## Content files reference

| File | What it controls |
|---|---|
| `content/site.json` | Business name, address, phone, email, social links |
| `content/theme.json` | Brand colours and fonts |
| `content/modules.json` | Which sections appear |
| `content/hours.json` | Opening hours |
| `content/menu.json` | Menu categories, items, prices, dietary tags |
| `content/about.md` | About section copy |
| `content/home.json` | Hero headline and FAQ items |

---

## Running locally

```bash
npm install
npm run dev -- --port 3002
```

Open [http://localhost:3002](http://localhost:3002)
