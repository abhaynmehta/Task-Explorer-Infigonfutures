"use client";

import { useEffect } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { clientLogger } from "@/lib/client-logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ErrorProps) {
  useEffect(() => {
    clientLogger.error("Product page error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <div className="flex flex-col gap-4">
      <EmptyState
        title="Failed to load product"
        description="We couldn't load the product details. This might be a temporary issue."
      />
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          aria-label="Retry loading product"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-400"
          aria-label="Return to product listing"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  );
}

