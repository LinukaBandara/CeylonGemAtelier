import { Gem } from "@/data/gems";

/**
 * Search gems by name, specimen, or story
 */
export function searchGems(gems: Gem[], query: string): Gem[] {
  if (!query.trim()) return gems;
  
  const lowerQuery = query.toLowerCase();
  return gems.filter(
    (gem) =>
      gem.name.toLowerCase().includes(lowerQuery) ||
      gem.specimen.toLowerCase().includes(lowerQuery) ||
      gem.story.toLowerCase().includes(lowerQuery) ||
      gem.colour.toLowerCase().includes(lowerQuery) ||
      gem.origin.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter gems by various criteria
 */
export interface GemFilters {
  collection?: string;
  colour?: string;
  cut?: string;
  clarity?: string;
  origin?: string;
  treatment?: string;
  minCarat?: number;
  maxCarat?: number;
  variant?: string;
}

export function filterGems(gems: Gem[], filters: GemFilters): Gem[] {
  return gems.filter((gem) => {
    if (filters.collection && gem.collection !== filters.collection)
      return false;
    if (filters.colour && gem.colour !== filters.colour) return false;
    if (filters.cut && gem.cut !== filters.cut) return false;
    if (filters.clarity && gem.clarity !== filters.clarity) return false;
    if (filters.origin && !gem.origin.includes(filters.origin)) return false;
    if (filters.treatment && gem.treatment !== filters.treatment) return false;
    if (filters.variant && gem.variant !== filters.variant) return false;

    if (filters.minCarat || filters.maxCarat) {
      const caratNum = parseFloat(gem.carat);
      if (filters.minCarat && caratNum < filters.minCarat) return false;
      if (filters.maxCarat && caratNum > filters.maxCarat) return false;
    }

    return true;
  });
}

/**
 * Get unique values for filter dropdowns
 */
export function getFilterOptions(gems: Gem[], field: keyof Gem) {
  const values = gems
    .map((gem) => gem[field])
    .filter((v) => v && typeof v === "string")
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort();
  return values;
}

/**
 * Find related gems (similar color, cut, collection)
 */
export function findRelatedGems(gem: Gem, allGems: Gem[], limit = 3): Gem[] {
  return allGems
    .filter(
      (g) =>
        g.slug !== gem.slug &&
        (g.collection === gem.collection ||
          g.colour === gem.colour ||
          g.cut === gem.cut)
    )
    .slice(0, limit);
}

/**
 * Sort gems by various criteria
 */
export function sortGems(
  gems: Gem[],
  by: "name" | "carat" | "collection" | "date"
): Gem[] {
  const sorted = [...gems];
  switch (by) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "carat":
      return sorted.sort(
        (a, b) => parseFloat(b.carat) - parseFloat(a.carat)
      );
    case "collection":
      return sorted.sort((a, b) => a.collection.localeCompare(b.collection));
    default:
      return sorted;
  }
}

/**
 * Extract price from carat (simple estimation)
 */
export function estimatePrice(carat: number, variant: string): string {
  const basePrice = {
    sapphire: 1200,
    padparadscha: 2500,
    geuda: 800,
    faceted: 1200,
    rough: 500,
  };
  const price = (basePrice[variant as keyof typeof basePrice] || 1000) * carat;
  return `$${price.toLocaleString()}`;
}
