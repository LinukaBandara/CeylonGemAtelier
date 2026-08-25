namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CatalogGemstoneProductDto(
    Guid Id,
    string Name,
    string Slug,
    CatalogReferenceDto? GemstoneType,
    string? Description,
    bool IsPublished,
    IReadOnlyList<CatalogGemstoneItemDto> Items);
