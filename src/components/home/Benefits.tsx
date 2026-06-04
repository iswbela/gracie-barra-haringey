"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  { num: "01", icon: "🛡️", title: "Real Self-Defence",       body: "Proven on the street and in competition — BJJ teaches you to handle any situation from a position of control." },
  { num: "02", icon: "🔥", title: "Total Fitness",            body: "Strength, cardio, flexibility and coordination all improve rapidly. You'll get in the best shape of your life while learning." },
  { num: "03", icon: "🧠", title: "Mental Toughness",         body: "Constant problem-solving under pressure builds a resilient, calm mindset that carries into every area of life." },
  { num: "04", icon: "🤝", title: "Community & Belonging",   body: "The mat creates bonds unlike any other sport. Our school is a diverse, welcoming family from all walks of life." },
];

export function Benefits() {
  const ref = useScrollAnimation();

  return (
    <section
      id="benefits"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "120px 0",
        background: "var(--red)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid pattern */}
      <div style={{
        position: "absolute",
        inset: "-50%",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px)
        `,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "64px" }}>
          <span className="section-label fade-up" style={{
            color: "rgba(255,255,255,0.6)",
          }}>
            Why Brazilian Jiu-Jitsu
          </span>
          <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
            The Art That<br />Changes Lives
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
        }} className="benefits-grid-responsive">
          {benefits.map((b, i) => (
            <div
              key={b.num}
              className={`benefit-item-card fade-up${i > 0 ? ` delay-${i}` : ""}`}
              style={{
                padding: "40px 28px",
                background: "rgba(0,0,0,0.2)",
                borderBottom: "3px solid transparent",
                transition: "background 0.3s, border-color 0.3s, transform 0.3s",
              }}
            >
              <div style={{
                fontFamily: "var(--font-head)",
                fontWeight: 900,
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}>
                {b.num}
              </div>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{b.icon}</div>
              <h4 style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "24px",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: "12px",
                color: "var(--white)",
              }}>
                {b.title}
              </h4>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Override section-label and section-title colour inside red bg */
        #benefits .section-label { color: rgba(255,255,255,0.6); }
        #benefits .section-label::before { background: rgba(255,255,255,0.6); }
        #benefits .section-title { color: var(--white); }
        .benefit-item-card:hover {
          background: rgba(0,0,0,0.35) !important;
          border-color: var(--white) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          .benefits-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .benefits-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
