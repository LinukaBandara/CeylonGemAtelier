import { useCallback, useState } from "react";

const STORAGE_KEY = "cga_favorites";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function persist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

/**
 * localStorage-backed favorites for gemstone items.
 * Each favorite stores: { id, stockNumber, productName, status, href }
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggle = useCallback((item) => {
    setFavorites((prev) => {
      let next;
      if (prev.some((f) => f.id === item.id)) {
        next = prev.filter((f) => f.id !== item.id);
      } else {
        next = [
          ...prev,
          {
            id: item.id,
            stockNumber: item.stockNumber,
            productName: item.productName ?? item.name ?? "",
            status: item.status ?? "",
            href: `/inventory/${item.id}`,
          },
        ];
      }
      persist(next);
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setFavorites([]);
    persist([]);
  }, []);

  return { favorites, isFavorite, toggle, remove, clear };
}
