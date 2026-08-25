namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record UpdateGemstoneMediaRequest(
    string Url,
    string? AltText,
    int SortOrder);
