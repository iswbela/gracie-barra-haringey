import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
      background: "var(--white)",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "var(--font-head)",
        fontWeight: 900,
        fontSize: "clamp(120px, 20vw, 200px)",
        lineHeight: 1,
        color: "rgba(200,16,46,0.08)",
        userSelect: "none",
        marginBottom: "0",
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: "var(--font-head)",
        fontWeight: 900,
        fontSize: "clamp(40px, 6vw, 72px)",
        textTransform: "uppercase",
        color: "var(--black)",
        lineHeight: 0.95,
        marginBottom: "16px",
        marginTop: "-20px",
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: "15px",
        color: "rgba(0,0,0,0.55)",
        marginBottom: "40px",
        maxWidth: "380px",
        lineHeight: 1.6,
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        <span>← Back to Home</span>
      </Link>
    </div>
  );
}
