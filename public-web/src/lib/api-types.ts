/**
 * Backend API Response Types
 * These types match the ASP.NET Core API DTOs
 */

export interface CatalogReferenceDto {
  id: string;
  name: string;
}

export interface CatalogGemstoneItemDto {
  id: string;
  stockNumber: string;
  caratWeight: number;
  color?: string;
  clarity?: string;
  lengthMm?: number;
  widthMm?: number;
  depthMm?: number;
  sellingPrice?: {
    amount: number;
    currency: string;
  };
  status: string;
  shape?: CatalogReferenceDto;
  treatment?: CatalogReferenceDto;
  origin?: CatalogReferenceDto;
}

export interface CatalogGemstoneProductDto {
  id: string;
  name: string;
  slug: string;
  gemstoneType?: CatalogReferenceDto;
  description?: string;
  isPublished: boolean;
  items: CatalogGemstoneItemDto[];
}

export interface CatalogGemstoneItemDetailsDto extends CatalogGemstoneItemDto {
  gemstoneProduct?: CatalogGemstoneProductDto;
}

export interface CatalogProductDetailsDto extends CatalogGemstoneProductDto {
  details?: CatalogGemstoneItemDetailsDto;
}
