"use client";

import Link from "next/link";
import { gems, type Gem } from "@/data/gems";
import { GemImage } from "./GemImage";
import { WishlistButton } from "./WishlistButton";

interface RelatedGemsProps {
  gems?: Gem[];
  currentSlug?: string;
  title?: string;
}

export function RelatedGems({
  gems: providedGems,
  currentSlug,
  title = "Related Stones",
}: RelatedGemsProps) {
  let list: Gem[] = providedGems ?? [];

  if ((!list || list.length === 0) && currentSlug) {
    const current = gems[currentSlug];
    if (current?.relatedStones) {
      list = current.relatedStones
        .map((s) => gems[s])
        .filter(Boolean) as Gem[];
    }
  }

  if (!list || list.length === 0) return null;

  return (
    <section>
      <h3 className="font-serif text-2xl text-[var(--color-graphite)] mb-8">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((gem) => (
          <Link
            key={gem.slug}
            href={`/gems/${gem.slug}`}
            className="group block bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 overflow-hidden hover:border-[var(--color-graphite)]/50 transition-all duration-400 hover:shadow-[0_12px_40px_-12px_rgba(28,27,26,0.1)]"
          >
            <div className="aspect-[3/4] relative bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]">
              <GemImage
                src={gem.images?.[0]}
                alt={gem.name}
                variant={gem.variant}
                fill
                objectFit="cover"
              />
              <div className="absolute top-2 right-2">
                <WishlistButton slug={gem.slug} variant="icon" size="sm" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-serif text-lg text-[var(--color-graphite)] group-hover:text-[var(--color-sapphire)] transition-colors">
                {gem.name}
              </h4>
              <p className="text-sm text-[var(--color-muted)] mt-2">
                {gem.carat} · {gem.colour}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-1">{gem.origin}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
