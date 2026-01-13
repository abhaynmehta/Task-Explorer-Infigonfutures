import { logger } from "@/lib/logger";
import { ApiError, Product } from "@/lib/types";

const API_BASE = "https://fakestoreapi.com";
const CACHE_TIME = 60;

async function fetchData<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  logger.info("Fetching data", { url });

  try {
    const response = await fetch(url, {
      next: { revalidate: CACHE_TIME },
    });

    if (!response.ok) {
      logger.error("API request failed", { url, status: response.status });
      throw {
        message: `Request failed with status ${response.status}`,
        status: response.status,
      } as ApiError;
    }

    const data = await response.json() as T;
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "status" in error) {
      throw error;
    }
    logger.error("Network error", { url, error });
    throw {
      message: "Network error occurred",
      status: 0,
    } as ApiError;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchData<Product[]>("/products");
}

export async function fetchProductById(id: string | number): Promise<Product> {
  return fetchData<Product>(`/products/${id}`);
}

