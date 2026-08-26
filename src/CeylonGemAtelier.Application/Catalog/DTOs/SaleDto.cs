namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record SaleDto(
    Guid Id,
    string SaleNumber,
    Guid GemstoneItemId,
    string? StockNumber,
    string BuyerName,
    string? BuyerEmail,
    decimal PriceAmount,
    string PriceCurrency,
    DateTime SaleDate,
    string PaymentStatus,
    string? Notes,
    DateTime CreatedAt);
