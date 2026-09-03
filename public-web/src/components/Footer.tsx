import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-stone)]/40 mt-24 md:mt-36 bg-[var(--color-parchment)]/40 relative overflow-hidden">
      {/* Decorative gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      {/* Subtle background gem facet watermark */}
      <div className="absolute right-[-80px] top-[-60px] w-[340px] h-[340px] opacity-[0.025] pointer-events-none" style={{
        background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Provenance */}
          <div className="lg:col-span-5 space-y-6">
            <Logo variant="full" />
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-sm font-sans">
              Natural certified gemstones sourced directly from Sri Lanka's Ratnapura and Colombo mines. Untreated, lab-verified, and available to buy worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {["Ratnapura", "Colombo", "Balangoda"].map((loc) => (
                <span key={loc} className="text-[10px] tracking-[0.22em] uppercase font-mono px-2.5 py-1 border border-[var(--color-gold)]/35 text-[var(--color-gold)]">
                  {loc}
                </span>
              ))}
            </div>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/?text=Hello%20Ceylon%20Gem%20Atelier%2C%20I%20want%20to%20enquire%20about%20a%20gemstone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 border border-[#25D366]/50 text-[#25D366] text-[11px] font-mono uppercase tracking-widest hover:bg-[#25D366]/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4">
              <p className="text-[var(--color-gold)] uppercase tracking-[0.25em] text-[11px] font-mono font-medium">
                Shop
              </p>
              <ul className="space-y-2.5 text-xs tracking-wider uppercase">
                <li>
                  <Link href="/collections/ceylon-sapphires" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Blue Sapphires
                  </Link>
                </li>
                <li>
                  <Link href="/collections/padparadscha" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Padparadscha
                  </Link>
                </li>
                <li>
                  <Link href="/collections/ceylon-geuda" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Ceylon Geuda
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Compare Stones
                  </Link>
                </li>
                <li>
                  <Link href="/gem-library" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Gem Library
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[var(--color-gold)] uppercase tracking-[0.25em] text-[11px] font-mono font-medium">
                Company
              </p>
              <ul className="space-y-2.5 text-xs tracking-wider uppercase">
                <li>
                  <Link href="/about" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/enquiry" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Contact & Buy
                  </Link>
                </li>
                <li>
                  <Link href="/about#sourcing" className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors">
                    Sourcing Ethics
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 sm:col-span-1">
              <p className="text-[var(--color-gold)] uppercase tracking-[0.25em] text-[11px] font-mono font-medium">
                Contact
              </p>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Private viewings by appointment in Colombo & Ratnapura. We ship worldwide with full certification.
              </p>
              <Link
                href="/enquiry"
                className="inline-block mt-2 text-xs tracking-wider uppercase text-[var(--color-graphite)] border-b border-[var(--color-gold)] pb-1 hover:text-[var(--color-gold)] transition-colors"
              >
                Make an Enquiry →
              </Link>
            </div>
          </div>
        </div>

        {/* Gold divider ornament */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-stone)]/50 to-[var(--color-stone)]/50" />
          <div className="w-2 h-2 rotate-45 border border-[var(--color-gold)]/60 flex-shrink-0" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[var(--color-stone)]/50 to-[var(--color-stone)]/50" />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[var(--color-muted)] pb-14 md:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="font-mono text-[11px]">
              © {new Date().getFullYear()} Ceylon Gem Atelier. All rights reserved.
            </p>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <Link href="/privacy" className="hover:text-[var(--color-graphite)] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[var(--color-graphite)] transition-colors">
                Terms
              </Link>
              <span className="text-[var(--color-stone)]">|</span>
              <span className="text-[var(--color-gold)] font-medium">Ratnapura · Colombo</span>
            </div>
          </div>

          {/* ARK II Credit */}
          <a
            href="https://ark-ii.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors group"
            aria-label="Website designed by ARK II — Web Design & Digital Studio in Sri Lanka"
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">Designed by</span>
            <span className="font-bold tracking-[0.2em] border-b border-[var(--color-gold)]/40 group-hover:border-[var(--color-gold)] transition-colors pb-px">ARK II</span>
            <svg className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

