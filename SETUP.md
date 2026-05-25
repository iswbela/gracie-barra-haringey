# GB Wear Storefront — Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Data Files

The app reads Shopify JSON exports from the `../teste/` directory.

| File (new name)           | Original name    | Purpose                                       |
|---------------------------|------------------|-----------------------------------------------|
| `catalog-products.json`   | `produtos.json`  | Product catalog, grids, search, filters       |
| `product-details.json`    | `products.json`  | Full product pages, gallery, care info        |

> **Note:** The app automatically falls back to the original filenames (`produtos.json` / `products.json`), so renaming is optional but recommended.

**To rename (optional):**
```bash
cd teste
copy produtos.json catalog-products.json
copy products.json product-details.json
```

---

## Project Structure

```
storefront/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout (Navbar, Footer, Cart)
│   │   ├── page.tsx            ← Homepage
│   │   ├── products/
│   │   │   ├── page.tsx        ← All Products listing
│   │   │   ├── ProductListingClient.tsx
│   │   │   └── [handle]/
│   │   │       └── page.tsx    ← Individual product page
│   ├── components/
│   │   ├── layout/             ← Navbar, Footer, CartDrawer
│   │   ├── home/               ← Hero, YouMayAlsoLike, etc.
│   │   ├── catalog/            ← ProductCard, FilterPanel, etc.
│   │   ├── product/            ← Gallery, Info, Accordions
│   │   └── ui/                 ← Toast, Skeleton
│   ├── lib/
│   │   ├── catalog.ts          ← Reads catalog-products.json
│   │   └── details.ts          ← Reads product-details.json
│   ├── store/
│   │   ├── cartStore.ts        ← Cart (Zustand + localStorage)
│   │   ├── uiStore.ts          ← Dark mode, wishlist, recently viewed
│   │   └── toastStore.ts       ← Toast notifications
│   └── types/
│       └── product.ts          ← TypeScript interfaces
```

## Features

- **Homepage** — Hero banner, "You May Also Like" (4 random products), Featured Collections, Promo section
- **Product Listing** — Search, category/type/tag filters, sort, grid toggle, pagination
- **Product Detail** — Image gallery with zoom & lightbox, size selector, quantity, accordions
- **Cart Drawer** — Persistent (localStorage), add/remove/update quantity
- **Dark Mode** — Toggle in navbar, persisted to localStorage
- **Wishlist** — Heart icon on cards and product page
- **Recently Viewed** — Auto-tracks, shown on homepage
- **Toast Notifications** — Success/error/warning/info
- **Skeleton Loading** — While products load

## Build for Production

```bash
npm run build
npm start
```
