"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Gem } from "@/data/gems";
import { SearchFilter } from "@/components/SearchFilter";
import { GemPlaceholder } from "@/components/GemPlaceholder";
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

  // Fetch gems from API on mount
  useEffect(() => {
    const loadGems = async () => {
      try {
        setIsLoading(true);
        const gems = await fetchAllGems();
        setAllGems(gems);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load gems";
        console.error("Error loading gems:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadGems();
  }, []);

  // Filter by collection when gems are loaded
  useEffect(() => {
    if (collection) {
      setResults(allGems.filter((g) => g.collection === collection));
    } else {
      setResults(allGems);
    }
  }, [allGems, collection]);

  const availableGems =
    collection ? allGems.filter((g) => g.collection === collection) : allGems;

  return (
    <div>
      {title && (
        <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">
          {title}
        </h1>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 font-medium mb-2">Failed to load catalog</p>
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 animate-pulse"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--color-muted)] mt-8">
            Loading catalog...
          </p>
        </div>
      )}

      {/* Content State */}
      {!isLoading && !error && (
        <>
          <SearchFilter gems={availableGems} onResults={setResults} />

          {showCompare && (
            <div className="mb-8 border border-[var(--color-stone)]/40 p-6 bg-[var(--color-parchment)]/10">
              <h3 className="font-serif text-lg text-[var(--color-graphite)] mb-4">
                Comparison Tool
              </h3>
              <CompareGems availableGems={availableGems} />
            </div>
          )}

          <button
            onClick={() => setShowCompare(!showCompare)}
            className="mb-6 px-4 py-2 border border-[var(--color-graphite)]/40 text-[var(--color-graphite)] hover:border-[var(--color-graphite)] text-sm transition-colors"
          >
            {showCompare ? "Hide" : "Show"} Comparison Tool
          </button>

          <div className="text-sm text-[var(--color-muted)] mb-6">
            Showing {results.length} of {availableGems.length} stone
            {availableGems.length > 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((gem) => (
              <Link
                key={gem.slug}
                href={`/gems/${gem.slug}`}
                className="group block bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 hover:border-[var(--color-graphite)]/50 transition-all duration-400 hover:shadow-[0_12px_40px_-12px_rgba(28,27,26,0.1)] hover:-translate-y-1"
              >
                {/* Image with Wishlist Button */}
                <div className="aspect-[3/4] relative flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] overflow-hidden">
                  <GemPlaceholder variant={gem.variant} size="md" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton slug={gem.slug} variant="icon" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="font-serif text-lg text-[var(--color-graphite)] group-hover:text-[var(--color-sapphire)] transition-colors mb-2">
                    {gem.name}
                  </h3>

                  <table className="w-full text-xs text-[var(--color-muted)] space-y-1 mb-4">
                    <tbody>
                      <tr>
                        <td className="font-medium text-[var(--color-graphite)] w-1/3">
                          Specimen
                        </td>
                        <td>{gem.specimen}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-[var(--color-graphite)]">
                          Carat
                        </td>
                        <td>{gem.carat}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-[var(--color-graphite)]">
                          Colour
                        </td>
                        <td>{gem.colour}</td>
                      </tr>
                      <tr>
                        <td className="font-medium text-[var(--color-graphite)]">
                          Cut
                        </td>
                        <td>{gem.cut}</td>
                      </tr>
                    </tbody>
                  </table>

                  {gem.price && (
                    <p className="text-sm font-medium text-[var(--color-graphite)] mb-2">
                      {gem.price}
                    </p>
                  )}

                  <span className="text-xs tracking-wide inline-flex items-center gap-1 group-hover:gap-2 transition-all text-[var(--color-graphite)]">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--color-muted)] mb-4">
                No stones match your filters.
              </p>
              <button
                onClick={() => setResults(availableGems)}
                className="text-sm text-[var(--color-sapphire)] hover:text-[var(--color-graphite)] transition-colors underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
