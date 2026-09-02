import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-stone)]/50 mt-24 md:mt-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo variant="full" className="mb-5" />
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mt-4">
              A private gemstone house rooted in the mineral heritage of Ceylon.
              Rare stones, considered carefully.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div className="space-y-3">
              <p className="text-[var(--color-muted)] uppercase tracking-wider text-xs mb-4">
                Discover
              </p>
              <Link
                href="/collections"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/journal"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Journal
              </Link>
              <Link
                href="/about"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                About
              </Link>
              <Link
                href="/gem-library"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Gem Library
              </Link>
              <Link
                href="/compare"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Compare
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-[var(--color-muted)] uppercase tracking-wider text-xs mb-4">
                Atelier
              </p>
              <Link
                href="/enquiry"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Private Enquiry
              </Link>
              <Link
                href="/about"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Craftsmanship
              </Link>
              <Link
                href="/about"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Certification
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-[var(--color-muted)] uppercase tracking-wider text-xs mb-4">
                Legal
              </p>
              <Link
                href="/privacy"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="block text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-stone)]/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} Ceylon Gem Atelier. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="tracking-wide">Private gemstone atelier · Ceylon</p>
            <span className="hidden sm:inline text-[var(--color-stone)]">|</span>
            <a
              href="https://ark-ii.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wide hover:text-[var(--color-graphite)] transition-colors"
            >
              ARK II
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
