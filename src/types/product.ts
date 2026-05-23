// ─── Shared primitives ────────────────────────────────────────────────────────

export interface ProductImage {
  id: number;
  src: string;
  position: number;
  width: number;
  height: number;
  variant_ids: number[];
  created_at: string;
  updated_at: string;
  product_id: number;
}

export interface ProductVariant {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: ProductImage | null;
  available: boolean;
  price: string;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

// ─── Catalog product (from catalog-products.json) ─────────────────────────────
// Lighter version used for grids, search, filtering

export interface CatalogProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  options: ProductOption[];
}

export interface CatalogData {
  products: CatalogProduct[];
}

// ─── Detail product (from product-details.json) ───────────────────────────────
// Full version used on individual product pages

export type DetailProduct = CatalogProduct; // same shape; separate type for clarity

export interface DetailData {
  products: DetailProduct[];
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: number;
  variantId: number;
  handle: string;
  title: string;
  variantTitle: string;
  price: string;
  image: string;
  quantity: number;
}

// ─── Filters ──────────────────────────────────────────────────────────────────

export type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "alpha-asc"
  | "alpha-desc";

export interface FilterState {
  search: string;
  productTypes: string[];
  tags: string[];
  vendors: string[];
  sort: SortOption;
  priceMin: number;
  priceMax: number;
}
