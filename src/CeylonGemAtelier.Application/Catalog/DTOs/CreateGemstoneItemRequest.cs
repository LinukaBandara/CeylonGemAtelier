namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateGemstoneItemRequest(
    Guid GemstoneProductId,
    string StockNumber,
    decimal CaratWeight,
    Guid ShapeId,
    Guid TreatmentId,
    Guid? OriginId,
    string? Color,
    string? Clarity,
    decimal? LengthMm,
    decimal? WidthMm,
    decimal? DepthMm,
    decimal? AcquisitionAmount,
    string? AcquisitionCurrency,
    decimal? SellingAmount,
    string? SellingCurrency);
