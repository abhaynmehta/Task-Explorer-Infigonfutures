"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export function ProductGrid({ products, loading, favorites, onToggleFavorite }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Product listing"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard
            product={product}
            isFavorite={favorites.has(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
}

