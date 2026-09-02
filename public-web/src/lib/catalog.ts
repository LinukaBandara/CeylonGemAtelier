/**
 * Catalog Service
 * Fetches gemstone catalog from API and adapts to UI schema
 */

import { apiClient } from "./api-client";
import type { CatalogGemstoneProductDto } from "./api-types";
import type { Gem } from "@/data/gems";

function mapApiGemToUiGem(product: CatalogGemstoneProductDto): Gem {
  const item = product.items?.[0];
  const variant: Gem["variant"] = product.description?.includes("faceted") ? "faceted" : product.description?.includes("rough") ? "rough" : product.description?.includes("padparadscha") ? "padparadscha" : "sapphire";
  const collection: Gem["collection"] = product.description?.includes("padparadscha") ? "padparadscha" : product.description?.includes("geuda") ? "ceylon-geuda" : "ceylon-sapphires";

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
    images: [],
    tags: [product.name, item?.shape?.name || "Faceted"].filter(Boolean),
    certifications: [],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  };
}

export async function fetchAllGems(): Promise<Gem[]> {
  try {
    const products = await apiClient.get<CatalogGemstoneProductDto[]>("/api/catalog/products");
    return products.map(mapApiGemToUiGem);
  } catch (error) {
    console.error("Failed to fetch gems:", error);
    throw error;
  }
}

export async function fetchGemBySlug(slug: string): Promise<Gem | null> {
  try {
    const product = await apiClient.get<CatalogGemstoneProductDto>(`/api/catalog/products/${slug}`);
    return mapApiGemToUiGem(product);
  } catch (error) {
    console.error(`Failed to fetch gem with slug ${slug}:`, error);
    return null;
  }
}

export async function fetchGemDetails(slug: string): Promise<CatalogGemstoneProductDto | null> {
  try {
    return await apiClient.get<CatalogGemstoneProductDto>(`/api/catalog/products/${slug}/details`);
  } catch (error) {
    console.error(`Failed to fetch gem details for ${slug}:`, error);
    return null;
  }
}
