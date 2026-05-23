"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const programmes = [
  {
    num: "01",
    icon: "🥋",
    title: "Adults BJJ",
    tag: "Ages 16+",
    body: "Our flagship programme covers all aspects of Brazilian Jiu-Jitsu — takedowns, guard passing, submissions and self-defence. Suitable for all levels.",
    features: ["Fundamentals & Advanced tracks", "Gi & No-Gi classes", "Live sparring (rolling)", "Competition preparation"],
    featured: false,
  },
  {
    num: "02",
    icon: "👶",
    title: "Kids & Teens",
    tag: "Ages 4–15",
    body: "Build confidence, discipline and resilience. Our GB Kids programme uses age-appropriate methods to develop character alongside technique.",
    features: ["Little Champions (4–6 yrs)", "Kids (7–12 yrs)", "Teens (13–15 yrs)", "Anti-bullying focus"],
    featured: true,
  },
  {
    num: "03",
    icon: "💪",
    title: "No-Gi / Fitness",
    tag: "All Levels",
    body: "Grappling without the kimono. Fast-paced, athletic and a phenomenal workout. Perfect for MMA athletes and those who prefer shorts over gi.",
    features: ["Wrestling & leg locks", "High-intensity drilling", "Crossfit-style warm-ups", "Great standalone workout"],
    featured: false,
  },
];

export function Programmes() {
  const ref = useScrollAnimation();

  return (
    <section
      id="programmes"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "120px 0",
        background: "var(--black)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <span className="section-label fade-up" style={{ justifyContent: "center" }}>
            Training Programmes
          </span>
          <h2
            className="section-title fade-up delay-1"
            style={{ fontSize: "clamp(52px, 7vw, 90px)", marginBottom: "20px" }}
          >
            Train For<br />Your Goals
          </h2>
          <p className="fade-up delay-2" style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "560px",
            margin: "0 auto",
          }}>
            Every programme is structured with the Gracie Barra curriculum — giving you a clear path from your first class to black belt.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }} className="programmes-grid-responsive">
          {programmes.map((prog, i) => (
            <div
              key={prog.num}
              className={`programme-card-item fade-up${i > 0 ? ` delay-${i}` : ""}${prog.featured ? " featured-card" : ""}`}
              style={{
                position: "relative",
                overflow: "hidden",
                background: prog.featured ? "var(--dark-3)" : "var(--dark-2)",
                padding: "56px 36px 44px",
                transition: "transform 0.4s var(--ease)",
              }}
            >
              {prog.featured && (
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "var(--red)",
                  color: "var(--white)",
                  fontFamily: "var(--font-head)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  padding: "4px 10px",
                }}>
                  POPULAR
                </div>
              )}

              {/* Red top border */}
              <div className="card-top-border" style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--red)",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s var(--ease)",
              }} />

              <div style={{
                fontFamily: "var(--font-head)",
                fontWeight: 900,
                fontSize: "80px",
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                marginBottom: "24px",
                transition: "color 0.4s",
              }} className="card-bg-num">
                {prog.num}
              </div>
              <div style={{
                width: "52px",
                height: "52px",
                background: "rgba(200,16,46,0.1)",
                border: "1px solid rgba(200,16,46,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "20px",
                transition: "background 0.3s, border-color 0.3s",
              }} className="card-icon-box">
                {prog.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "32px",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: "12px",
              }}>
                {prog.title}
              </h3>
              <div style={{
                fontFamily: "var(--font-head)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "16px",
              }}>
                {prog.tag}
              </div>
              <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}>
                {prog.body}
              </p>
              <ul style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "20px",
                listStyle: "none",
              }}>
                {prog.features.map((f) => (
                  <li key={f} style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    padding: "5px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <span style={{ color: "var(--red)", fontWeight: 700 }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/#cta" className="btn btn-primary fade-up">
            <span>Book a Free Trial Class</span>
          </Link>
        </div>
      </div>

      <style>{`
        .programme-card-item:hover { transform: translateY(-4px); }
        .programme-card-item:hover .card-top-border { transform: scaleX(1) !important; }
        .programme-card-item:hover .card-bg-num { color: rgba(200,16,46,0.08) !important; }
        .programme-card-item:hover .card-icon-box { background: rgba(200,16,46,0.2) !important; border-color: rgba(200,16,46,0.6) !important; }
        @media (max-width: 1024px) {
          .programmes-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .programmes-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
