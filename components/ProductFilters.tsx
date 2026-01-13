"use client";

import { clsx } from "clsx";

interface ProductFiltersProps {
  search: string;
  category: string;
  sortBy: string;
  categories: string[];
  showFavoritesOnly: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onToggleFavoritesOnly: () => void;
}

export function ProductFilters({
  search,
  category,
  sortBy,
  categories,
  showFavoritesOnly,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onToggleFavoritesOnly,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full min-w-[200px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:border-indigo-400"
          aria-label="Search products by title"
        />
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-indigo-400"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-indigo-400"
          aria-label="Sort products"
        >
          <option value="">Sort by...</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <button
        type="button"
        onClick={onToggleFavoritesOnly}
        className={clsx(
          "w-full rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:w-auto",
          showFavoritesOnly
            ? "bg-amber-100 text-amber-700 ring-2 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800"
            : "border border-zinc-200 bg-white text-zinc-700 hover:border-amber-400 hover:text-amber-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-amber-500",
        )}
        aria-pressed={showFavoritesOnly}
      >
        {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
      </button>
    </div>
  );
}

