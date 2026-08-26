namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateSaleRequest(
    Guid GemstoneItemId,
    string BuyerName,
    string? BuyerEmail,
    decimal PriceAmount,
    string? PriceCurrency,
    DateTime? SaleDate,
    string? Notes);
