namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneProductDto(
    Guid Id,
    string Name,
    string Slug,
    Guid GemstoneTypeId,
    Guid? GemstoneVarietyId,
    string? Description,
    bool IsPublished,
    IReadOnlyCollection<GemstoneItemDto> Items);
