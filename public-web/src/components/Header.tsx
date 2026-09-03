"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { href: "/collections", label: "Gemstones" },
  { href: "/compare", label: "Compare" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About Us" },
  { href: "/enquiry", label: "Contact & Buy", highlight: true },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/enquiry") return pathname.startsWith("/enquiry");
    if (href === "/journal") return pathname.startsWith("/journal");
    if (href === "/collections") return pathname.startsWith("/collections");
    if (href === "/compare") return pathname.startsWith("/compare");
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--color-gold)]/30 shadow-md"
          : "py-4 md:py-5 bg-[var(--background)]/75 backdrop-blur-md border-b border-[var(--color-stone)]/30"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between">
        <Logo variant="full" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-5 py-2 overflow-hidden border border-[var(--color-gold)] text-[11px] uppercase tracking-[0.25em] font-medium text-[var(--color-graphite)] transition-all duration-400 hover:bg-[var(--color-gold)] hover:text-white"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold-light)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.22em] transition-all duration-300 relative py-1 flex items-center gap-1.5 ${
                  active
                    ? "text-[var(--color-graphite)] font-semibold"
                    : "text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-gold)] animate-fade-rise" />
                )}
              </Link>
            );
          })}

          <div className="flex items-center gap-1 border-l border-[var(--color-stone)]/50 pl-6 ml-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu & Quick Concierge */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/enquiry"
            className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-[var(--color-gold)] text-[var(--color-gold)]"
          >
            VIP
          </Link>
          <button
            className="p-2 -mr-1 text-[var(--color-graphite)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[9px] bg-[var(--color-gold)]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[9px] bg-[var(--color-gold)]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Haute Curtain */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-[var(--background)]/98 backdrop-blur-2xl transition-all duration-500 overflow-y-auto ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav className="flex flex-col items-center justify-center min-h-[75vh] gap-8 px-8 py-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-mono">
            Ceylon Gem Atelier · Navigation
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-2xl tracking-[0.1em] transition-colors duration-300 uppercase ${
                isActive(link.href)
                  ? "text-[var(--color-gold)] font-medium"
                  : "text-[var(--color-graphite)] hover:text-[var(--color-gold)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="w-16 h-px bg-[var(--color-stone)] my-2" />

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <p className="font-serif italic text-xs text-[var(--color-muted)] text-center mt-6 max-w-xs">
            &quot;Rare stones. Considered carefully. Direct provenance from Ratnapura to the world.&quot;
          </p>
        </nav>
      </div>
    </header>
  );
}
