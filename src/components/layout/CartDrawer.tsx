"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

function formatPrice(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 70,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer */}
      <aside style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 80,
        width: "100%",
        maxWidth: "440px",
        background: "var(--dark)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🛍</span>
            <h2 style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--white)",
            }}>
              Cart
            </h2>
            {items.length > 0 && (
              <span style={{
                fontFamily: "var(--font-head)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 600,
              }}>
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            className="cart-close-btn"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {items.length === 0 ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "16px",
              color: "rgba(255,255,255,0.3)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "48px" }}>🛍</div>
              <p style={{
                fontFamily: "var(--font-head)",
                fontSize: "22px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.25)" }}>
                Discover our latest collection and add items to your cart.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ marginTop: "8px" }}
              >
                <span>Shop Now</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item) => (
                <div key={item.variantId} style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px",
                  background: "var(--dark-2)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}>
                  {/* Image */}
                  <div style={{
                    position: "relative",
                    width: "72px",
                    height: "88px",
                    flexShrink: 0,
                    background: "var(--dark-3)",
                    overflow: "hidden",
                  }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="72px"
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/products/${item.handle}`}
                      onClick={closeCart}
                      style={{
                        fontFamily: "var(--font-head)",
                        fontWeight: 700,
                        fontSize: "15px",
                        textTransform: "uppercase",
                        color: "var(--white)",
                        textDecoration: "none",
                        letterSpacing: "0.05em",
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Link>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                      {item.variantTitle}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "var(--red)",
                      marginTop: "6px",
                    }}>
                      {formatPrice(parseFloat(item.price))}
                    </div>

                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: "none",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "16px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        fontFamily: "var(--font-head)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "var(--white)",
                        minWidth: "24px",
                        textAlign: "center",
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: "none",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "16px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        style={{
                          marginLeft: "auto",
                          color: "rgba(255,255,255,0.25)",
                          fontSize: "18px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          transition: "color 0.2s",
                          padding: "4px",
                        }}
                        className="remove-item-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: "24px 28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-head)", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Subtotal
              </span>
              <span style={{
                fontFamily: "var(--font-head)",
                fontSize: "24px",
                fontWeight: 900,
                color: "var(--white)",
              }}>
                {formatPrice(totalPrice())}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", marginBottom: "16px" }}>
              Shipping and taxes calculated at checkout.
            </p>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "18px" }}>
              <span>Proceed to Checkout</span>
            </button>
            <button
              onClick={clearCart}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "10px",
                fontSize: "12px",
                fontFamily: "var(--font-head)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>

      <style>{`
        .cart-close-btn:hover { color: var(--white) !important; border-color: var(--red) !important; }
        .remove-item-btn:hover { color: var(--red) !important; }
        .clear-cart-btn:hover { color: var(--red) !important; }
      `}</style>
    </>
  );
}
