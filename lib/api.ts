import { logger } from "@/lib/logger";
import { ApiError, Product } from "@/lib/types";

const API_BASE = "https://fakestoreapi.com";
const CACHE_TIME = 60;

async function fetchData<T>(path: string, retries = 2): Promise<T> {
  const url = `${API_BASE}${path}`;
  logger.info("Fetching data", { url });

  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: CACHE_TIME },
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ProductExplorer/1.0)",
          "Accept": "application/json",
        },
        cache: "no-store",
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      const isRateLimit = res.status === 403 || res.status === 429;
      if (isRateLimit && i < retries) {
        const waitTime = (i + 1) * 1000;
        logger.warn(`Rate limited, retrying after ${waitTime}ms`, { url, attempt: i });
        await new Promise((r) => setTimeout(r, waitTime));
        continue;
      }

      logger.error("API request failed", { url, status: res.status, attempt: i });
      throw {
        message: `Request failed with status ${res.status}`,
        status: res.status,
      } as ApiError;
    } catch (err) {
      const error = err as ApiError | Error;
      
      if (error && typeof error === "object" && "status" in error) {
        const apiErr = error as ApiError;
        if (i < retries && (apiErr.status === 403 || apiErr.status === 429)) {
          const waitTime = (i + 1) * 1000;
          await new Promise((r) => setTimeout(r, waitTime));
          continue;
        }
        throw error;
      }

      if (i < retries) {
        const waitTime = (i + 1) * 1000;
        logger.warn(`Network error, retrying after ${waitTime}ms`, { url, attempt: i });
        await new Promise((r) => setTimeout(r, waitTime));
        continue;
      }

      logger.error("Network error", { url, error: err });
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

