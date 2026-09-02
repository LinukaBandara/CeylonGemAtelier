import { createContext, useContext } from "react";
import { useFavorites } from "../services/useFavorites";

/**
 * AppContext exposes shared app-level state to all pages.
 * Currently provides the favorites store so Inventory + GemstoneDetail
 * can toggle favorites without re-instantiating the hook per page.
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const favorites = useFavorites();

  return (
    <AppContext.Provider value={{ favorites }}>
      {children}
    </AppContext.Provider>
  );
}

/** @returns {{ favorites: ReturnType<import('../services/useFavorites').useFavorites> }} */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    // Graceful no-op fallback outside provider (shouldn't happen in normal app flow)
    return {
      favorites: {
        favorites: [],
        isFavorite: () => false,
        toggle: () => {},
        remove: () => {},
        clear: () => {},
      },
    };
  }
  return ctx;
}
