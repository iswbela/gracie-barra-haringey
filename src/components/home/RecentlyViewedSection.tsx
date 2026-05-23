"use client";

import { useUiStore } from "@/store/uiStore";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { CatalogProduct } from "@/types/product";
import { motion } from "framer-motion";

interface Props {
  allProducts: CatalogProduct[];
}

export function RecentlyViewedSection({ allProducts }: Props) {
  const recentIds = useUiStore((s) => s.recentlyViewed);

  const recent = recentIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as CatalogProduct[];

  if (recent.length === 0) return null;

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-500 mb-2">
            Your History
          </p>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
            Recently Viewed
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recent.slice(0, 5).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
