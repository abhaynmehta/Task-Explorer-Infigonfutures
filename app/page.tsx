import { ProductExplorer } from "@/components/ProductExplorer";
import { EmptyState } from "@/components/EmptyState";
import { fetchProducts } from "@/lib/api";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  let products;
  let loadError = false;
  let errorMessage = "Something went wrong while contacting the catalog service. Please retry shortly.";

  try {
    products = await fetchProducts();
  } catch (error) {
    loadError = true;
    const apiError = error as { status?: number; message?: string };
    
    if (apiError.status === 403) {
      errorMessage = "Access to the product catalog is temporarily restricted. Please try again in a few moments.";
    } else if (apiError.status === 429) {
      errorMessage = "Too many requests. Please wait a moment and refresh the page.";
    } else if (apiError.status === 0) {
      errorMessage = "Unable to connect to the product catalog. Please check your connection and try again.";
    }
    
    logger.error("Failed to load products for home page", { error, status: apiError.status });
  }

  if (loadError || !products) {
    return (
      <EmptyState
        title="Unable to load products"
        description={errorMessage}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Product Explorer
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Browse products, filter by category, search by title, sort by price, and save your
          favorites.
        </p>
      </div>
      <ProductExplorer products={products} />
    </div>
  );
}
