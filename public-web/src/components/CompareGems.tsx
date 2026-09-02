"use client";

import { Gem } from "@/data/gems";
import { useCompare } from "@/lib/hooks";
import Link from "next/link";

interface CompareGemsProps {
  availableGems: Gem[];
}

export function CompareGems({ availableGems }: CompareGemsProps) {
  const { compared, toggleCompare, isLoaded } = useCompare();

  if (!isLoaded) return null;

  const selectedGems = availableGems.filter((g) => compared.includes(g.slug));

  return (
    <div className="space-y-6">
      {/* Selected Gems Display */}
      {selectedGems.length > 0 && (
        <div className="bg-[var(--color-parchment)]/20 p-6 rounded-sm">
          <h3 className="font-serif text-lg text-[var(--color-graphite)] mb-4">
            Comparing {selectedGems.length} Stone{selectedGems.length > 1 ? "s" : ""}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {selectedGems.map((gem) => (
              <div
                key={gem.slug}
                className="border border-[var(--color-stone)]/40 p-3 flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-[var(--color-graphite)]">
                    {gem.name}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {gem.specimen}
                  </p>
                </div>
                <button
                  onClick={() => toggleCompare(gem.slug)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {selectedGems.length > 1 && (
            <Link
              href={`/compare?gems=${compared.join(",")}`}
              className="inline-block px-4 py-2 bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-sapphire)] transition-colors text-sm"
            >
              View Detailed Comparison
            </Link>
          )}
        </div>
      )}

      {/* Add to Compare Section */}
      <div>
        <h4 className="font-medium text-[var(--color-graphite)] mb-3">
          Add to Comparison (Max 3)
        </h4>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          {compared.length}/3 stones selected
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {availableGems
            .filter((g) => !compared.includes(g.slug))
            .map((gem) => (
              <button
                key={gem.slug}
                onClick={() => toggleCompare(gem.slug)}
                disabled={compared.length >= 3}
                className="text-left px-3 py-2 border border-[var(--color-stone)]/40 hover:border-[var(--color-graphite)] transition-colors text-sm disabled:opacity-50"
              >
                <p className="font-medium text-[var(--color-graphite)]">
                  {gem.name}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {gem.carat} · {gem.colour}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
