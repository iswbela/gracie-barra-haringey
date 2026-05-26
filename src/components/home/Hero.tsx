"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" style={{
      position: "relative",
      height: "100vh",
      minHeight: "700px",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Animated background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 60% 50%, rgba(200,16,46,0.12) 0%, transparent 60%),
          linear-gradient(160deg, #0D0D0D 0%, #1A0508 40%, #0D0D0D 100%)
        `,
      }}>
        {/* Animated diagonal grid */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(200,16,46,0.03) 60px,
            rgba(200,16,46,0.03) 61px
          )`,
          animation: "gridMove 20s linear infinite",
        }} />
        {/* Overlay gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.2) 100%)",
        }} />
      </div>

      {/* Right side video panel */}
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "58%",
        overflow: "hidden",
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/media/training-highlight.mp4" type="video/mp4" />
        </video>
        {/* Left fade overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0) 30%)",
          pointerEvents: "none",
        }} />
        {/* Bottom fade overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Hero content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "0 40px",
        maxWidth: "760px",
        marginLeft: "40px",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(200,16,46,0.15)",
          border: "1px solid rgba(200,16,46,0.4)",
          color: "var(--red)",
          fontFamily: "var(--font-head)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "8px 16px",
          marginBottom: "28px",
        }}>
          <span style={{ fontSize: "8px", animation: "pulse 2s ease infinite" }}>●</span>
          Gracie Barra Certified School · Est. London
        </div>

        <h1 style={{
          fontFamily: "var(--font-head)",
          fontWeight: 900,
          fontSize: "clamp(60px, 8vw, 120px)",
          lineHeight: 0.92,
          textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          <span style={{ display: "block", color: "var(--white)" }}>Forge</span>
          <span style={{ display: "block", color: "var(--red)" }}>Champions</span>
          <span style={{ display: "block", color: "rgba(255,255,255,0.15)" }}>On The Mat</span>
        </h1>

        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "16px",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)",
          maxWidth: "480px",
          marginBottom: "44px",
        }}>
          North London's home for world-class Brazilian Jiu-Jitsu. Training adults, kids and beginners since day one — on the mat and in life.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/#cta" className="btn btn-primary">
            <span>Start Your Free Trial</span>
          </Link>
          <Link href="/#about" className="btn btn-outline">
            Discover More
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-head)",
        fontSize: "11px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
      }}>
        <div style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to bottom, var(--red), transparent)",
          animation: "scrollLine 2s ease infinite",
        }} />
        Scroll
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero .hero-right-panel { width: 100% !important; opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
