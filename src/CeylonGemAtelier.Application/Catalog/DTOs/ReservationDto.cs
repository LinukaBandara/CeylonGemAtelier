namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record ReservationDto(
    Guid Id,
    Guid GemstoneItemId,
    string? StockNumber,
    string CustomerName,
    string CustomerEmail,
    string? CustomerPhone,
    DateTime? PreferredDate,
    string? Message,
    string? InternalNotes,
    string Status,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
