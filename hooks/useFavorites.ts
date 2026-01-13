"use client";

import { useEffect, useState } from "react";
import { clientLogger } from "@/lib/client-logger";

const STORAGE_KEY = "product-explorer:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: number[] = JSON.parse(stored);
        setFavorites(new Set(parsed));
        clientLogger.info("Loaded favorites from storage", { count: parsed.length });
      }
    } catch (error) {
      clientLogger.error("Failed to load favorites", { error });
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const serialized = JSON.stringify(Array.from(favorites));
      window.localStorage.setItem(STORAGE_KEY, serialized);
      clientLogger.debug("Saved favorites", { count: favorites.size });
    } catch (error) {
      clientLogger.error("Failed to save favorites", { error });
    }
  }, [favorites, hydrated]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return { favorites, hydrated, toggleFavorite };
}

