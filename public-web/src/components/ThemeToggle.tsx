"use client";

import { useTheme } from "@/lib/hooks";

export function ThemeToggle() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) return null;

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-all duration-300 hover:bg-[var(--color-parchment)]/50 rounded-sm group"
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-label="Toggle theme"
    >
      {isLight ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3a8.8 8.8 0 1 0 9.8 9.8Z" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-500 group-hover:rotate-45"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
