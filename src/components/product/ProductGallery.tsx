"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface Props {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  const current = images[activeIdx];
  const thumbs  = images.slice(0, 6);

  return (
    <>
      <div style={{ position: "sticky", top: "90px" }}>
        {/* Main image */}
        <div
          onClick={() => setZoomed(true)}
          style={{
            position: "relative",
            aspectRatio: "1 / 1.15",
            background: "var(--dark-2)",
            overflow: "hidden",
            cursor: "zoom-in",
          }}
          className="gallery-main-wrap"
        >
          {current && (
            <Image
              src={current.src}
              alt={`${title} — image ${activeIdx + 1}`}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s var(--ease)" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeIdx === 0}
              className="gallery-main-img"
            />
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
              pointerEvents: "none",
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(8,8,8,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "var(--white)",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                className="gallery-arrow-btn"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(8,8,8,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "var(--white)",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                className="gallery-arrow-btn"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          )}

          {/* Counter */}
          <div style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            zIndex: 2,
            fontFamily: "var(--font-head)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.5)",
            background: "rgba(8,8,8,0.7)",
            padding: "4px 10px",
          }}>
            {activeIdx + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {thumbs.length > 1 && (
          <div style={{ display: "flex", gap: "2px", marginTop: "2px" }}>
            {thumbs.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveIdx(i)}
                style={{
                  flex: 1,
                  aspectRatio: "1 / 1",
                  background: "var(--dark-2)",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `2px solid ${i === activeIdx ? "var(--red)" : "transparent"}`,
                  transition: "border-color 0.2s",
                  position: "relative",
                }}
              >
                <Image
                  src={img.src}
                  alt={`${title} thumb ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              fontSize: "28px",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              background: "none",
              border: "none",
              transition: "color 0.2s",
            }}
          >
            ×
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "600px",
              aspectRatio: "1 / 1.15",
            }}
          >
            {current && (
              <Image
                src={current.src}
                alt={title}
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
              />
            )}
          </div>

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "32px",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: "24px",
                  transition: "color 0.2s",
                }}
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "32px",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: "24px",
                  transition: "color 0.2s",
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        .gallery-main-wrap:hover .gallery-main-img { transform: scale(1.04); }
        .gallery-arrow-btn:hover { background: var(--red) !important; border-color: var(--red) !important; }
      `}</style>
    </>
  );
}
