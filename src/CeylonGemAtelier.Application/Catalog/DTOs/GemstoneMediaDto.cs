using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneMediaDto(
    Guid Id,
    Guid GemstoneItemId,
    GemstoneMediaType Type,
    string Url,
    string? AltText,
    int SortOrder,
    bool IsPrimary);
