namespace CeylonGemAtelier.Application.Catalog.DTOs;

/// <summary>
/// Enriched gemstone item DTO with reference data names included.
/// Used for display purposes where the frontend needs complete information without additional lookups.
/// </summary>
public sealed record GemstoneItemEnrichedDto(
    Guid Id,
    string StockNumber,
    decimal CaratWeight,
    Guid ShapeId,
    string? ShapeName,
    string? Color,
    string? Clarity,
    Guid TreatmentId,
    string? TreatmentName,
    Guid? OriginId,
    string? OriginName,
    decimal? LengthMm,
    decimal? WidthMm,
    decimal? DepthMm,
    decimal? SellingPriceAmount,
    string? SellingPriceCurrency,
    string Status,
    Guid GemstoneProductId,
    string? ProductName);
