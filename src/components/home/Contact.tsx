"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "120px 0", background: "var(--white)" }}
    >
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
        }} className="contact-grid-responsive">
          {/* Left: info */}
          <div>
            <span className="section-label fade-up">Find Us</span>
            <h2 className="section-title fade-up delay-1" style={{ fontSize: "clamp(44px, 5vw, 72px)", marginBottom: "32px" }}>
              Let's Talk<br />BJJ
            </h2>

            <div className="fade-up delay-2">
              {[
                { icon: "📍", label: "Address",          body: "Gracie Barra Haringey\nHaringey, London, N4" },
                { icon: "📞", label: "Phone",            body: "+44 (0)20 1234 5678" },
                { icon: "✉️", label: "Email",            body: "info@gbharingey.com" },
                { icon: "🕐", label: "Reception Hours",  body: "Mon–Fri: 9:00am – 9:00pm\nSat–Sun: 9:00am – 1:00pm" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    minWidth: "44px",
                    background: "rgba(200,16,46,0.1)",
                    border: "1px solid rgba(200,16,46,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      marginBottom: "4px",
                    }}>
                      {item.label}
                    </h4>
                    <p style={{
                      fontSize: "15px",
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="fade-up delay-3" style={{
              background: "var(--dark-2)",
              aspectRatio: "4/3",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.1)",
              marginTop: "32px",
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9923.13!2d-0.1!3d51.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDM0JzEyLjAiTiAwwrAwNicwMC4wIlc!5e0!3m2!1sen!2suk!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GB Haringey Location"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  filter: "grayscale(100%) invert(90%) contrast(85%)",
                  opacity: 0.7,
                }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                padding: "24px 20px 16px",
              }}>
                <div style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "uppercase",
                  color: "var(--white)",
                }}>
                  Gracie Barra <span style={{ color: "var(--red)" }}>Haringey</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="fade-right delay-1">
            <h3 style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "32px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}>
              Book Your Free Trial
            </h3>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🥋</div>
                <h3 style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "28px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  color: "var(--red)",
                }}>
                  OSS! You're In
                </h3>
                <p style={{ color: "rgba(0,0,0,0.65)", fontSize: "15px", lineHeight: 1.6 }}>
                  We'll be in touch within 24 hours to arrange your free trial class. Get ready to train!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div><input type="text" placeholder="First Name" required /></div>
                  <div><input type="text" placeholder="Last Name"  required /></div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <select defaultValue="">
                    <option value="" disabled>I&apos;m interested in...</option>
                    <option>Adults BJJ (Fundamentals)</option>
                    <option>Adults BJJ (Advanced)</option>
                    <option>No-Gi / Grappling</option>
                    <option>Kids BJJ (4–6)</option>
                    <option>Kids BJJ (7–12)</option>
                    <option>Teens BJJ (13–15)</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <textarea placeholder="Any questions or special requirements? (optional)" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "18px", marginTop: "8px" }}>
                  <span>Send My Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
