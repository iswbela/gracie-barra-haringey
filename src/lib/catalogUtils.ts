// Pure client-safe utilities — no fs/Node dependencies
// Safe to import in both server and client components

import type { CatalogProduct, FilterState, SortOption } from "@/types/product";

// ─── Price helpers ────────────────────────────────────────────────────────────

export function getLowestPrice(product: CatalogProduct): number {
  return Math.min(...product.variants.map((v) => parseFloat(v.price)));
}

export function getHighestPrice(product: CatalogProduct): number {
  return Math.max(...product.variants.map((v) => parseFloat(v.price)));
}

export function getMainImage(product: CatalogProduct): string {
  return product.images[0]?.src ?? "/placeholder.png";
}

export function getHoverImage(product: CatalogProduct): string {
  return product.images[1]?.src ?? product.images[0]?.src ?? "/placeholder.png";
}

export function isAvailable(product: CatalogProduct): boolean {
  return product.variants.some((v) => v.available);
}

export function formatPrice(price: string | number): string {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

export function getAllProductTypes(products: CatalogProduct[]): string[] {
  const types = new Set(products.map((p) => p.product_type).filter(Boolean));
  return Array.from(types).sort();
}

export function getAllTags(products: CatalogProduct[]): string[] {
  const tags = new Set(products.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export function getAllVendors(products: CatalogProduct[]): string[] {
  const vendors = new Set(products.map((p) => p.vendor).filter(Boolean));
  return Array.from(vendors).sort();
}

export function getPriceRange(products: CatalogProduct[]): { min: number; max: number } {
  const prices = products.flatMap((p) =>
    p.variants.map((v) => parseFloat(v.price))
  );
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

// ─── Filter + sort ────────────────────────────────────────────────────────────

export function filterAndSort(
  products: CatalogProduct[],
  filters: FilterState
): CatalogProduct[] {
  let result = [...products];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.product_type.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.productTypes.length > 0) {
    result = result.filter((p) =>
      filters.productTypes.includes(p.product_type)
    );
  }

  if (filters.tags.length > 0) {
    result = result.filter((p) =>
      filters.tags.some((t) => p.tags.includes(t))
    );
  }

  if (filters.vendors.length > 0) {
    result = result.filter((p) => filters.vendors.includes(p.vendor));
  }

  if (filters.priceMin > 0 || filters.priceMax > 0) {
    result = result.filter((p) => {
      const lo = getLowestPrice(p);
      const hi = getHighestPrice(p);
      return (
        (filters.priceMin === 0 || hi >= filters.priceMin) &&
        (filters.priceMax === 0 || lo <= filters.priceMax)
      );
    });
  }

  return sortProducts(result, filters.sort);
}

function sortProducts(products: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    case "price-desc":
      return [...products].sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    case "newest":
      return [...products].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "oldest":
      return [...products].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    case "alpha-asc":
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case "alpha-desc":
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products;
  }
}

// ─── Random picks ─────────────────────────────────────────────────────────────

export function getRandomProducts(
  products: CatalogProduct[],
  count: number
): CatalogProduct[] {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
