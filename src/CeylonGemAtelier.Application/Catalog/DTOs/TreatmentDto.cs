namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record TreatmentDto(
    Guid Id,
    string Name,
    string? Description,
    int SortOrder,
    bool IsActive);
