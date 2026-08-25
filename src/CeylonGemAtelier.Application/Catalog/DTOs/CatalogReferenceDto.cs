namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CatalogReferenceDto(
    Guid Id,
    string Name,
    string? Description);
