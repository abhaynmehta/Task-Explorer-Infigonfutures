import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <EmptyState
        title="We could not find that page"
        description="The product or route you requested does not exist. Return to the catalog to keep browsing."
      />
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-400"
        aria-label="Return to home page"
      >
        ← Back to home
      </Link>
    </div>
  );
}

