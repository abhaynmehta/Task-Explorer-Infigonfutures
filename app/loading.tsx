import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4" aria-live="polite" aria-label="Loading products">
      <div className="h-6 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

