# Orbit Website

Marketing website for [Orbit](https://orbitfx.com) — the FX intelligence layer for corporate treasury.

Built with **React + Vite + Tailwind CSS**. Designed for deployment on **Vercel**.

---

## Local Development

### Prerequisites
- Node.js 18+ 
- npm 9+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Project Structure

```
orbit-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.jsx          # Sticky navbar with mobile menu
│   │   └── Footer.jsx       # Site footer
│   ├── data/
│   │   └── blogPosts.js     # Blog post content (add posts here)
│   ├── pages/
│   │   ├── Home.jsx         # Homepage — 8 sections
│   │   ├── Product.jsx      # Platform deep-dive
│   │   ├── WhyOrbit.jsx     # Competitive positioning + ROI
│   │   ├── FXDiagnostic.jsx # Embedded 5-question leakage tool
│   │   ├── Resources.jsx    # Blog listing page
│   │   ├── BlogPost.jsx     # Individual post template
│   │   ├── About.jsx        # Team, advisors, design partners
│   │   └── Contact.jsx      # Demo booking + contact form
│   ├── App.jsx              # Router + layout
│   ├── index.css            # Tailwind + CSS variables
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## Pages

| Route          | Page              | Primary CTA   |
|----------------|-------------------|---------------|
| `/`            | Home              | Book a Demo   |
| `/product`     | Platform Overview | Book a Demo   |
| `/why-orbit`   | Why Orbit         | Book a Demo   |
| `/diagnostic`  | FX Diagnostic     | Book a Demo   |
| `/resources`   | Blog / Resources  | Subscribe     |
| `/resources/:slug` | Blog Post     | Book a Demo   |
| `/about`       | About             | —             |
| `/contact`     | Contact / Demo    | Submit        |

---

## Customisation Checklist

Before going live, update the following:

### 1. Calendly URL
In `src/pages/Contact.jsx`, replace the placeholder:
```js
const DEMO_CALENDLY_URL = 'https://calendly.com/orbitfx/demo' // ← replace this
```

### 2. Blog posts
Add real posts to `src/data/blogPosts.js`. Each post takes:
```js
{
  slug: 'url-slug',
  title: 'Post Title',
  excerpt: 'One sentence teaser.',
  date: 'Month YYYY',
  readTime: 'X min read',
  category: 'Category Name',
  author: 'Author Name',
  body: `Full post content as a string (or MDX once CMS is wired)`,
}
```

### 3. Email capture / form backend
The Contact form (`src/pages/Contact.jsx`) and newsletter inputs currently have no backend.
Wire to your CRM / Supabase / Mailchimp as needed.

### 4. Pilot participants and bank pipeline
Once live relationships progress, update:
- `src/pages/About.jsx` — DesignPartners section (pilot pipeline names)
- `src/pages/Home.jsx` — BankPartners section (bank pipeline names)

### 5. Logo asset
When the final logo SVG is available, replace the `OrbitMark` SVG component in:
- `src/components/Nav.jsx`
- `src/components/Footer.jsx`  
- `src/pages/About.jsx`

---

## Design System

| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| Navy           | `#0A0F1E` | Hero backgrounds, nav, footer|
| Teal           | `#00C2A8` | CTAs, highlights, stats      |
| Teal Dark      | `#00897B` | Hover states, section labels |
| Teal Light     | `#E0F2F1` | Callout backgrounds, pills   |

Font: **Inter** (Google Fonts)

---

## Deployment (Vercel)

```bash
# Build for production
npm run build

# Deploy (Vercel CLI)
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on push to `main`.

---

## Brand Notes

- Never use teal as a large background — accent only
- Lead with specific numbers, not adjectives
- Stats in use: `$9M+` (MillTech 2025), `195 hrs/mo` (Orbit field research), `15–22×` (Celonis)
- Do **not** use: "seamless", "game-changing", "revolutionary", "leverage" as a verb

---

*Orbit · Toronto, Canada · steve@orbitfx.com*
