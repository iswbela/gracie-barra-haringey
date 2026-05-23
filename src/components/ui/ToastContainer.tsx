"use client";

import { useToastStore } from "@/store/toastStore";

const borderColors: Record<string, string> = {
  success: "rgba(76,175,80,0.5)",
  error:   "rgba(200,16,46,0.5)",
  info:    "rgba(100,200,255,0.5)",
  warning: "rgba(255,180,0,0.5)",
};

const icons: Record<string, string> = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
  warning: "⚠",
};

const iconColors: Record<string, string> = {
  success: "#4caf50",
  error:   "var(--red)",
  info:    "#64C8FF",
  warning: "#FFB400",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      pointerEvents: "none",
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 18px",
            background: "var(--dark-2)",
            border: `1px solid ${borderColors[toast.type]}`,
            borderLeft: `4px solid ${iconColors[toast.type]}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            minWidth: "280px",
            maxWidth: "380px",
          }}
        >
          <span style={{
            fontSize: "18px",
            color: iconColors[toast.type],
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {icons[toast.type]}
          </span>
          <p style={{
            flex: 1,
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.4,
          }}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
              padding: "2px 4px",
              flexShrink: 0,
            }}
            className="toast-close-btn"
          >
            ×
          </button>
        </div>
      ))}
      <style>{`.toast-close-btn:hover { color: var(--white) !important; }`}</style>
    </div>
  );
}
