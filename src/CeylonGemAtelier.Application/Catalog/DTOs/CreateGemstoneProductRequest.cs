namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateGemstoneProductRequest(
    string Name,
    string Slug,
    Guid GemstoneTypeId,
    Guid? GemstoneVarietyId,
    string? Description);