"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface Props {
  products: CatalogProduct[];
}

function CollectionCard({
  title,
  subtitle,
  image,
  href,
  large,
  delay,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  large?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay ?? 0 }}
      className={`relative group overflow-hidden rounded-2xl ${
        large ? "row-span-2" : ""
      } bg-neutral-100 dark:bg-neutral-800`}
      style={{ minHeight: large ? 560 : 260 }}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-brand-300 text-xs font-medium uppercase tracking-widest mb-1">
          {subtitle}
        </p>
        <h3 className="text-white font-serif text-xl lg:text-2xl font-bold mb-3">
          {title}
        </h3>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-brand-300 transition-colors group/link"
        >
          Explore
          <ArrowRight
            size={14}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export function FeaturedCollections({ products }: Props) {
  const sorted = [...products].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const picks = sorted.slice(0, 4);
  const img = (i: number) => picks[i]?.images[0]?.src ?? "";

  // Group by product_type for collection names
  const types = [...new Set(products.map((p) => p.product_type).filter(Boolean))];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-500 mb-3">
            Browse by category
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Featured Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-4">
          <div className="md:row-span-2">
            <CollectionCard
              title={types[0] || "New Arrivals"}
              subtitle="Winter 2025"
              image={img(0)}
              href={`/products?type=${encodeURIComponent(types[0] || "")}`}
              large
              delay={0}
            />
          </div>
          <CollectionCard
            title={types[1] || "Jackets"}
            subtitle="Essentials"
            image={img(1)}
            href={`/products?type=${encodeURIComponent(types[1] || "")}`}
            delay={0.1}
          />
          <CollectionCard
            title={types[2] || "Pants"}
            subtitle="Training Gear"
            image={img(2)}
            href={`/products?type=${encodeURIComponent(types[2] || "")}`}
            delay={0.2}
          />
          <CollectionCard
            title={types[3] || "Accessories"}
            subtitle="Complete Your Look"
            image={img(3)}
            href={`/products?type=${encodeURIComponent(types[3] || "")}`}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
