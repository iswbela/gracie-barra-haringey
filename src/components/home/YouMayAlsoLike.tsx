"use client";

import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "@/types/product";
import { getMainImage, getHoverImage, getLowestPrice, formatPrice, isAvailable } from "@/lib/catalogUtils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCartStore } from "@/store/cartStore";

interface Props {
  products: CatalogProduct[];
}

export function YouMayAlsoLike({ products }: Props) {
  const sectionRef = useScrollAnimation();
  const addItem    = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: CatalogProduct) => {
    const variant = product.variants.find((v) => v.available) ?? product.variants[0];
    if (!variant) return;
    addItem({
      productId:    product.id,
      variantId:    variant.id,
      handle:       product.handle,
      title:        product.title,
      variantTitle: variant.title,
      price:        variant.price,
      image:        getMainImage(product),
    });
  };

  return (
    <section
      id="shop-preview"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "var(--off-white)",
        padding: "120px 0",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-up" style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          marginBottom: "48px",
        }}>
          <div>
            <span className="section-label">GB Wear</span>
            <h2 className="section-title" style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}>
              Shop The<br />Collection
            </h2>
          </div>
          <Link href="/products" style={{
            fontFamily: "var(--font-head)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
            textDecoration: "none",
          }} className="view-all-link">
            View All Products →
          </Link>
        </div>

        {/* 4-col grid */}
        <div
          className="fade-up delay-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
          id="shop-preview-grid-wrapper"
        >
          {products.map((product) => {
            const mainImg  = getMainImage(product);
            const hoverImg = getHoverImage(product);
            const price    = getLowestPrice(product);
            const avail    = isAvailable(product);

            return (
              <div
                key={product.id}
                style={{
                  position: "relative",
                  background: "var(--dark-2)",
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "3px solid transparent",
                  transition: "transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.25s",
                  cursor: "pointer",
                }}
                className="preview-card-item"
              >
                <Link
                  href={`/products/${product.handle}`}
                  style={{ display: "flex", flexDirection: "column", flex: 1, textDecoration: "none", color: "inherit" }}
                >
                  {/* Image */}
                  <div style={{
                    position: "relative",
                    aspectRatio: "1 / 1.1",
                    overflow: "hidden",
                    background: "var(--dark-3)",
                  }}>
                    <Image
                      src={mainImg}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="preview-img-main"
                    />
                    <Image
                      src={hoverImg}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover", opacity: 0 }}
                      className="preview-img-hover"
                    />
                    {!avail && (
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        zIndex: 2,
                        fontFamily: "var(--font-head)",
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        background: "var(--grey)",
                        color: "var(--black)",
                        padding: "3px 8px",
                      }}>
                        Sold Out
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: "16px 18px 10px" }}>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      marginBottom: "4px",
                    }}>
                      {product.product_type}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "18px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                      color: "var(--black)",
                      marginBottom: "8px",
                    }}>
                      {product.title}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "var(--black)",
                    }}>
                      {formatPrice(price)}
                    </div>
                  </div>
                </Link>

                {/* Add to cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!avail}
                  style={{
                    width: "100%",
                    padding: "11px",
                    fontFamily: "var(--font-head)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "transparent",
                    color: "rgba(0,0,0,0.5)",
                    border: "none",
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                    transition: "all 0.25s",
                    marginTop: "10px",
                    cursor: avail ? "pointer" : "not-allowed",
                  }}
                  className="preview-atc-btn"
                >
                  {avail ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Browse all */}
        <div className="fade-up delay-2" style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/products" className="btn btn-outline">
            Browse Full Shop →
          </Link>
        </div>
      </div>

      <style>{`
        .view-all-link:hover { color: var(--black) !important; border-color: var(--black) !important; }
        .preview-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          border-top-color: var(--red) !important;
        }
        .preview-card-item:hover .preview-img-main { opacity: 0; }
        .preview-card-item:hover .preview-img-hover { opacity: 1 !important; }
        .preview-card-item:hover .preview-atc-btn { color: var(--black); background: rgba(200,16,46,0.06); }
        .preview-atc-btn:hover { background: var(--red) !important; color: var(--white) !important; }
        @media (max-width: 1024px) {
          #shop-preview-grid-wrapper { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
