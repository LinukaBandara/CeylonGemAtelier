"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function createStorageSnapshot<T>(key: string, initialValue: T) {
  const serverSnapshot = JSON.stringify(initialValue);
  let cachedRaw: string | null = null;
  let cachedValue = initialValue;

  const getSnapshot = () => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === cachedRaw) return cachedValue;
      cachedRaw = raw;
      cachedValue = raw ? JSON.parse(raw) as T : initialValue;
      return cachedValue;
    } catch {
      return initialValue;
    }
  };

  const getServerSnapshot = () => {
    void serverSnapshot;
    return initialValue;
  };

  const subscribe = (onStoreChange: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        cachedRaw = null;
        onStoreChange();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  };

  return { getSnapshot, getServerSnapshot, subscribe };
}

/** Hook for managing localStorage state without synchronous effect updates. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const store = createStorageSnapshot(key, initialValue);
  const storedValue = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new StorageEvent("storage", { key }));
    } catch {
      console.error(`Error setting localStorage key "${key}"`);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}

export function useWishlist() {
  const [wishlist, setWishlist, isLoaded] = useLocalStorage<string[]>("cga-wishlist", []);
  const toggleWishlist = (slug: string) => setWishlist((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  const isWishlisted = (slug: string) => wishlist.includes(slug);
  return { wishlist, toggleWishlist, isWishlisted, isLoaded };
}

export function useTheme() {
  const [theme, setTheme, isLoaded] = useLocalStorage<"light" | "dark">("cga-theme", "light");
  const toggleTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light");
  useEffect(() => {
    if (!isLoaded) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme, isLoaded]);
  return { theme, toggleTheme, isLoaded };
}

export function useCompare() {
  const [compared, setCompared, isLoaded] = useLocalStorage<string[]>("cga-compare", []);
  const toggleCompare = (slug: string) => setCompared((prev) => {
    if (prev.includes(slug)) return prev.filter((s) => s !== slug);
    if (prev.length >= 3) return [prev[1], prev[2], slug];
    return [...prev, slug];
  });
  const isCompared = (slug: string) => compared.includes(slug);
  return { compared, toggleCompare, isCompared, isLoaded };
}
