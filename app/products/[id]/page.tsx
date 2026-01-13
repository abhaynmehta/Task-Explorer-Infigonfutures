import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { logger } from "@/lib/logger";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  if (!id || isNaN(Number(id))) {
    return notFound();
  }

  let product;
  let loadError = false;

  try {
    product = await fetchProductById(id);
  } catch (error) {
    loadError = true;
    logger.error("Failed to load product detail", { id, error });
  }

  if (loadError || !product) {
    return notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
          sizes="(min-width: 1024px) 40vw, 80vw"
          priority
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 whitespace-nowrap">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="rounded-lg bg-amber-50 px-2 py-1 font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                ★ {product.rating.rate.toFixed(1)}
              </span>
              <span>({product.rating.count} reviews)</span>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Description</h2>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Product ID:</span>{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">#{product.id}</span>
          </div>
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Category:</span>{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50 capitalize">{product.category}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-400"
            aria-label="Return to product listing"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}

