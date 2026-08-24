namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record LaboratoryDto(
    Guid Id,
    string Name,
    string ShortCode,
    string? Website,
    string? Description,
    bool IsActive);
