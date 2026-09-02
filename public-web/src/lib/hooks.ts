"use client";

import { useState, useEffect } from "react";

/**
 * Hook for managing localStorage state
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      console.error(`Error reading localStorage key "${key}"`);
    }
    setIsLoaded(true);
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      console.error(`Error setting localStorage key "${key}"`);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}

/**
 * Hook for managing wishlist/favorites
 */
export function useWishlist() {
  const [wishlist, setWishlist, isLoaded] = useLocalStorage<string[]>(
    "cga-wishlist",
    []
  );

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  return { wishlist, toggleWishlist, isWishlisted, isLoaded };
}

/**
 * Hook for theme management
 */
export function useTheme() {
  const [theme, setTheme, isLoaded] = useLocalStorage<"light" | "dark">(
    "cga-theme",
    "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (!isLoaded) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isLoaded]);

  return { theme, toggleTheme, isLoaded };
}

/**
 * Hook for comparing gems
 */
export function useCompare() {
  const [compared, setCompared, isLoaded] = useLocalStorage<string[]>(
    "cga-compare",
    []
  );

  const toggleCompare = (slug: string) => {
    setCompared((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      // Max 3 gems to compare
      if (prev.length >= 3) {
        return [prev[1], prev[2], slug];
      }
      return [...prev, slug];
    });
  };

  const isCompared = (slug: string) => compared.includes(slug);

  return { compared, toggleCompare, isCompared, isLoaded };
}
