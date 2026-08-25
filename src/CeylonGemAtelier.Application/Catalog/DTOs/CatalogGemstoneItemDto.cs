namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CatalogGemstoneItemDto(
    GemstoneItemDto Item,
    CatalogReferenceDto? Shape,
    CatalogReferenceDto? Treatment,
    CatalogOriginDto? Origin,
    IReadOnlyList<GemstoneMediaDto> Media,
    IReadOnlyList<CertificateDto> Certificates);
