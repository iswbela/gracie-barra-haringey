"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" style={{
      position: "relative",
      height: "100vh",
      minHeight: "600px",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>

      {/* ── Full-width background video ───────────────────── */}
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
          objectPosition: "center",
        }}
      >
        <source src="/media/training-highlight.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ──────────────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(10,10,10,0.62)",
      }} />

      {/* ── Hero content ──────────────────────────────────── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        paddingLeft: "clamp(20px, 6vw, 80px)",
        paddingRight: "clamp(20px, 4vw, 48px)",
        paddingTop: "clamp(90px, 12vh, 120px)",
        maxWidth: "760px",
        width: "100%",
      }}>

        {/* Thin accent line */}
        <div style={{
          width: "40px",
          height: "2px",
          background: "var(--red)",
          marginBottom: "22px",
        }} />

        {/* Main title — large */}
        <h1 style={{
          fontFamily: "var(--font-modern)",
          fontWeight: 700,
          fontSize: "clamp(28px, 5.5vw, 62px)",
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "14px",
        }}>
          Brazilian Jiu Jitsu{" "}
          <span style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.55)",
          }}>
            at Haringey,
          </span>{" "}
          London
        </h1>

        {/* Subtitle — small */}
        <p style={{
          fontFamily: "var(--font-modern)",
          fontWeight: 300,
          fontSize: "clamp(11px, 2vw, 15px)",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          marginBottom: "30px",
        }}>
          Where Character Meets Combat
        </p>

        {/* Ratings row */}
        <div className="hero-ratings-row" style={{
          display: "flex",
          gap: "28px",
          marginBottom: "40px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          {[
            { label: "Google", color: "#4285F4" },
            { label: "Facebook", color: "#1877F2" },
          ].map(({ label, color }) => (
            <div key={label} style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill={color} />
                <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                  {label[0]}
                </text>
              </svg>
              <div>
                <div style={{ color: "#FFB400", fontSize: "11px", letterSpacing: "3px", lineHeight: 1 }}>
                  ★★★★★
                </div>
                <div style={{
                  fontFamily: "var(--font-modern)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "3px",
                }}>
                  5.0 · {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/#cta" className="btn btn-primary hero-cta-btn">
          Book a Free Class
        </Link>

      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-head)",
        fontSize: "10px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
      }}>
        <div style={{
          width: "1px",
          height: "56px",
          background: "linear-gradient(to bottom, var(--red), transparent)",
          animation: "scrollLine 2s ease infinite",
        }} />
        Scroll
      </div>

      <style>{`
        .hero-cta-btn {
          font-size: 13px !important;
          letter-spacing: 0.18em !important;
          padding: 16px 36px !important;
          text-transform: uppercase;
        }
        @media (max-width: 480px) {
          .hero-ratings-row { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
