"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function About() {
  const ref = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "120px 0",
        background: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div style={{
        position: "absolute",
        right: "-40px",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "var(--font-head)",
        fontWeight: 900,
        fontSize: "320px",
        lineHeight: 1,
        color: "rgba(255,255,255,0.015)",
        pointerEvents: "none",
        userSelect: "none",
      }}>BJJ</div>

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }} className="about-grid-responsive">
          {/* Media side */}
          <div className="fade-left" style={{ position: "relative", paddingBottom: "40px" }}>
            <div style={{
              position: "relative",
              paddingBottom: "120%",
              background: "var(--dark-2)",
              overflow: "hidden",
            }}>
              {/* Background photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/WhatsApp-Image-2025-01-29-at-14.25.09.jpeg"
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {/* Overlay patterns */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 35%, transparent 60%),
                  linear-gradient(135deg, rgba(200,16,46,0.18) 0%, transparent 50%),
                  repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(200,16,46,0.04) 8px, rgba(200,16,46,0.04) 9px)
                `,
                zIndex: 1,
              }} />
              {/* Quote overlay */}
              <div style={{
                position: "absolute",
                top: "28px",
                left: "28px",
                right: "28px",
                zIndex: 2,
              }}>
                <p style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 800,
                  fontSize: "20px",
                  textTransform: "uppercase",
                  lineHeight: 1.25,
                  color: "var(--white)",
                  borderLeft: "3px solid var(--red)",
                  paddingLeft: "16px",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}>
                  &ldquo;Jiu-Jitsu is for everyone. The mat is a great equaliser.&rdquo;
                </p>
              </div>
            </div>

            {/* Year badge */}
            <div style={{
              position: "absolute",
              bottom: "-28px",
              left: "28px",
              background: "var(--dark-3)",
              border: "1px solid rgba(200,16,46,0.35)",
              padding: "18px 28px",
              zIndex: 3,
            }}>
              <div style={{
                fontFamily: "var(--font-head)",
                fontWeight: 900,
                fontSize: "42px",
                color: "var(--red)",
                lineHeight: 1,
              }}>
                2014
              </div>
              <div style={{
                fontFamily: "var(--font-head)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--grey)",
              }}>
                Founded in Haringey
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="fade-up">
              <span className="section-label">Our Story</span>
              <h2 className="section-title" style={{ fontSize: "clamp(48px, 6vw, 80px)", marginBottom: "24px" }}>
                More Than<br />A Gym.<br />A Family.
              </h2>
            </div>
            <p className="fade-up delay-1" style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
            }}>
              Gracie Barra Haringey is part of the world's largest Brazilian Jiu-Jitsu organisation — founded by Master Carlos Gracie Jr. We bring that global standard of excellence to North London, creating a safe, welcoming environment where everyone from complete beginners to seasoned competitors can grow.
            </p>
            <p className="fade-up delay-2" style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
            }}>
              Our academy runs structured programmes for all ages and levels. Whether you're looking for fitness, self-defence, competition or simply a challenge — this is your place.
            </p>

            {/* Pillars */}
            <div className="fade-up delay-3" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              margin: "36px 0",
            }}>
              {[
                { icon: "🥋", title: "World-Class BJJ",     body: "Gracie Barra certified curriculum from white to black belt." },
                { icon: "🌍", title: "Global Community",    body: "Train with a worldwide network of GB schools and members." },
                { icon: "👶", title: "Kids & Adults",       body: "Dedicated programmes for every age from 4 to 60+." },
                { icon: "🏆", title: "Competition Ready",   body: "Compete locally, nationally and internationally with GB support." },
              ].map((p) => (
                <div
                  key={p.title}
                  className="pillar-item"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.3s",
                  }}
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    background: "rgba(200,16,46,0.1)",
                    border: "1px solid rgba(200,16,46,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: "var(--font-head)",
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}>
                      {p.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--grey)", lineHeight: 1.5 }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-up delay-4">
              <Link href="/#programmes" className="btn btn-primary">
                <span>See Our Programmes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pillar-item:hover { border-color: rgba(200,16,46,0.4) !important; }
        @media (max-width: 1024px) {
          .about-grid-responsive { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
