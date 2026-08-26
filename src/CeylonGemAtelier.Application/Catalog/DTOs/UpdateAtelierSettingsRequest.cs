namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record UpdateAtelierSettingsRequest(
    string AtelierName,
    string? ContactEmail,
    string? ContactPhone,
    string? WhatsAppNumber,
    string? Address,
    string? InstagramUrl,
    string? FacebookUrl,
    string DefaultCurrency,
    string StockNumberPrefix,
    bool ShowPricesPublicly,
    string? HeroTitle,
    string? HeroSubtitle,
    string? SeoTitle,
    string? SeoDescription);
