/**
 * Catalog Service
 * Fetches gemstone catalog from API and adapts to UI schema
 */

import { apiClient } from "./api-client";
import type {
  CatalogGemstoneProductDto,
  CatalogGemstoneItemDto,
} from "./api-types";
import type { Gem } from "@/data/gems";

/**
 * Maps API response to UI Gem interface
 * Handles missing data with sensible defaults
 */
function mapApiGemToUiGem(product: CatalogGemstoneProductDto): Gem {
  // Get the first item (main inventory)
  const item = product.items?.[0];

  // Extract variant and collection from description or type
  const variant: Gem["variant"] = product.description?.includes("faceted")
    ? "faceted"
    : product.description?.includes("rough")
      ? "rough"
      : product.description?.includes("padparadscha")
        ? "padparadscha"
        : "sapphire";

  const collection: Gem["collection"] = product.description?.includes(
    "padparadscha"
  )
    ? "padparadscha"
    : product.description?.includes("geuda")
      ? "ceylon-geuda"
      : "ceylon-sapphires";

  return {
    slug: product.slug,
    name: product.name,
    specimen: item?.stockNumber || `${product.slug.toUpperCase()}-001`,
    carat: item ? `${item.caratWeight} ct` : "N/A",
    origin: item?.origin?.name || "Ceylon",
    treatment: item?.treatment?.name || "Unknown",
    cut: item?.shape?.name || "Cushion",
    colour: item?.color || "Not specified",
    clarity: item?.clarity || "VS",
    variant,
    story: product.description || "A fine Ceylon gemstone.",
    collection,
    price: item?.sellingPrice ? `$${item.sellingPrice.amount}` : undefined,
    images: [], // TODO: Link to media service when available
    tags: [product.name, item?.shape?.name || "Faceted"].filter(Boolean),
    certifications: [], // TODO: Link to certificate service
    refractive: "1.758 - 1.768", // Default sapphire value
    density: "3.99 g/cm³", // Default sapphire value
  };
}

/**
 * Fetch all published gemstones
 */
export async function fetchAllGems(): Promise<Gem[]> {
  try {
    const products = await apiClient.get<CatalogGemstoneProductDto[]>(
      "/api/catalog/products"
    );

    return products.map(mapApiGemToUiGem);
  } catch (error) {
    console.error("Failed to fetch gems:", error);
    throw error;
  }
}

/**
 * Fetch a single gemstone by slug
 */
export async function fetchGemBySlug(slug: string): Promise<Gem | null> {
  try {
    const product = await apiClient.get<CatalogGemstoneProductDto>(
      `/api/catalog/products/${slug}`
    );

    return mapApiGemToUiGem(product);
  } catch (error) {
    console.error(`Failed to fetch gem with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch gemstone details (for detail page)
 */
export async function fetchGemDetails(
  slug: string
): Promise<CatalogGemstoneProductDto | null> {
  try {
    const details = await apiClient.get<CatalogGemstoneProductDto>(
      `/api/catalog/products/${slug}/details`
    );

    return details;
  } catch (error) {
    console.error(`Failed to fetch gem details for ${slug}:`, error);
    return null;
  }
}
