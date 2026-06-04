"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reviews = [
  {
    stars: "★★★★★",
    text: "I walked in knowing nothing about BJJ and left feeling completely welcome. The instructors are incredibly patient and the community here is unlike anything I've experienced at other gyms.",
    initials: "JR",
    name:     "James R.",
    since:    "Member since 2022 · White Belt",
    delay:    0,
  },
  {
    stars: "★★★★★",
    text: "My son has been training in the Kids programme for 18 months. His confidence, discipline and focus at school have genuinely transformed. Best decision we ever made as a family.",
    initials: "LM",
    name:     "Laura M.",
    since:    "Parent · GB Haringey Family",
    delay:    1,
  },
  {
    stars: "★★★★★",
    text: "Came for fitness, stayed for the sport. Two years later I've competed at three tournaments and won two of them. The coaches here genuinely invest in your progress.",
    initials: "AO",
    name:     "Adaeze O.",
    since:    "Member since 2021 · Blue Belt",
    delay:    2,
  },
];

export function Testimonials() {
  const ref = useScrollAnimation();

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "120px 0", background: "var(--white)" }}
    >
      <div className="container">
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "64px",
          gap: "24px",
          flexWrap: "wrap",
        }} className="testimonials-header-flex">
          <div>
            <span className="section-label fade-up">Student Reviews</span>
            <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
              What Our<br />Members Say
            </h2>
          </div>
          <div className="fade-up delay-2" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "16px 24px",
            minWidth: "200px",
          }}>
            <div>
              <div style={{ fontSize: "20px", letterSpacing: "2px", color: "#FFB400" }}>★★★★★</div>
            </div>
            <div style={{ fontFamily: "var(--font-head)" }}>
              <strong style={{ fontSize: "28px", fontWeight: 900 }}>5.0</strong>
              <span style={{
                display: "block",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--grey)",
              }}>
                Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="testimonials-grid-responsive">
          {reviews.map((r) => (
            <div
              key={r.name}
              className={`testimonial-card-item fade-up${r.delay > 0 ? ` delay-${r.delay}` : ""}`}
              style={{
                background: "var(--dark-2)",
                padding: "36px",
                border: "1px solid rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s, transform 0.3s",
              }}
            >
              {/* Decorative quote */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "24px",
                fontFamily: "Georgia, serif",
                fontSize: "100px",
                color: "rgba(200,16,46,0.08)",
                lineHeight: 1,
                pointerEvents: "none",
              }}>
                &ldquo;
              </div>

              <div style={{ color: "#FFB400", fontSize: "14px", letterSpacing: "2px", marginBottom: "16px" }}>
                {r.stars}
              </div>
              <p style={{
                fontSize: "15px",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.7,
                marginBottom: "24px",
                fontStyle: "italic",
              }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderTop: "1px solid rgba(0,0,0,0.1)",
                paddingTop: "20px",
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--dark-3)",
                  border: "2px solid var(--red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-head)",
                  fontWeight: 900,
                  fontSize: "16px",
                  color: "var(--red)",
                  flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--grey)" }}>{r.since}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card-item:hover { border-color: rgba(200,16,46,0.3) !important; transform: translateY(-3px); }
        @media (max-width: 768px) {
          .testimonials-grid-responsive { grid-template-columns: 1fr !important; }
          .testimonials-header-flex { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
