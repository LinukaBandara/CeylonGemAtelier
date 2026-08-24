namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record ShapeDto(
    Guid Id,
    string Name,
    string? Description,
    bool IsActive);
