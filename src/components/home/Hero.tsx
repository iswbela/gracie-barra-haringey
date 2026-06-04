"use client";

import Link from "next/link";

const trustBadges = [
  { icon: "👥", text: "500+ Active Members" },
  { icon: "🏅", text: "GB Certified School" },
  { icon: "🥋", text: "All Levels Welcome" },
  { icon: "🏆", text: "10+ Competition Titles" },
];

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

      {/* ── Background ────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 60% 50%, rgba(200,16,46,0.18) 0%, transparent 60%),
          linear-gradient(160deg, #001a4d 0%, #002878 40%, #001a4d 100%)
        `,
      }}>
        {/* Tatami diamond texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg,  transparent, transparent 20px, rgba(255,255,255,0.022) 20px, rgba(255,255,255,0.022) 21px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.022) 20px, rgba(255,255,255,0.022) 21px)
          `,
          pointerEvents: "none",
        }} />
        {/* Animated diagonal lines */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(255,255,255,0.03) 60px,
            rgba(255,255,255,0.03) 61px
          )`,
          animation: "gridMove 20s linear infinite",
        }} />
        {/* Left-to-right fade — eased, lighter */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right,
            rgba(0,20,70,0.72)  0%,
            rgba(0,20,70,0.60) 22%,
            rgba(0,20,70,0.35) 44%,
            rgba(0,20,70,0.10) 62%,
            rgba(0,20,70,0.00) 78%
          )`,
        }} />
        {/* Subtle red-to-transparent accent glow at the transition seam */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 28% 70% at 42% 50%,
            rgba(200,16,46,0.07) 0%,
            transparent 100%
          )`,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Right-side video (UNCHANGED) ──────────────────── */}
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
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right,
            rgba(0,20,70,1.00)  0%,
            rgba(0,20,70,0.95)  6%,
            rgba(0,20,70,0.82) 14%,
            rgba(0,20,70,0.60) 26%,
            rgba(0,20,70,0.33) 40%,
            rgba(0,20,70,0.12) 56%,
            rgba(0,20,70,0.02) 70%,
            rgba(0,20,70,0.00) 82%
          )`,
          pointerEvents: "none",
        }} />
        {/* Bottom vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top,
            rgba(0,20,70,0.45)  0%,
            rgba(0,20,70,0.15) 20%,
            rgba(0,20,70,0.00) 38%
          )`,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Hero content (left side) ───────────────────────── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        paddingLeft: "48px",
        paddingRight: "40px",
        paddingTop: "80px",
        maxWidth: "660px",
        marginLeft: "32px",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Eyebrow badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.92)",
          fontFamily: "var(--font-head)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          padding: "7px 16px",
          marginBottom: "28px",
          width: "fit-content",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            animation: "pulse 2s ease infinite",
            flexShrink: 0,
          }} />
          Gracie Barra Certified · North London
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-head)",
          fontWeight: 900,
          lineHeight: 0.88,
          textTransform: "uppercase",
          marginBottom: "0",
          letterSpacing: "-0.01em",
        }}>
          <span style={{
            display: "block",
            fontSize: "clamp(62px, 8.5vw, 118px)",
            color: "#FFFFFF",
            textShadow: "0 2px 32px rgba(0,0,0,0.25)",
          }}>
            Forge
          </span>
          <span style={{
            display: "block",
            fontSize: "clamp(62px, 8.5vw, 118px)",
            color: "var(--red)",
            textShadow: "0 2px 40px rgba(200,16,46,0.35)",
          }}>
            Champions
          </span>
          <span style={{
            display: "block",
            fontSize: "clamp(22px, 3vw, 42px)",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
            letterSpacing: "0.28em",
            marginTop: "10px",
          }}>
            On The Mat
          </span>
        </h1>

        {/* Divider */}
        <div style={{
          width: "48px",
          height: "3px",
          background: "var(--red)",
          margin: "28px 0",
          flexShrink: 0,
        }} />

        {/* Supporting copy */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.72)",
          maxWidth: "460px",
          marginBottom: "32px",
        }}>
          World-class Brazilian Jiu-Jitsu in North London. Whether you&apos;re stepping
          on the mat for the first time or preparing for competition — our GB-certified
          coaches build champions at every level.
        </p>

        {/* Trust badges */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "36px",
        }}>
          {trustBadges.map((badge) => (
            <div key={badge.text} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              padding: "7px 13px",
              fontFamily: "var(--font-head)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              borderRadius: "2px",
            }}>
              <span style={{ fontSize: "12px" }}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
          marginBottom: "36px",
        }}>
          <Link href="/#cta" className="btn btn-primary hero-cta-primary">
            <span>Start Your Free Trial</span>
          </Link>
          <Link href="/#schedule" className="btn hero-cta-secondary">
            View Schedule
            <span style={{ fontFamily: "monospace", fontSize: "16px" }}>→</span>
          </Link>
        </div>

        {/* Testimonial card */}
        <div className="hero-testimonial" style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          padding: "16px 18px",
          background: "rgba(255,255,255,0.055)",
          borderLeft: "3px solid var(--red)",
          maxWidth: "440px",
        }}>
          {/* Avatar monogram */}
          <div style={{
            width: "42px",
            height: "42px",
            minWidth: "42px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C8102E 0%, #7d0f1f 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-head)",
            fontWeight: 900,
            fontSize: "15px",
            color: "#fff",
            letterSpacing: "0.03em",
          }}>
            JR
          </div>
          <div>
            <div style={{
              color: "#FFB400",
              fontSize: "12px",
              letterSpacing: "2px",
              marginBottom: "5px",
            }}>
              ★★★★★
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 7px",
              fontStyle: "italic",
            }}>
              &ldquo;Best decision of my life. The coaches here don&apos;t just teach
              technique — they build champions from the inside out.&rdquo;
            </p>
            <div style={{
              fontFamily: "var(--font-head)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}>
              James R. &nbsp;·&nbsp; Blue Belt &nbsp;·&nbsp; Member since 2022
            </div>
          </div>
        </div>

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
        /* Secondary CTA — ghost on dark */
        .hero-cta-secondary {
          background: transparent !important;
          color: rgba(255,255,255,0.88) !important;
          border: 1px solid rgba(255,255,255,0.28) !important;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          letter-spacing: 0.1em;
          padding: 16px 28px;
        }
        .hero-cta-secondary:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(255,255,255,0.55) !important;
          color: #fff !important;
        }
        .hero-cta-primary {
          min-width: 210px;
          justify-content: center;
          font-size: 14px;
          letter-spacing: 0.12em;
          padding: 16px 32px;
        }
        @media (max-width: 1024px) {
          #hero > div[style*="paddingLeft"] { padding-left: 32px !important; margin-left: 16px !important; }
        }
        @media (max-width: 768px) {
          #hero .hero-right-panel { width: 100% !important; opacity: 0.15; }
          .hero-testimonial { display: none !important; }
          #hero > div[style*="paddingLeft"] { padding-left: 20px !important; padding-right: 20px !important; margin-left: 0 !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
