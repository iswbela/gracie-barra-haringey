import { Suspense } from "react";
import {
  getCatalogProducts,
  getAllProductTypes,
  getAllTags,
  getAllVendors,
  getPriceRange,
} from "@/lib/catalog";
import { ProductListingClient } from "./ProductListingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our full collection of premium GB Wear sportswear.",
};

export default function ProductsPage() {
  const products     = getCatalogProducts();
  const productTypes = getAllProductTypes(products);
  const tags         = getAllTags(products);
  const vendors      = getAllVendors(products);
  const priceRange   = getPriceRange(products);

  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--black)" }} />}>
      <ProductListingClient
        initialProducts={products}
        productTypes={productTypes}
        tags={tags}
        vendors={vendors}
        priceRange={priceRange}
      />
    </Suspense>
  );
}
