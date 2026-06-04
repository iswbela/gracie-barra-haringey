import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      background: "var(--off-white)",
      borderTop: "1px solid rgba(0,0,0,0.08)",
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/gb-logo.png" alt="Gracie Barra logo" style={{ width: "38px", height: "38px", objectFit: "contain", display: "block" }} />
              Gracie Barra Haringey
            </div>
            <p style={{
              fontSize: "14px",
              color: "rgba(0,0,0,0.5)",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
              Part of the world's largest BJJ organisation — bringing world-class Brazilian Jiu-Jitsu to the heart of North London since 2014.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "Instagram", faClass: "fa-brands fa-instagram" },
                { label: "X",         faClass: "fa-brands fa-x-twitter" },
                { label: "YouTube",   faClass: "fa-brands fa-youtube" },
                { label: "Facebook",  faClass: "fa-brands fa-facebook-f" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="social-link-item"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: "rgba(0,0,0,0.55)",
                    transition: "all 0.3s",
                    textDecoration: "none",
                  }}
                >
                  <i className={s.faClass} />
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
                    color: "rgba(0,0,0,0.55)",
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
                    color: "rgba(0,0,0,0.55)",
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
                      color: "rgba(0,0,0,0.55)",
                      transition: "color 0.3s",
                      textDecoration: "none",
                    }}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="footer-link-item" style={{
                      fontSize: "14px",
                      color: "rgba(0,0,0,0.55)",
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
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.45)" }}>
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
            color: "rgba(0,0,0,0.45)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/gb-logo.png" alt="Gracie Barra logo" style={{ width: "28px", height: "28px", objectFit: "contain", display: "block" }} />
            Official Gracie Barra Affiliate
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-item:hover { color: var(--black) !important; }
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
