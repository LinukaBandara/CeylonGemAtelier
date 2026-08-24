namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneVarietyDto(
    Guid Id,
    Guid GemstoneTypeId,
    string Name,
    string? Description,
    bool IsActive);
