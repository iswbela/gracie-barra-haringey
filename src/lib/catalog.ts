// SERVER-ONLY: This file uses Node.js `fs` — only import in Server Components
import path from "path";
import fs from "fs";
import type { CatalogProduct } from "@/types/product";

// Re-export client-safe utilities so server components can import from one place
export {
  filterAndSort,
  getAllProductTypes,
  getAllTags,
  getAllVendors,
  getPriceRange,
  getLowestPrice,
  getHighestPrice,
  getMainImage,
  getHoverImage,
  isAvailable,
  formatPrice,
  getRandomProducts,
} from "./catalogUtils";

// ─── Server-side data loading ─────────────────────────────────────────────────

let _cache: CatalogProduct[] | null = null;

export function getCatalogProducts(): CatalogProduct[] {
  if (_cache) return _cache;

  // Try multiple locations: project root, .old sibling, original fallback
  const dirs = [
    path.resolve(process.cwd(), "teste"),
    path.resolve(process.cwd(), "..", "gracie-barra-haringey.old", "teste"),
    path.resolve(process.cwd(), "..", "teste"),
  ];

  let filePath = "";
  for (const dir of dirs) {
    const primary   = path.join(dir, "catalog-products.json");
    const secondary = path.join(dir, "products.json");
    const fallback  = path.join(dir, "produtos.json");
    if (fs.existsSync(primary))   { filePath = primary;   break; }
    if (fs.existsSync(secondary)) { filePath = secondary; break; }
    if (fs.existsSync(fallback))  { filePath = fallback;  break; }
  }
  if (!filePath) throw new Error("catalog JSON not found in any expected location");

  const raw  = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as { products: CatalogProduct[] };
  _cache     = data.products;
  return _cache;
}
