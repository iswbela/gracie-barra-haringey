"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { CatalogProduct } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { useToastStore } from "@/store/toastStore";

function getMainImage(p: CatalogProduct) {
  return p.images[0]?.src ?? "/placeholder.png";
}
function getHoverImage(p: CatalogProduct) {
  return p.images[1]?.src ?? p.images[0]?.src ?? "/placeholder.png";
}
function getLowestPrice(p: CatalogProduct) {
  return Math.min(...p.variants.map((v) => parseFloat(v.price)));
}
function isAvailable(p: CatalogProduct) {
  return p.variants.some((v) => v.available);
}
function formatPrice(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

interface Props {
  product: CatalogProduct;
}

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const addItem     = useCartStore((s) => s.addItem);
  const wishlist    = useUiStore((s) => s.wishlist);
  const toggleWish  = useUiStore((s) => s.toggleWishlist);
  const addToast    = useToastStore((s) => s.addToast);

  const wished    = wishlist.includes(product.id);
  const available = isAvailable(product);
  const price     = getLowestPrice(product);
  const mainImg   = getMainImage(product);
  const hoverImg  = getHoverImage(product);

  const firstAvailableVariant = product.variants.find((v) => v.available);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!available || !firstAvailableVariant) {
      addToast("This product is out of stock.", "error");
      return;
    }
    addItem({
      productId:    product.id,
      variantId:    firstAvailableVariant.id,
      handle:       product.handle,
      title:        product.title,
      variantTitle: firstAvailableVariant.title,
      price:        firstAvailableVariant.price,
      image:        mainImg,
    });
    addToast(`${product.title} added to cart!`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWish(product.id);
    addToast(
      wished ? "Removed from wishlist" : "Added to wishlist!",
      wished ? "info" : "success"
    );
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
        style={{ aspectRatio: "2/3" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main Image */}
        <Image
          src={mainImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ${
            hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } ${imgLoaded ? "" : "blur-sm"}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Hover Image */}
        <Image
          src={hoverImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          loading="lazy"
        />

        {/* Overlay actions */}
        <div
          className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!available && (
            <span className="px-2.5 py-1 bg-neutral-800/90 text-white text-xs font-medium rounded-full">
              Sold Out
            </span>
          )}
          {product.tags.includes("INVERNO25") && (
            <span className="px-2.5 py-1 bg-brand-500/90 text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-sm transition-all duration-200 hover:scale-110 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={16}
            className={wished ? "fill-red-500 text-red-500" : "text-neutral-600"}
          />
        </button>

        {/* Bottom actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!available}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wide transition-colors ${
                available
                  ? "bg-white hover:bg-brand-500 text-neutral-900 hover:text-white"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={13} />
              {available ? "Add to Cart" : "Sold Out"}
            </button>
            <Link
              href={`/products/${product.handle}`}
              className="p-2.5 bg-white/90 rounded-xl hover:bg-brand-500 hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-sm font-semibold text-brand-500">
            {formatPrice(price)}
          </p>
          {product.product_type && (
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {product.product_type}
            </span>
          )}
        </div>
        {/* Size dots */}
        <div className="flex items-center gap-1 mt-2">
          {product.options[0]?.values.slice(0, 5).map((size) => {
            const variant = product.variants.find(
              (v) => v.option1 === size
            );
            return (
              <span
                key={size}
                className={`text-xs px-1.5 py-0.5 rounded border ${
                  variant?.available
                    ? "border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-300 dark:text-neutral-600 line-through"
                }`}
              >
                {size}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
