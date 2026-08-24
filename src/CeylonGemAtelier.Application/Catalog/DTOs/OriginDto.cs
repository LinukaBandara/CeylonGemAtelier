namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record OriginDto(
    Guid Id,
    string Country,
    string? Region,
    string? Mine,
    string? Description,
    bool IsActive);
