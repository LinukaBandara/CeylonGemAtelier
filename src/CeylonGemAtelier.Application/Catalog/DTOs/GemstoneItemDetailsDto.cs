namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneItemDetailsDto(
    GemstoneItemEnrichedDto Item,
    IReadOnlyList<GemstoneMediaDto> Media,
    IReadOnlyList<CertificateDto> Certificates);
