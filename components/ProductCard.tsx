"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onToggleFavorite(product.id);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h3>
          <button
            aria-label={isFavorite ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
            onClick={handleFavorite}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFavorite(e as unknown as MouseEvent<HTMLButtonElement>);
              }
            }}
            className={clsx(
              "rounded-full border px-2 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
              isFavorite
                ? "border-amber-500 bg-amber-100 text-amber-700 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-300"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-amber-400 hover:text-amber-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-amber-500",
            )}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {product.category}
        </p>
        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

