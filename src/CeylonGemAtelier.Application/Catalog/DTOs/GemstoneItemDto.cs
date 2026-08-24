namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneItemDto(
    Guid Id,
    string StockNumber,
    decimal CaratWeight,
    Guid ShapeId,
    string? Color,
    string? Clarity,
    Guid TreatmentId,
    Guid? OriginId,
    decimal? LengthMm,
    decimal? WidthMm,
    decimal? DepthMm,
    decimal? SellingPriceAmount,
    string? SellingPriceCurrency,
    string Status);
