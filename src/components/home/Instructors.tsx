"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const instructors = [
  {
    monogram: "JM",
    photo:    "/media/Gemini_Generated_Image_nh4zhtnh4zhtnh4z.png",
    name:     "Prof. João Melo",
    title:    "Head Instructor · Black Belt 2nd Degree",
    bio:      "10+ years teaching BJJ in London. Former regional champion, GB certified instructor and dedicated coach with a passion for building champions.",
    beltClass: "belt-black",
    delay:    0,
  },
  {
    monogram: "SA",
    photo:    "/media/Gemini_Generated_Image_y31qzly31qzly31q.png",
    name:     "Coach Sofia Alves",
    title:    "Kids Programme Lead · Brown Belt",
    bio:      "Specialist in children's BJJ education. Trained with GB Brazil, Sofia brings patience, creativity and world-class technique to every kids class.",
    beltClass: "belt-brown",
    delay:    1,
  },
  {
    monogram: "MK",
    photo:    "/media/Gemini_Generated_Image_gjtl19gjtl19gjtl.png",
    name:     "Prof. Marcus King",
    title:    "No-Gi & Competition Coach · Black Belt",
    bio:      "ADCC Submission Wrestling veteran and British champion. Marcus leads our competition team and No-Gi programme with elite-level expertise.",
    beltClass: "belt-black",
    delay:    2,
  },
];

const beltStyles: Record<string, React.CSSProperties> = {
  "belt-black": { background: "#1a1a1a", borderTop: "1px solid #333" },
  "belt-brown": { background: "#6B3A2A" },
  "belt-coral": { background: "linear-gradient(to right, #FF6B35 50%, #1a1a1a 50%)" },
};

export function Instructors() {
  const ref = useScrollAnimation();

  return (
    <section
      id="instructors"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "120px 0", background: "var(--off-white)" }}
    >
      <div className="container">
        <div style={{ marginBottom: "64px" }}>
          <span className="section-label fade-up">Meet The Team</span>
          <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
            World-Class<br />Instructors
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }} className="instructors-grid-responsive">
          {instructors.map((inst) => (
            <div
              key={inst.monogram}
              className={`instructor-card-item fade-up${inst.delay > 0 ? ` delay-${inst.delay}` : ""}`}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--dark-2)",
                transition: "transform 0.4s var(--ease)",
              }}
            >
              {/* Image placeholder */}
              <div style={{
                position: "relative",
                paddingBottom: "110%",
                background: "var(--dark-3)",
                overflow: "hidden",
              }}>
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.9) 100%)",
                  zIndex: 1,
                }} />
                {/* Instructor photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={inst.photo}
                  alt={inst.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
                {/* Belt strip */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  zIndex: 2,
                  ...beltStyles[inst.beltClass],
                }} />
                {/* Hover overlay */}
                <div className="instructor-hover-overlay" style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  background: "rgba(200,16,46,0.1)",
                  opacity: 0,
                  transition: "opacity 0.4s",
                }} />
              </div>

              {/* Info */}
              <div style={{ padding: "24px" }}>
                <div style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 800,
                  fontSize: "26px",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>
                  {inst.name}
                </div>
                <div style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  marginBottom: "12px",
                }}>
                  {inst.title}
                </div>
                <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                  {inst.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .instructor-card-item:hover { transform: translateY(-6px); }
        .instructor-card-item:hover .instructor-hover-overlay { opacity: 1 !important; }
        @media (max-width: 1024px) {
          .instructors-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .instructors-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
