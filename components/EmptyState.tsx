interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</p>
      <p className="max-w-lg text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}

