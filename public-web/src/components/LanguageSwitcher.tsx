"use client";

import { useEffect, useState } from "react";
import { languages } from "@/data/testimonials";

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cga-language") || "en";
    setCurrentLanguage(saved);
    setIsLoaded(true);
  }, []);

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    setShowDropdown(false);
    // Store preference
    localStorage.setItem("cga-language", code);
    // In a real implementation, you would change the UI language here
  };

  if (!isLoaded) return null;

  const current = languages.find((l) => l.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-2.5 py-2 text-[var(--color-muted)] hover:text-[var(--color-graphite)] hover:bg-[var(--color-parchment)]/50 transition-all duration-300 text-xs uppercase tracking-widest font-medium rounded-sm group"
        aria-label="Change language"
        aria-expanded={showDropdown}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{current?.code.toUpperCase()}</span>
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-2 right-0 bg-[var(--color-ivory)] border border-[var(--color-stone)]/20 rounded-sm shadow-lg z-50 min-w-[180px] overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors duration-200 ${
                currentLanguage === lang.code
                  ? "bg-[var(--color-parchment)] text-[var(--color-graphite)] font-medium border-l-2 border-[var(--color-graphite)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-graphite)] hover:bg-[var(--color-parchment)]/40"
              }`}
            >
              <div className="font-medium">{lang.nativeName}</div>
              <div className="text-[10px] opacity-70">{lang.code.toUpperCase()}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
