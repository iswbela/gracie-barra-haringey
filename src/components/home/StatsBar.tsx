"use client";

import { useEffect, useRef } from "react";

const stats = [
  { target: 200, suffix: "+", label: "Active Members" },
  { target: 10,  suffix: "+", label: "Years Training" },
  { target: 5,   suffix: "",  label: "Expert Instructors" },
  { target: 7,   suffix: "x", label: "Classes Per Week" },
];

export function StatsBar() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const countEls = el.querySelectorAll<HTMLElement>(".count-num");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const span = entry.target as HTMLElement;
          const target = parseInt(span.dataset.target ?? "0", 10);
          const duration = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            span.textContent = String(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(span);

          // fade-up visible
          span.closest(".stat-item")?.classList.add("visible");
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach((el) => observer.observe(el));

    // Also wire up fade-up observer
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    el.querySelectorAll(".fade-up").forEach((el) => fadeObserver.observe(el));

    return () => { observer.disconnect(); fadeObserver.disconnect(); };
  }, []);

  return (
    <section
      id="stats"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ background: "var(--red)", padding: 0, position: "relative", zIndex: 1 }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }} className="stats-inner-grid">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-item fade-up${i > 0 ? ` delay-${i}` : ""}`}
            style={{
              padding: "36px 24px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
              transition: "background 0.3s",
            }}
          >
            <div style={{
              fontFamily: "var(--font-head)",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1,
              color: "var(--white)",
            }}>
              <span
                className="count-num"
                data-target={stat.target}
              >
                0
              </span>
              <span style={{ fontSize: "0.6em" }}>{stat.suffix}</span>
            </div>
            <div style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginTop: "6px",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-inner-grid .stat-item:hover { background: rgba(0,0,0,0.15); }
        @media (max-width: 1024px) {
          .stats-inner-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-inner-grid .stat-item:nth-child(2) { border-right: none; }
          .stats-inner-grid .stat-item:nth-child(3),
          .stats-inner-grid .stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.15); }
        }
        @media (max-width: 480px) {
          .stats-inner-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
