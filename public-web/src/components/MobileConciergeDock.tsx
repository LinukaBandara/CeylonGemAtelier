"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function MobileConciergeDock() {
  const pathname = usePathname();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cga_wishlist");
      if (stored) {
        setWishlistCount(JSON.parse(stored).length);
      }
    } catch {
      // ignore
    }
  }, [pathname]);

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="glass-pill px-4 py-2.5 rounded-full flex items-center justify-between shadow-2xl">
        <Link
          href="/collections"
          className="flex flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-[var(--color-graphite)]"
        >
          <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Shop</span>
        </Link>

        <Link
          href="/compare"
          className="flex flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-[var(--color-graphite)]"
        >
          <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Compare</span>
        </Link>

        {/* Central VIP action button */}
        <Link
          href="/enquiry"
          className="relative -top-3.5 bg-gradient-to-tr from-[var(--color-gold-dark)] to-[var(--color-gold)] text-white p-3 rounded-full shadow-lg border-2 border-[var(--background)] active:scale-95 transition-transform"
          aria-label="Private Concierge"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Link>

        <a
          href="https://wa.me/?text=Hello%20Ceylon%20Gem%20Atelier%2C%20I%20am%20inquiring%20about%20a%20private%20specimen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-[var(--color-graphite)]"
        >
          <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        <Link
          href="/about"
          className="flex flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-[var(--color-graphite)]"
        >
          <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>About</span>
        </Link>
      </div>
    </div>
  );
}
