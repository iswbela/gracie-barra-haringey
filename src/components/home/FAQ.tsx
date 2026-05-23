"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    q: "Do I need experience to start?",
    a: "Absolutely not. We welcome complete beginners every week. Our Fundamentals programme is specifically designed for new students, so you'll never feel out of depth. Every black belt started as a white belt with zero experience.",
  },
  {
    q: "What do I wear to my first class?",
    a: "For your trial class, comfortable athletic wear is fine — shorts and a t-shirt work great. If you decide to join, you'll need a gi (Brazilian Jiu-Jitsu uniform), which you can purchase from us or online. We can loan one for your first visit if needed.",
  },
  {
    q: "How much does membership cost?",
    a: "We offer flexible monthly memberships with unlimited classes. Prices start from £80/month for adults, with discounts for students, families and annual payments. Your first trial class is completely free with no obligation.",
  },
  {
    q: "Is BJJ safe for kids?",
    a: "Yes — Brazilian Jiu-Jitsu is one of the safest martial arts for children. Our GB Kids curriculum emphasises controlled technique over strength, with no striking. All coaches hold enhanced DBS checks and first-aid certificates. Safety is our top priority.",
  },
  {
    q: "Can I train if I'm not fit?",
    a: "100%. BJJ is famous for being accessible regardless of fitness level — the technique is everything. Fitness will improve naturally as you train. Many members say BJJ is the best exercise programme they've ever followed, simply because it doesn't feel like exercise.",
  },
  {
    q: "Where are you located?",
    a: "We're based in Haringey, North London, with easy access from Finsbury Park, Manor House and Turnpike Lane stations. Full address and directions are in our Contact section below. Free parking is available on evenings and weekends.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollAnimation();

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "120px 0", background: "var(--dark)" }}
    >
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "80px",
          alignItems: "start",
        }} className="faq-grid-responsive">
          {/* Sidebar */}
          <div style={{ position: "sticky", top: "100px" }}>
            <span className="section-label fade-left">FAQ</span>
            <h2 className="section-title fade-left delay-1" style={{ fontSize: "clamp(44px, 5vw, 72px)", marginBottom: "24px" }}>
              Got<br />Questions?
            </h2>
            <p className="fade-left delay-2" style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}>
              Everything you need to know before you walk through the door. If you don't find your answer here, give us a call.
            </p>
            <div className="fade-left delay-3">
              <Link href="/#contact" className="btn btn-primary">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* FAQ list */}
          <div className="fade-up">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "24px 0",
                    textAlign: "left",
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: "20px",
                    textTransform: "uppercase",
                    color: openIndex === i ? "var(--red)" : "var(--white)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    transition: "color 0.3s",
                  }}
                >
                  {faq.q}
                  <span style={{
                    width: "28px",
                    height: "28px",
                    minWidth: "28px",
                    border: `1px solid ${openIndex === i ? "var(--red)" : "rgba(255,255,255,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: openIndex === i ? "var(--red)" : "var(--grey)",
                    transition: "transform 0.3s, border-color 0.3s, color 0.3s",
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                  }}>
                    +
                  </span>
                </button>
                <div style={{
                  maxHeight: openIndex === i ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s var(--ease)",
                }}>
                  <p style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    paddingBottom: "24px",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid-responsive { grid-template-columns: 1fr !important; }
          .faq-grid-responsive > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
