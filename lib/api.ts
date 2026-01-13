import { logger } from "@/lib/logger";
import { ApiError, Product } from "@/lib/types";

const API_BASE = "https://fakestoreapi.com";
const CACHE_TIME = 60;

async function fetchData<T>(path: string, retries = 2): Promise<T> {
  const url = `${API_BASE}${path}`;
  logger.info("Fetching data", { url });

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        next: { revalidate: CACHE_TIME },
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ProductExplorer/1.0)",
          "Accept": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json() as T;
        return data;
      }

      if (response.status === 403 || response.status === 429) {
        if (attempt < retries) {
          const delay = (attempt + 1) * 1000;
          logger.warn(`Rate limited, retrying after ${delay}ms`, { url, attempt });
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      logger.error("API request failed", { url, status: response.status, attempt });
      throw {
        message: `Request failed with status ${response.status}`,
        status: response.status,
      } as ApiError;
    } catch (error) {
      if (error && typeof error === "object" && "status" in error) {
        if (attempt < retries && (error.status === 403 || error.status === 429)) {
          const delay = (attempt + 1) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }

      if (attempt < retries) {
        const delay = (attempt + 1) * 1000;
        logger.warn(`Network error, retrying after ${delay}ms`, { url, attempt, error });
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      logger.error("Network error", { url, error });
      throw {
        message: "Network error occurred",
        status: 0,
      } as ApiError;
    }
  }

  throw {
    message: "Failed after retries",
    status: 0,
  } as ApiError;
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchData<Product[]>("/products");
}

export async function fetchProductById(id: string | number): Promise<Product> {
  return fetchData<Product>(`/products/${id}`);
}

