import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) root.classList.add("dark");
      else root.classList.remove("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // ignore in SSR or if localStorage is unavailable
    }
  }, [isDark]);

  const toggle = () => setIsDark((v) => !v);
  const setDark = (v: boolean) => setIsDark(v);

  return { isDark, toggle, setDark };
}

export default useTheme;
