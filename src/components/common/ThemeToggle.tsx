// @/components/common/ThemeToggle.tsx

"use client";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/components/context/ThemeContext";

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "contextual" }) {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={
        variant === "default"
          ? "p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors duration-200"
          : "rounded-md p-2 hover:bg-accent transition-colors relative"
      }
      aria-label="Toggle theme"
    >
      {variant === "default" ? (
        isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )
      ) : (
        <>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </>
      )}
    </button>
  );
}
