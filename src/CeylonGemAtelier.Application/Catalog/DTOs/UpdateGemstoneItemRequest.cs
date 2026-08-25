namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record UpdateGemstoneItemRequest(
    decimal CaratWeight,
    Guid ShapeId,
    Guid TreatmentId,
    Guid? OriginId,
    string? Color,
    string? Clarity,
    decimal? LengthMm,
    decimal? WidthMm,
    decimal? DepthMm,
    decimal? SellingPriceAmount,
    string? SellingPriceCurrency);
