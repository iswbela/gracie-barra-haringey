"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct, FilterState, SortOption } from "@/types/product";
import {
  filterAndSort,
  getMainImage,
  getHoverImage,
  getLowestPrice,
  formatPrice,
  isAvailable,
} from "@/lib/catalogUtils";
import { useCartStore } from "@/store/cartStore";

const PAGE_SIZE = 24;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",     label: "Newest" },
  { value: "oldest",     label: "Oldest" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "alpha-asc",  label: "A → Z" },
  { value: "alpha-desc", label: "Z → A" },
];

interface Props {
  initialProducts: CatalogProduct[];
  productTypes: string[];
  tags: string[];
  vendors: string[];
  priceRange: { min: number; max: number };
}

function ProductCard({ product }: { product: CatalogProduct }) {
  const addItem    = useCartStore((s) => s.addItem);
  const mainImg    = getMainImage(product);
  const hoverImg   = getHoverImage(product);
  const price      = getLowestPrice(product);
  const avail      = isAvailable(product);

  const handleATC = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find((v) => v.available) ?? product.variants[0];
    if (!variant) return;
    addItem({
      productId:    product.id,
      variantId:    variant.id,
      handle:       product.handle,
      title:        product.title,
      variantTitle: variant.title,
      price:        variant.price,
      image:        mainImg,
    });
  };

  return (
    <div
      style={{
        position: "relative",
        background: "var(--dark-2)",
        display: "flex",
        flexDirection: "column",
        borderTop: "3px solid transparent",
        transition: "transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-top-color 0.25s",
      }}
      className="shop-product-card"
    >
      <Link href={`/products/${product.handle}`} style={{ display: "flex", flexDirection: "column", flex: 1, textDecoration: "none", color: "inherit" }}>
        {/* Image area */}
        <div style={{ position: "relative", aspectRatio: "1 / 1.15", overflow: "hidden", background: "var(--dark-3)" }}>
          <Image
            src={mainImg}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="shop-card-img-main"
          />
          <Image
            src={hoverImg}
            alt={product.title}
            fill
            style={{ objectFit: "cover", opacity: 0 }}
            className="shop-card-img-hover"
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
              color: "var(--white)",
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

      {/* Add to Cart */}
      <button
        onClick={handleATC}
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
        className="shop-card-atc"
      >
        {avail ? "Add to Cart" : "Sold Out"}
      </button>

      <style>{`
        .shop-product-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); border-top-color: var(--red) !important; }
        .shop-product-card:hover .shop-card-img-main { opacity: 0; }
        .shop-product-card:hover .shop-card-img-hover { opacity: 1 !important; }
        .shop-product-card:hover .shop-card-atc { color: var(--black); background: rgba(200,16,46,0.06); }
        .shop-card-atc:hover { background: var(--red) !important; color: var(--white) !important; }
      `}</style>
    </div>
  );
}

export function ProductListingClient({
  initialProducts,
  productTypes,
  tags,
}: Props) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    search:       searchParams.get("search") ?? "",
    productTypes: searchParams.get("type") ? [searchParams.get("type")!] : [],
    tags:         [],
    vendors:      [],
    sort:         (searchParams.get("sort") as SortOption) ?? "newest",
    priceMin:     0,
    priceMax:     0,
  });

  const handleFiltersChange = useCallback((f: FilterState) => {
    setFilters(f);
    setPage(1);
  }, []);

  const filtered  = useMemo(() => filterAndSort(initialProducts, filters), [initialProducts, filters]);
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = paginated.length < filtered.length;

  const toggleType = (type: string) => {
    const next = filters.productTypes.includes(type)
      ? filters.productTypes.filter((t) => t !== type)
      : [...filters.productTypes, type];
    handleFiltersChange({ ...filters, productTypes: next });
  };

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    handleFiltersChange({ ...filters, tags: next });
  };

  const clearAll = () => handleFiltersChange({
    search: "", productTypes: [], tags: [], vendors: [],
    sort: "newest", priceMin: 0, priceMax: 0,
  });

  return (
    <div>
      {/* Shop Header */}
      <section style={{
        position: "relative",
        padding: "160px 0 80px",
        background: "var(--off-white)",
        overflow: "hidden",
      }}>
        {/* Animated grid bg */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(200,16,46,0.03) 60px, rgba(200,16,46,0.03) 61px)`,
          animation: "gridMove 20s linear infinite",
          pointerEvents: "none",
        }} />
        {/* Watermark */}
        <div style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-head)",
          fontWeight: 900,
          fontSize: "240px",
          lineHeight: 1,
          color: "rgba(0,0,0,0.04)",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          SHOP
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div>
              <span className="section-label">GB Wear</span>
              <h1 className="section-title" style={{ fontSize: "clamp(64px, 8vw, 110px)" }}>
                Shop All
              </h1>
              <p style={{ fontSize: "16px", color: "rgba(0,0,0,0.55)", marginTop: "12px", maxWidth: "400px" }}>
                Premium sportswear and lifestyle clothing from Gracie Barra Haringey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <div style={{
        padding: "32px 0",
        background: "var(--white)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
                color: "rgba(0,0,0,0.35)",
                pointerEvents: "none",
              }}>
                ⌕
              </span>
              <input
                type="text"
                placeholder="Search products, categories, tags…"
                value={filters.search}
                onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                style={{
                  width: "100%",
                  background: "var(--off-white)",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRight: "none",
                  color: "var(--black)",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  padding: "16px 18px 16px 52px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  borderRadius: 0,
                }}
              />
            </div>
            <button
              onClick={() => {/* search already live */}}
              style={{
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0 28px",
                height: "54px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              Search
            </button>
          </div>
          <div style={{
            marginTop: "12px",
            fontFamily: "var(--font-head)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.5)",
          }}>
            {filtered.length} products found{filters.search ? ` for "${filters.search}"` : ""}
          </div>
        </div>
      </div>

      {/* Main shop area */}
      <div style={{ padding: "0 0 120px", background: "var(--white)" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "48px",
            paddingTop: "48px",
          }} className="shop-layout-grid">
            {/* Sidebar */}
            <aside>
              <div style={{ position: "sticky", top: "90px" }}>
                {/* Product Type */}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--red)",
                    marginBottom: "14px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}>
                    Product Type
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {productTypes.map((type) => {
                      const checked = filters.productTypes.includes(type);
                      return (
                        <div
                          key={type}
                          onClick={() => toggleType(type)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "6px 0",
                            cursor: "pointer",
                            color: checked ? "var(--red)" : "rgba(0,0,0,0.7)",
                            transition: "color 0.2s",
                          }}
                        >
                          <div style={{
                            width: "16px",
                            height: "16px",
                            border: `1px solid ${checked ? "var(--red)" : "rgba(0,0,0,0.2)"}`,
                            background: checked ? "var(--red)" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.2s",
                            fontSize: "11px",
                            color: "var(--white)",
                          }}>
                            {checked ? "✓" : ""}
                          </div>
                          <span style={{
                            fontFamily: "var(--font-head)",
                            fontSize: "15px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}>
                            {type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      marginBottom: "14px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                    }}>
                      Tags
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {tags.slice(0, 20).map((tag) => {
                        const active = filters.tags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            style={{
                              fontFamily: "var(--font-head)",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              padding: "5px 12px",
                              border: `1px solid ${active ? "var(--red)" : "rgba(0,0,0,0.15)"}`,
                              background: active ? "var(--red)" : "transparent",
                              color: active ? "var(--white)" : "rgba(0,0,0,0.6)",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Clear */}
                {(filters.productTypes.length > 0 || filters.tags.length > 0 || filters.search) && (
                  <button
                    onClick={clearAll}
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(0,0,0,0.4)",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      transition: "color 0.2s",
                    }}
                    className="clear-filters-btn"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Main grid */}
            <div>
              {/* Sort bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}>
                <p style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.5)",
                }}>
                  Showing {Math.min(paginated.length, filtered.length)} of {filtered.length}
                </p>
                <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFiltersChange({ ...filters, sort: opt.value })}
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "8px 16px",
                        background: filters.sort === opt.value ? "var(--red)" : "var(--dark-2)",
                        color: filters.sort === opt.value ? "var(--white)" : "rgba(0,0,0,0.6)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.25s",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products */}
              {filtered.length === 0 ? (
                <div style={{
                  padding: "80px 0",
                  textAlign: "center",
                  color: "rgba(0,0,0,0.4)",
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                  <p style={{ fontFamily: "var(--font-head)", fontSize: "24px", fontWeight: 800, textTransform: "uppercase" }}>
                    No products found
                  </p>
                  <p style={{ marginTop: "8px", color: "rgba(0,0,0,0.45)" }}>
                    Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={clearAll}
                    className="btn btn-primary"
                    style={{ marginTop: "24px" }}
                  >
                    <span>Clear Filters</span>
                  </button>
                </div>
              ) : (
                <>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "2px",
                  }} className="products-grid-responsive">
                    {paginated.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {hasMore && (
                    <div style={{ textAlign: "center", marginTop: "48px" }}>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="btn btn-outline"
                      >
                        Load More ({filtered.length - paginated.length} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .clear-filters-btn:hover { color: var(--red) !important; }
        @media (max-width: 1024px) {
          .shop-layout-grid { grid-template-columns: 1fr !important; }
          .products-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
