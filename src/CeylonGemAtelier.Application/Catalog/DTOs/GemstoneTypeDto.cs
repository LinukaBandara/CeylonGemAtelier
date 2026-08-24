namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneTypeDto(
    Guid Id,
    string Name,
    string? Description,
    bool IsActive);
