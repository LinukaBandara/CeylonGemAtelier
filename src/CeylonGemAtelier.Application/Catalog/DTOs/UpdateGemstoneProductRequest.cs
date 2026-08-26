namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record UpdateGemstoneProductRequest(
    string Name,
    string Slug,
    Guid GemstoneTypeId,
    Guid? GemstoneVarietyId,
    string? Description);
