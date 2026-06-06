"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section
      id="cta"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ position: "relative", padding: "140px 0", overflow: "hidden", background: "var(--black)" }}
    >
      {/* Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 70% 100% at 50% 50%, rgba(200,16,46,0.12) 0%, transparent 70%),
          var(--black)
        `,
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg, transparent, transparent 80px,
            rgba(200,16,46,0.025) 80px, rgba(200,16,46,0.025) 81px
          )`,
        }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="section-label fade-up" style={{ justifyContent: "center" }}>
            Start Today
          </span>
          <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(56px, 8vw, 110px)", marginBottom: "24px" }}>
            Your First<br />Class Is<br />On Us
          </h2>
          <p className="fade-up delay-2" style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "520px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            No experience required. No long-term commitment. Just show up, train and discover why Brazilian Jiu-Jitsu is the world's fastest-growing martial art.
          </p>
          <div className="fade-up delay-3" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <Link href="/#contact" className="btn btn-primary">
              <span>Book Free Trial</span>
            </Link>
            <a href="tel:+442012345678" className="btn cta-call-btn">
              Call Us Now
            </a>
          </div>

          {/* Trust signals */}
          <div className="fade-up delay-4 cta-trust-row" style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}>
            {["No experience needed", "All ages welcome", "No contract to sign", "Equipment provided"].map((item) => (
              <div key={item} style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-head)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}>
                <span style={{ color: "var(--red)" }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #cta .section-title { color: var(--white); }
        .cta-call-btn {
          background: #002878;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .cta-call-btn:hover {
          background: #003aaa;
          border-color: rgba(255,255,255,0.5);
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
