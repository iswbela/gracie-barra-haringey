# Gracie Barra Haringey — Website & Store

Next.js storefront for the Gracie Barra Haringey BJJ academy. Includes the full marketing landing page and an integrated product shop pulling data from local JSON files.

---

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — utility classes + custom design tokens in `globals.css`
- **Zustand** — cart and UI state
- **Framer Motion** — scroll-triggered animations
- **Swiper** — product image carousel
- **Google Fonts** — Barlow Condensed (headings) + Inter (body) + Barlow (alt)

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Getting started

> `node_modules` is not committed. Install dependencies before running the app.

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Data files

Product data is loaded from JSON files at runtime by the server. The app looks for them in the following locations (first match wins):

| File | Purpose |
|---|---|
| `teste/catalog-products.json` | Product listing (catalog page) |
| `teste/products.json` | Full product catalog (fallback) |
| `teste/product-details.json` | Product detail pages |

If the `teste/` folder is not present at the project root, the app automatically falls back to `../gracie-barra-haringey.old/teste/` (the sibling `.old` folder).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, Cart, Toast)
│   ├── page.tsx                # Home / landing page
│   ├── globals.css             # Design tokens, animations, global styles
│   ├── not-found.tsx
│   └── products/
│       ├── page.tsx            # /products — catalog listing (server)
│       ├── ProductListingClient.tsx  # Client-side filter/sort/search
│       └── [handle]/
│           └── page.tsx        # /products/[handle] — product detail
├── components/
│   ├── home/                   # Landing page sections (Hero, About, Schedule…)
│   ├── catalog/                # ProductCard, FilterPanel, Skeleton
│   ├── product/                # ProductGallery, ProductInfo, Accordion
│   ├── layout/                 # Navbar, Footer, CartDrawer, NewsletterForm
│   └── ui/                     # ToastContainer
├── lib/
│   ├── catalog.ts              # Server-only: loads catalog JSON with fs
│   ├── catalogUtils.ts         # Client-safe: filter, sort, price helpers
│   └── details.ts              # Server-only: loads product-details JSON with fs
├── store/
│   ├── cartStore.ts            # Zustand cart (localStorage persistence)
│   ├── toastStore.ts           # Zustand toast notifications
│   └── uiStore.ts              # Zustand UI state (drawer open/close)
├── hooks/
│   └── useScrollAnimation.ts   # IntersectionObserver fade-in hook
└── types/
    └── product.ts              # CatalogProduct + DetailProduct TypeScript types
```

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |

---

## Design tokens

Defined as CSS variables in `src/app/globals.css` and used throughout via inline styles and utility classes:

```
--red:        #C8102E   (Gracie Barra red)
--red-dark:   #9E0B22
--red-light:  #E8152F
--black:      #080808   (page background)
--dark:       #111111
--dark-2:     #1A1A1A   (cards)
--dark-3:     #242424
--font-head:  'Barlow Condensed', sans-serif
--font-body:  'Inter', sans-serif
```

---

## Notes

- **Server / client boundary** — `catalog.ts` and `details.ts` use Node.js `fs` and must only be imported in Server Components. Client components import from `catalogUtils.ts` instead.
- **Images** — product images are served from the Shopify CDN (`cdn.shopify.com`), configured as an allowed remote pattern in `next.config.mjs`. The helper `shopifyImg(url, width)` appends `_{width}x` to CDN URLs for responsive resizing.
- **Cart** — persisted to `localStorage` via Zustand middleware. No backend required.
