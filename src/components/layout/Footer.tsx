import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      background: "var(--dark)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "80px 0 0",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "60px",
        }} className="footer-grid-responsive">

          {/* Brand */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "18px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              <div style={{
                width: "38px",
                height: "38px",
                background: "var(--red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                color: "var(--white)",
              }}>
                GB
              </div>
              Gracie Barra Haringey
            </div>
            <p style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
              Part of the world's largest BJJ organisation — bringing world-class Brazilian Jiu-Jitsu to the heart of North London since 2014.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "Instagram", icon: "📸" },
                { label: "Facebook",  icon: "👍" },
                { label: "YouTube",   icon: "▶️" },
                { label: "WhatsApp",  icon: "💬" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="social-link-item"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    transition: "all 0.3s",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: "20px",
            }}>
              Programmes
            </h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "Adults BJJ",       href: "/#programmes" },
                { label: "Kids BJJ",          href: "/#programmes" },
                { label: "No-Gi / Grappling", href: "/#programmes" },
                { label: "View Timetable",    href: "/#schedule" },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: "10px" }}>
                  <Link href={item.href} className="footer-link-item" style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    transition: "color 0.3s",
                    textDecoration: "none",
                  }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: "20px",
            }}>
              Academy
            </h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "About Us",    href: "/#about" },
                { label: "Instructors", href: "/#instructors" },
                { label: "Reviews",     href: "/#testimonials" },
                { label: "FAQ",         href: "/#faq" },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: "10px" }}>
                  <Link href={item.href} className="footer-link-item" style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    transition: "color 0.3s",
                    textDecoration: "none",
                  }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: "20px",
            }}>
              Get Started
            </h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "Free Trial Class",     href: "/#cta",                   external: false },
                { label: "Contact Us",           href: "/#contact",               external: false },
                { label: "+44 20 1234 5678",     href: "tel:+442012345678",       external: true  },
                { label: "info@gbharingey.com",  href: "mailto:info@gbharingey.com", external: true },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: "10px" }}>
                  {item.external ? (
                    <a href={item.href} className="footer-link-item" style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.45)",
                      transition: "color 0.3s",
                      textDecoration: "none",
                    }}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="footer-link-item" style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.45)",
                      transition: "color 0.3s",
                      textDecoration: "none",
                    }}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            © 2024 Gracie Barra Haringey. All rights reserved. |{" "}
            <a href="#" style={{ color: "var(--red)" }}>Privacy Policy</a>
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-head)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}>
            <div style={{
              width: "28px",
              height: "28px",
              background: "var(--red)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 900,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              color: "var(--white)",
            }}>
              GB
            </div>
            Official Gracie Barra Affiliate
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-item:hover { color: var(--white) !important; }
        .social-link-item:hover { background: var(--red) !important; border-color: var(--red) !important; }
        @media (max-width: 1024px) {
          .footer-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
