"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Gem } from "@/data/gems";
import { gemList as staticGems } from "@/data/gems";
import { SearchFilter } from "@/components/SearchFilter";
import { WishlistButton } from "@/components/WishlistButton";
import { CompareGems } from "@/components/CompareGems";
import { fetchAllGems } from "@/lib/catalog";

interface GemListingsProps {
  collection?: string;
  title?: string;
}

export function GemListings({ collection, title }: GemListingsProps) {
  const [allGems, setAllGems] = useState<Gem[]>([]);
  const [results, setResults] = useState<Gem[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGems = async () => {
      try {
        setIsLoading(true);
        const gems = await fetchAllGems();
        setAllGems(gems);
        setResults(collection ? gems.filter((g) => g.collection === collection) : gems);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load gems";
        console.error("Error loading gems:", errorMessage);
        const fallback = collection
          ? staticGems.filter((g) => g.collection === collection)
          : staticGems;
        setAllGems(staticGems);
        setResults(fallback);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadGems();
  }, [collection]);

  const availableGems =
    collection ? allGems.filter((g) => g.collection === collection) : allGems;

  return (
    <div>
      {title && (
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Atelier Vault Chamber
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-[var(--color-graphite)] mt-1">
            {title}
          </h1>
        </div>
      )}

      {error && (
        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-sm">
          <p className="text-red-700 dark:text-red-400 font-medium mb-2">Notice: Switched to Local Offline Vault</p>
          <p className="text-xs font-mono text-red-600 dark:text-red-300">{error}</p>
        </div>
      )}

      {isLoading && !error && (
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glass-panel border border-[var(--color-stone)]/40 p-4 animate-pulse space-y-4"
              >
                <div className="aspect-[4/5] bg-[var(--color-parchment)]" />
                <div className="h-4 bg-[var(--color-stone)]/50 w-2/3" />
                <div className="h-3 bg-[var(--color-stone)]/30 w-1/2" />
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-xs text-[var(--color-muted)] mt-8">
            Decentralizing vault inventory...
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <SearchFilter gems={availableGems} onResults={setResults} />

          {/* Compare Toolbar Trigger */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-stone)]/40">
            <span className="font-mono text-xs text-[var(--color-muted)]">
              Showing <strong className="text-[var(--color-graphite)]">{results.length}</strong> of {availableGems.length} registered specimens
            </span>
            <button
              onClick={() => setShowCompare(!showCompare)}
              className="font-mono text-xs uppercase tracking-wider text-[var(--color-gold)] hover:text-[var(--color-graphite)] flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{showCompare ? "Hide Specimen Comparison" : "Open Specimen Comparison"}</span>
            </button>
          </div>

          {showCompare && (
            <div className="mb-12 border border-[var(--color-gold)]/40 p-6 glass-panel rounded-sm animate-fade-rise">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg text-[var(--color-graphite)]">
                  Haute Joaillerie Specimen Comparison
                </h3>
                <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase">Side-by-side analysis</span>
              </div>
              <CompareGems availableGems={availableGems} />
            </div>
          )}

          {/* Luxury Gem Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {results.map((gem) => {
              const mainImg = gem.images?.[0] || "/images/home/hero-sapphire.jpg";

              return (
                <div
                  key={gem.slug}
                  className="group block glass-panel border border-[var(--color-stone)]/50 hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 relative overflow-hidden"
                >
                  <div className="aspect-[4/5] relative bg-[#F5F0E8] overflow-hidden shimmer-effect">
                    <Image
                      src={mainImg}
                      alt={gem.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />

                    {/* Specimen Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-black/60 backdrop-blur-md text-[var(--color-gold-light)] border border-[var(--color-gold)]/30">
                        {gem.specimen}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <WishlistButton slug={gem.slug} variant="icon" />
                    </div>

                    {/* Subtle bottom badge for unheated status */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-[var(--background)]/80 backdrop-blur-sm text-emerald-700 dark:text-emerald-300">
                        {gem.treatment}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg text-[var(--color-graphite)] group-hover:text-[var(--color-gold)] transition-colors">
                        {gem.name}
                      </h3>
                      {gem.price && (
                        <span className="font-mono text-sm font-semibold text-[var(--color-graphite)]">
                          {gem.price}
                        </span>
                      )}
                    </div>

                    <dl className="grid grid-cols-2 gap-y-1.5 gap-x-2 font-mono text-[11px] text-[var(--color-muted)] border-t border-[var(--color-stone)]/40 pt-3">
                      <div>
                        <dt className="text-[9px] uppercase text-[var(--color-stone)]">Weight</dt>
                        <dd className="font-semibold text-[var(--color-graphite)]">{gem.carat}</dd>
                      </div>
                      <div>
                        <dt className="text-[9px] uppercase text-[var(--color-stone)]">Cut</dt>
                        <dd className="text-[var(--color-graphite)]">{gem.cut}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[9px] uppercase text-[var(--color-stone)]">Color Hue</dt>
                        <dd className="text-[var(--color-graphite)]">{gem.colour}</dd>
                      </div>
                    </dl>

                    <div className="pt-2 flex items-center justify-between border-t border-[var(--color-stone)]/40">
                      <Link
                        href={`/gems/${gem.slug}`}
                        className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-gold)] hover:underline flex items-center gap-1"
                      >
                        Inspect Dossier →
                      </Link>
                      <Link
                        href={`/enquiry?specimen=${gem.specimen}`}
                        className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 glass-panel border border-[var(--color-stone)]/40 my-8">
              <p className="font-display text-lg text-[var(--color-graphite)] mb-2">No matching specimens in vault</p>
              <p className="text-xs text-[var(--color-muted)] mb-6 font-serif italic">
                Adjust your filter criteria or enquire with our concierge to source custom stones directly.
              </p>
              <button
                onClick={() => setResults(availableGems)}
                className="px-6 py-2.5 bg-[var(--color-gold)] text-white font-mono text-xs uppercase tracking-wider hover:bg-[var(--color-gold-dark)] transition-colors"
              >
                Reset Vault Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
