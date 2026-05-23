"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useUiStore((s) => s.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}
