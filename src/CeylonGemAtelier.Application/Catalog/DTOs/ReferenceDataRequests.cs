namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record SaveGemstoneTypeRequest(
    string Name,
    string? Description);

public sealed record SaveShapeRequest(
    string Name,
    string? Description);

public sealed record SaveTreatmentRequest(
    string Name,
    string? Description,
    int SortOrder);

public sealed record SaveOriginRequest(
    string Country,
    string? Region,
    string? Mine,
    string? Description);

public sealed record SaveLaboratoryRequest(
    string Name,
    string ShortCode,
    string? Website,
    string? Description);
