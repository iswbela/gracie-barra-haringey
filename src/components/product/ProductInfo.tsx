"use client";

import { useState } from "react";
import type { DetailProduct } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { extractListItems, stripHtml } from "@/lib/htmlUtils";

function formatPrice(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

interface Props {
  product: DetailProduct;
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          cursor: "pointer",
          background: "none",
          border: "none",
          color: open ? "var(--red)" : "var(--white)",
          transition: "color 0.2s",
        }}
      >
        <span style={{
          fontFamily: "var(--font-head)",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          {title}
        </span>
        <span style={{
          fontSize: "22px",
          color: "var(--red)",
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.35s var(--ease)",
          lineHeight: 1,
        }}>
          +
        </span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "500px" : "0",
        transition: "max-height 0.45s var(--ease)",
      }}>
        <div style={{
          paddingBottom: "24px",
          fontSize: "14px",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.5)",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity]         = useState(1);
  const [added, setAdded]               = useState(false);

  const addItem  = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const sizes        = product.options[0]?.values ?? [];
  const price        = Math.min(...product.variants.map((v) => parseFloat(v.price)));
  const comparePrice = product.variants[0]?.compare_at_price;
  const hasDiscount  = comparePrice && parseFloat(comparePrice) > price;
  const discount     = hasDiscount ? Math.round((1 - price / parseFloat(comparePrice!)) * 100) : 0;

  const selectedVariant = selectedSize
    ? product.variants.find((v) => v.option1 === selectedSize)
    : undefined;

  const isAvailble = selectedVariant
    ? selectedVariant.available
    : product.variants.some((v) => v.available);

  const careItems   = extractListItems(product.body_html);
  const description = stripHtml(product.body_html);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      addToast("Please select a size first.", "warning");
      return;
    }
    if (!isAvailble) {
      addToast("This item is out of stock.", "error");
      return;
    }

    const variant = selectedVariant ?? product.variants.find((v) => v.available) ?? product.variants[0];
    if (!variant) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        productId:    product.id,
        variantId:    variant.id,
        handle:       product.handle,
        title:        product.title,
        variantTitle: variant.title,
        price:        variant.price,
        image:        product.images[0]?.src ?? "/placeholder.png",
      });
    }

    setAdded(true);
    addToast(`${product.title}${selectedSize ? ` (${selectedSize})` : ""} added to cart!`, "success");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Product type */}
      <div style={{
        fontFamily: "var(--font-head)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "var(--red)",
        marginBottom: "12px",
      }}>
        {product.product_type}
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-head)",
        fontWeight: 900,
        fontSize: "clamp(36px, 4vw, 58px)",
        lineHeight: 0.9,
        textTransform: "uppercase",
        color: "var(--white)",
        marginBottom: "20px",
      }}>
        {product.title}
      </h1>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px" }}>
        <span style={{
          fontFamily: "var(--font-head)",
          fontSize: "32px",
          fontWeight: 400,
          color: "var(--white)",
          letterSpacing: "0.02em",
        }}>
          {formatPrice(price)}
        </span>
        {hasDiscount && (
          <>
            <span style={{
              fontFamily: "var(--font-head)",
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.3)",
              textDecoration: "line-through",
            }}>
              {formatPrice(parseFloat(comparePrice!))}
            </span>
            <span style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              background: "var(--red)",
              color: "var(--white)",
              padding: "3px 10px",
            }}>
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock indicator */}
      <div style={{
        fontFamily: "var(--font-head)",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: isAvailble ? "#4caf50" : "rgba(255,255,255,0.3)",
        marginBottom: "20px",
      }}>
        ● {isAvailble ? "In Stock" : "Out of Stock"}
      </div>

      {/* Description */}
      {description && (
        <p style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.55)",
          marginBottom: "28px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
        }}>
          {description.slice(0, 300)}{description.length > 300 ? "…" : ""}
        </p>
      )}

      {/* Size selector */}
      {sizes.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            fontFamily: "var(--font-head)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--grey)",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            Size
            {selectedSize && (
              <span style={{ color: "var(--white)", fontSize: "13px" }}>— {selectedSize}</span>
            )}
            <span style={{
              marginLeft: "auto",
              color: "rgba(255,255,255,0.3)",
              fontSize: "11px",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
            }}>
              Size Guide
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {sizes.map((size) => {
              const variant = product.variants.find((v) => v.option1 === size);
              const avail   = variant?.available ?? false;
              const active  = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => avail && setSelectedSize(size)}
                  disabled={!avail}
                  style={{
                    minWidth: "52px",
                    height: "44px",
                    padding: "0 12px",
                    border: `1px solid ${active ? "var(--white)" : "rgba(255,255,255,0.12)"}`,
                    fontFamily: "var(--font-head)",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: active ? "var(--black)" : avail ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                    background: active ? "var(--white)" : "transparent",
                    transition: "all 0.2s",
                    cursor: avail ? "pointer" : "not-allowed",
                    textDecoration: !avail ? "line-through" : "none",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Qty + Add to Cart */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {/* Qty */}
        <div style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{
              width: "44px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s, background 0.2s",
            }}
          >
            −
          </button>
          <span style={{
            width: "52px",
            height: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-head)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--white)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            style={{
              width: "44px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s, background 0.2s",
            }}
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailble}
          className="btn btn-primary"
          style={{
            flex: 1,
            height: "58px",
            padding: "0 24px",
            fontSize: "16px",
            letterSpacing: "0.15em",
            justifyContent: "center",
            opacity: isAvailble ? 1 : 0.4,
            cursor: isAvailble ? "pointer" : "not-allowed",
          }}
        >
          <span>{added ? "✓ Added!" : isAvailble ? "Add to Cart" : "Out of Stock"}</span>
        </button>
      </div>

      {/* Trust badges */}
      <div style={{
        display: "flex",
        border: "1px solid rgba(255,255,255,0.06)",
        marginTop: "24px",
      }}>
        {[
          { icon: "🚚", text: "Free Shipping\n£50+" },
          { icon: "↩️", text: "30-Day\nReturns" },
          { icon: "🔒", text: "Secure\nPayment" },
          { icon: "🏅", text: "GB Official\nMerch" },
        ].map((t, i) => (
          <div key={t.icon} style={{
            flex: 1,
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            textAlign: "center",
          }}>
            <span style={{ fontSize: "20px" }}>{t.icon}</span>
            <span style={{
              fontFamily: "var(--font-head)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.3,
              whiteSpace: "pre-line",
            }}>
              {t.text}
            </span>
          </div>
        ))}
      </div>

      {/* Accordions */}
      <div style={{ marginTop: "40px" }}>
        {description && (
          <Accordion title="Description" defaultOpen>
            <p>{description}</p>
          </Accordion>
        )}
        {careItems.length > 0 && (
          <Accordion title="Washing & Care">
            <ul style={{ listStyle: "none" }}>
              {careItems.map((item, i) => (
                <li key={i} style={{ padding: "4px 0 4px 14px", position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    color: "var(--red)",
                    fontSize: "10px",
                  }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Accordion>
        )}
        <Accordion title="Shipping & Returns">
          <p>Free standard shipping on orders over £50. Express delivery available. Returns accepted within 30 days of purchase in original condition. See our full returns policy for details.</p>
        </Accordion>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  );
}
