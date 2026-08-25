using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateGemstoneMediaRequest(
    Guid GemstoneItemId,
    GemstoneMediaType Type,
    string Url,
    string? AltText,
    int SortOrder,
    bool IsPrimary);
