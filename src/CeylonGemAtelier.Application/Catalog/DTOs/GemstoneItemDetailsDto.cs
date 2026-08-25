namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record GemstoneItemDetailsDto(
    GemstoneItemDto Item,
    IReadOnlyList<GemstoneMediaDto> Media,
    IReadOnlyList<CertificateDto> Certificates);
