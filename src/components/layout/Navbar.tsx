"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { label: "About",       href: "/#about" },
  { label: "Programmes",  href: "/#programmes" },
  { label: "Schedule",    href: "/#schedule" },
  { label: "Instructors", href: "/#instructors" },
  { label: "FAQ",         href: "/#faq" },
  { label: "Contact",     href: "/#contact" },
  { label: "Shop",        href: "/products" },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const openCart   = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <nav
        id="nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background 0.4s var(--ease), backdrop-filter 0.4s, box-shadow 0.4s",
          ...(scrolled ? {
            background: "rgba(8,8,8,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
          } : {}),
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
          padding: "0 40px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "20px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--white)",
          }}>
            <div style={{
              width: "42px",
              height: "42px",
              background: "var(--red)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "-1px",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              color: "var(--white)",
            }}>
              GB
            </div>
            <div style={{ lineHeight: 1.1 }}>
              Gracie Barra
              <span style={{
                display: "block",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "var(--grey)",
              }}>
                Haringey · London
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            listStyle: "none",
          }} className="nav-links-desktop">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                    position: "relative",
                    textDecoration: "none",
                  }}
                  className="nav-link-item"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Cart + CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-head)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--white)",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s",
                cursor: "pointer",
                background: "none",
              }}
              className="nav-cart-btn-el"
            >
              🛍 Cart
              {totalItems > 0 && (
                <span style={{
                  minWidth: "18px",
                  height: "18px",
                  background: "var(--red)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 900,
                  padding: "0 4px",
                  color: "var(--white)",
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Free Trial CTA */}
            <Link
              href="/#cta"
              style={{
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "10px 22px",
                textDecoration: "none",
                transition: "background 0.3s",
              }}
              className="nav-cta-btn"
            >
              Free Trial
            </Link>

            {/* Hamburger */}
            <button
              onClick={toggleMobile}
              aria-label="Menu"
              className="nav-hamburger-btn"
              style={{
                display: "none",
                flexDirection: "column",
                gap: "5px",
                width: "26px",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <span style={{
                display: "block",
                height: "2px",
                background: "var(--white)",
                transition: "all 0.3s var(--ease)",
                transformOrigin: "center",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }} />
              <span style={{
                display: "block",
                height: "2px",
                background: "var(--white)",
                transition: "all 0.3s var(--ease)",
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block",
                height: "2px",
                background: "var(--white)",
                transition: "all 0.3s var(--ease)",
                transformOrigin: "center",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(8,8,8,0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
          zIndex: 999,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#cta"
            onClick={closeMobile}
            className="btn btn-primary"
          >
            <span>Book Free Trial</span>
          </Link>
        </div>
      )}

      {/* Inline styles for hover effects & responsive */}
      <style>{`
        .nav-link-item::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--red);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease);
        }
        .nav-link-item:hover { color: var(--white) !important; }
        .nav-link-item:hover::after { transform: scaleX(1); }
        .nav-cta-btn:hover { background: var(--red-light) !important; }
        .nav-cart-btn-el:hover { border-color: var(--red) !important; color: var(--red) !important; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cart-btn-el   { display: none !important; }
          .nav-cta-btn       { display: none !important; }
          .nav-hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
