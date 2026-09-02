import { useCallback, useRef } from "react";
import { api, unwrapCollection } from "./api";

/**
 * Provides a search function that queries the in-memory catalogue.
 * Data is fetched once on mount and cached for the session.
 */
export function useSearch() {
  const cache = useRef({ products: [], items: [] });
  const loaded = useRef(false);

  const prime = useCallback(async () => {
    if (loaded.current) return;
    try {
      const [rawProducts, rawItems] = await Promise.all([
        api.get("/api/catalog/products"),
        api.get("/api/catalog/items"),
      ]);
      cache.current = {
        products: unwrapCollection(rawProducts),
        items: unwrapCollection(rawItems),
      };
      loaded.current = true;
    } catch {
      // silently ignore — search will just return nothing
    }
  }, []);

  const search = useCallback(
    (query) => {
      const q = query.trim().toLowerCase();
      if (!q || q.length < 1) return [];

      const results = [];

      // Search products
      for (const p of cache.current.products) {
        const score = scoreProduct(p, q);
        if (score > 0) {
          results.push({
            type: "product",
            id: p.id,
            label: p.name,
            sub: p.isPublished ? "Published" : "Draft",
            href: "/products",
            score,
          });
        }
      }

      // Search items (gemstone inventory rows)
      for (const item of cache.current.items) {
        const score = scoreItem(item, q);
        if (score > 0) {
          results.push({
            type: "item",
            id: item.id,
            label: item.stockNumber,
            sub: [item.color, item.status].filter(Boolean).join(" · "),
            href: `/inventory/${item.id}`,
            score,
          });
        }
      }

      // Sort by score descending, cap at 10
      return results.sort((a, b) => b.score - a.score).slice(0, 10);
    },
    []
  );

  return { prime, search };
}

function scoreProduct(p, q) {
  let score = 0;
  if (p.name?.toLowerCase().includes(q)) score += p.name.toLowerCase().startsWith(q) ? 10 : 6;
  if (p.slug?.toLowerCase().includes(q)) score += 3;
  if (p.description?.toLowerCase().includes(q)) score += 2;
  return score;
}

function scoreItem(item, q) {
  let score = 0;
  if (item.stockNumber?.toLowerCase().includes(q)) score += item.stockNumber.toLowerCase().startsWith(q) ? 12 : 8;
  if (item.color?.toLowerCase().includes(q)) score += 4;
  if (item.clarity?.toLowerCase().includes(q)) score += 3;
  if (item.status?.toLowerCase().includes(q)) score += 2;
  return score;
}
