namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateReservationRequest(
    Guid GemstoneItemId,
    string CustomerName,
    string CustomerEmail,
    string? CustomerPhone,
    DateTime? PreferredDate,
    string? Message);
