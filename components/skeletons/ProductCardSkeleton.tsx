"use client";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-square w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

