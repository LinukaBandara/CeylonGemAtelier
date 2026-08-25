namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CatalogOriginDto(
    Guid Id,
    string Country,
    string? Region,
    string? Mine,
    string? Description);
