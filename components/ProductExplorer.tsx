"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import { EmptyState } from "@/components/EmptyState";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";

interface ProductExplorerProps {
  products: Product[];
}

type SortOption = "" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export function ProductExplorer({ products }: ProductExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, hydrated, toggleFavorite } = useFavorites();

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );

  const filteredAndSortedProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchesSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm);
      const matchesCategory = !category || p.category === category;
      const matchesFavorite = !showFavoritesOnly || favorites.has(p.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });

    if (sortBy) {
      result = [...result].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name-asc") return a.title.localeCompare(b.title);
        if (sortBy === "name-desc") return b.title.localeCompare(a.title);
        return 0;
      });
    }

    return result;
  }, [products, search, category, sortBy, showFavoritesOnly, favorites]);

  if (!hydrated && favorites.size === 0) {
    return <ProductGrid products={[]} loading favorites={favorites} onToggleFavorite={toggleFavorite} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductFilters
        search={search}
        category={category}
        sortBy={sortBy}
        categories={categories}
        showFavoritesOnly={showFavoritesOnly}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={(value) => setSortBy(value as SortOption)}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <EmptyState
          title="No products match your filters"
          description="Adjust your search, category, or favorites filter to see more products."
        />
      ) : (
        <ProductGrid
          products={filteredAndSortedProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          loading={!hydrated}
        />
      )}
    </div>
  );
}

