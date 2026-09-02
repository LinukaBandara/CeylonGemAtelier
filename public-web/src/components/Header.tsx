"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquiry", label: "Enquire" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/enquiry") return pathname.startsWith("/enquiry");
    if (href === "/journal") return pathname.startsWith("/journal");
    if (href === "/collections") return pathname.startsWith("/collections");
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-ivory)]/98 backdrop-blur-sm border-b border-[var(--color-stone)]/30 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
        <Logo variant="wordmark" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest transition-all duration-300 relative pb-1 ${
                  active
                    ? "text-[var(--color-graphite)] font-medium"
                    : "text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                } ${active ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--color-graphite)]" : "hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-px hover:after:bg-[var(--color-graphite)] hover:after:transition-opacity hover:after:duration-300"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-0.5 border-l border-[var(--color-stone)]/20 pl-8 ml-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`block h-[1.5px] w-full bg-[var(--color-graphite)] transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-[var(--color-graphite)] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-[var(--color-graphite)] transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Full-screen Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-[var(--color-ivory)] transition-opacity duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-12 px-8 pb-32">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-serif text-2xl transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-[var(--color-graphite)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-6 border-t border-[var(--color-stone)]/20 pt-10 mt-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
