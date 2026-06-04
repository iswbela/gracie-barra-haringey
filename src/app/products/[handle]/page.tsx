import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { DetailProduct, CatalogProduct } from "@/types/product";
import { getProductByHandle, getDetailProducts, getRelatedProducts, stripHtml } from "@/lib/details";
import { getCatalogProducts } from "@/lib/catalog";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RecentlyViewedTracker } from "@/components/product/RecentlyViewedTracker";
import {
  getMainImage,
  getHoverImage,
  getLowestPrice,
  formatPrice,
  isAvailable,
} from "@/lib/catalogUtils";

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found" };
  const description = stripHtml(product.body_html).slice(0, 160);
  return {
    title: product.title,
    description,
    openGraph: {
      title:  product.title,
      description,
      images: product.images[0]?.src ? [{ url: product.images[0].src }] : [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductByHandle(params.handle);

  if (!product) {
    const catalogProducts = getCatalogProducts();
    const catalogProduct  = catalogProducts.find((p) => p.handle === params.handle);
    if (!catalogProduct) notFound();
    return (
      <ProductPageLayout
        product={catalogProduct as DetailProduct}
        related={[]}
        allCatalog={catalogProducts}
      />
    );
  }

  const allDetails = getDetailProducts();
  const related    = getRelatedProducts(product, allDetails, 4);
  const catalog    = getCatalogProducts();

  return (
    <ProductPageLayout product={product} related={related} allCatalog={catalog} />
  );
}

function RelatedCard({ product }: { product: CatalogProduct }) {
  const mainImg  = getMainImage(product);
  const hoverImg = getHoverImage(product);
  const price    = getLowestPrice(product);
  const avail    = isAvailable(product);

  return (
    <Link
      href={`/products/${product.handle}`}
      style={{
        position: "relative",
        background: "var(--dark-2)",
        display: "flex",
        flexDirection: "column",
        borderTop: "3px solid transparent",
        transition: "transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-top-color 0.25s",
        textDecoration: "none",
        color: "inherit",
      }}
      className="related-card-item"
    >
      <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", background: "var(--dark-3)" }}>
        <Image src={mainImg}  alt={product.title} fill style={{ objectFit: "cover" }} className="rel-img-main" />
        <Image src={hoverImg} alt={product.title} fill style={{ objectFit: "cover", opacity: 0 }} className="rel-img-hover" />
        {!avail && (
          <div style={{
            position: "absolute", top: "12px", left: "12px", zIndex: 2,
            fontFamily: "var(--font-head)", fontSize: "10px", fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            background: "var(--grey)", color: "var(--white)", padding: "3px 8px",
          }}>Sold Out</div>
        )}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "var(--font-head)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "4px" }}>
          {product.product_type}
        </div>
        <div style={{ fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, color: "var(--black)", marginBottom: "6px" }}>
          {product.title}
        </div>
        <div style={{ fontFamily: "var(--font-head)", fontSize: "18px", fontWeight: 400, color: "var(--black)" }}>
          {formatPrice(price)}
        </div>
      </div>

      <style>{`
        .related-card-item:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); border-top-color: var(--red) !important; }
        .related-card-item:hover .rel-img-main { opacity: 0; }
        .related-card-item:hover .rel-img-hover { opacity: 1 !important; }
      `}</style>
    </Link>
  );
}

function ProductPageLayout({
  product,
  related,
  allCatalog,
}: {
  product: DetailProduct;
  related: DetailProduct[];
  allCatalog: DetailProduct[];
}) {
  const relatedCatalog = related
    .map((r) => allCatalog.find((c) => c.handle === r.handle) ?? r)
    .filter(Boolean) as CatalogProduct[];

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: "100px 0 0", background: "var(--white)" }}>
        <div className="container">
          <div style={{
            padding: "20px 0",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-head)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.45)",
          }}>
            <Link href="/" className="breadcrumb-link" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}>Home</Link>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>/</span>
            <Link href="/products" className="breadcrumb-link" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}>Shop</Link>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>/</span>
            <span style={{ color: "rgba(0,0,0,0.7)" }}>{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product main */}
      <div style={{ background: "var(--white)", paddingBottom: "80px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            paddingTop: "40px",
            alignItems: "start",
          }} className="product-detail-grid">
            {/* Gallery */}
            <div>
              <RecentlyViewedTracker productId={product.id} />
              <ProductGallery images={product.images} title={product.title} />
            </div>
            {/* Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedCatalog.length > 0 && (
        <section style={{ background: "var(--off-white)", padding: "100px 0" }}>
          <div className="container">
            <span className="section-label">You Might Love</span>
            <h2 className="section-title" style={{ fontSize: "clamp(40px, 5vw, 72px)", marginBottom: "40px" }}>
              Related<br />Products
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2px",
            }} className="related-grid-responsive">
              {relatedCatalog.slice(0, 4).map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .breadcrumb-link:hover { color: var(--red) !important; }
        @media (max-width: 1024px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .related-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
