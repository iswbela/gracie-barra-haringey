"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const weekdayRows = [
  { time: "10:00", mon: "Adults BJJ",   tue: "—",       wed: "Adults BJJ",   thu: "—",       fri: "Adults BJJ" },
  { time: "12:00", mon: "—",            tue: "No-Gi",   wed: "—",            thu: "No-Gi",   fri: "—" },
  { time: "17:00", mon: "Kids BJJ",     tue: "Kids BJJ",wed: "Kids BJJ",     thu: "Kids BJJ",fri: "Kids BJJ" },
  { time: "18:30", mon: "Fundamentals", tue: "Adults BJJ", wed: "Fundamentals", thu: "Adults BJJ", fri: "No-Gi" },
  { time: "20:00", mon: "Advanced",     tue: "Open Mat", wed: "Adults BJJ",   thu: "Advanced", fri: "—" },
];

const weekendRows = [
  { time: "09:00", sat: "Kids BJJ", sun: "—" },
  { time: "10:00", sat: "Adults BJJ", sun: "Open Mat" },
  { time: "11:30", sat: "No-Gi", sun: "—" },
];

function Badge({ label }: { label: string }) {
  if (label === "—") return <span style={{ color: "rgba(0,0,0,0.3)" }}>—</span>;
  const isKids  = label.includes("Kids");
  const isNoGi  = label.includes("No-Gi");
  return (
    <span className={`class-badge${isKids ? " kids" : isNoGi ? " no-gi" : ""}`}>
      {label}
    </span>
  );
}

export function Schedule() {
  const [activeTab, setActiveTab] = useState<"weekday" | "weekend">("weekday");
  const ref = useScrollAnimation();

  return (
    <section
      id="schedule"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "120px 0",
        background: "var(--white)",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, transparent, rgba(200,16,46,0.03) 50%, transparent)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
          }} className="schedule-header-flex">
            <div>
              <span className="section-label fade-up">Class Timetable</span>
              <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
                When<br />We Train
              </h2>
            </div>
            <p className="fade-right" style={{
              fontSize: "14px",
              color: "rgba(0,0,0,0.5)",
              maxWidth: "320px",
              textAlign: "right",
              lineHeight: 1.6,
            }}>
              All times are UK local time. Drop-ins welcome — just bring a gi if you have one!
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="fade-up" style={{ display: "flex", gap: "2px", marginBottom: "32px" }}>
          {(["weekday", "weekend"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 24px",
                background: activeTab === tab ? "var(--red)" : "var(--dark-2)",
                color: activeTab === tab ? "var(--white)" : "rgba(0,0,0,0.55)",
                transition: "all 0.3s",
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab === "weekday" ? "Mon – Fri" : "Weekend"}
            </button>
          ))}
        </div>

        {/* Weekday table */}
        {activeTab === "weekday" && (
          <div className="schedule-table-scroll">
            <table className="fade-up" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{
                  background: "rgba(200,16,46,0.1)",
                  borderBottom: "1px solid rgba(200,16,46,0.3)",
                }}>
                  {["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((h) => (
                    <th key={h} style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      padding: "14px 20px",
                      textAlign: "left",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekdayRows.map((row) => (
                  <tr key={row.time} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                      className="schedule-row">
                    <td style={{ padding: "16px 20px", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "16px", color: "var(--black)" }}>{row.time}</td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.mon} /></td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.tue} /></td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.wed} /></td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.thu} /></td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.fri} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Weekend table */}
        {activeTab === "weekend" && (
          <div className="schedule-table-scroll">
            <table className="fade-up visible" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{
                  background: "rgba(200,16,46,0.1)",
                  borderBottom: "1px solid rgba(200,16,46,0.3)",
                }}>
                  {["Time", "Saturday", "Sunday"].map((h) => (
                    <th key={h} style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      padding: "14px 20px",
                      textAlign: "left",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekendRows.map((row) => (
                  <tr key={row.time} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                      className="schedule-row">
                    <td style={{ padding: "16px 20px", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "16px", color: "var(--black)" }}>{row.time}</td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.sat} /></td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}><Badge label={row.sun} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA strip */}
        <div className="fade-up" style={{
          marginTop: "40px",
          padding: "32px",
          background: "var(--dark-2)",
          border: "1px solid rgba(200,16,46,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          <p style={{
            fontFamily: "var(--font-head)",
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "uppercase",
          }}>
            Can't make a class?{" "}
            <span style={{ color: "var(--red)" }}>Get in touch</span>{" "}
            — we'll find a time that works for you.
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

      <style>{`
        .schedule-row:hover { background: rgba(0,0,0,0.04); }
        @media (max-width: 768px) {
          .schedule-header-flex { flex-direction: column !important; align-items: flex-start !important; }
          table { font-size: 13px; }
          table th, table td { padding: 10px 12px !important; }
        }
      `}</style>
    </section>
  );
}
