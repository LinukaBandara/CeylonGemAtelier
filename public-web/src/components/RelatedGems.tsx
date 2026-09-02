"use client";

import Link from "next/link";
import { Gem } from "@/data/gems";
import { GemPlaceholder } from "./GemPlaceholder";
import { WishlistButton } from "./WishlistButton";

interface RelatedGemsProps {
  gems: Gem[];
  title?: string;
}

export function RelatedGems({
  gems,
  title = "Related Stones",
}: RelatedGemsProps) {
  if (!gems || gems.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[var(--color-stone)]/20">
      <h3 className="font-serif text-2xl text-[var(--color-graphite)] mb-8">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gems.map((gem) => (
          <Link
            key={gem.slug}
            href={`/gems/${gem.slug}`}
            className="group block bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 p-4 hover:border-[var(--color-graphite)]/50 transition-all duration-400"
          >
            <div className="aspect-[3/4] mb-4 flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] relative">
              <GemPlaceholder variant={gem.variant} size="sm" />
              <div className="absolute top-2 right-2">
                <WishlistButton slug={gem.slug} variant="icon" size="sm" />
              </div>
            </div>
            <h4 className="font-serif text-lg text-[var(--color-graphite)] group-hover:text-[var(--color-sapphire)] transition-colors">
              {gem.name}
            </h4>
            <p className="text-sm text-[var(--color-muted)] mt-2">
              {gem.carat} · {gem.colour}
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {gem.origin}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
