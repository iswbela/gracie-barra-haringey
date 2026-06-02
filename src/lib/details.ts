import path from "path";
import fs from "fs";
import type { DetailProduct } from "@/types/product";

// ─── Load data ────────────────────────────────────────────────────────────────

let _cache: DetailProduct[] | null = null;

export function getDetailProducts(): DetailProduct[] {
  if (_cache) return _cache;

  // Try multiple locations: repo data folder first, then legacy local paths
  const dirs = [
    path.resolve(process.cwd(), "public/data"),
    path.resolve(process.cwd(), "teste"),
    path.resolve(process.cwd(), "..", "gracie-barra-haringey.old", "teste"),
    path.resolve(process.cwd(), "..", "teste"),
  ];

  let filePath = "";
  for (const dir of dirs) {
    const primary  = path.join(dir, "product-details.json");
    const fallback = path.join(dir, "products.json");
    if (fs.existsSync(primary)) { filePath = primary; break; }
    if (fs.existsSync(fallback)) { filePath = fallback; break; }
  }
  if (!filePath) { _cache = []; return _cache; }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as { products: DetailProduct[] };
  _cache = data.products;
  return _cache;
}

export function getProductByHandle(handle: string): DetailProduct | undefined {
  const products = getDetailProducts();
  return products.find((p) => p.handle === handle);
}

export function getProductById(id: number): DetailProduct | undefined {
  const products = getDetailProducts();
  return products.find((p) => p.id === id);
}

// ─── Body HTML parsing ────────────────────────────────────────────────────────
// Re-exported from htmlUtils for server-side convenience
export { stripHtml, extractListItems } from "@/lib/htmlUtils";

// ─── Related products ─────────────────────────────────────────────────────────

export function getRelatedProducts(
  product: DetailProduct,
  all: DetailProduct[],
  count = 4
): DetailProduct[] {
  const scored = all
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.product_type === product.product_type) score += 3;
      if (p.vendor === product.vendor) score += 2;
      const sharedTags = p.tags.filter((t) => product.tags.includes(t));
      score += sharedTags.length;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.product);
}
