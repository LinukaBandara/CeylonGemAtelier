using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class AtelierSettings : BaseEntity
{
    public string AtelierName { get; private set; }

    public string? ContactEmail { get; private set; }

    public string? ContactPhone { get; private set; }

    public string? WhatsAppNumber { get; private set; }

    public string? Address { get; private set; }

    public string? InstagramUrl { get; private set; }

    public string? FacebookUrl { get; private set; }

    public string DefaultCurrency { get; private set; }

    public string StockNumberPrefix { get; private set; }

    public bool ShowPricesPublicly { get; private set; }

    public string? HeroTitle { get; private set; }

    public string? HeroSubtitle { get; private set; }

    public string? SeoTitle { get; private set; }

    public string? SeoDescription { get; private set; }

    private AtelierSettings()
    {
        AtelierName = string.Empty;
        DefaultCurrency = string.Empty;
        StockNumberPrefix = string.Empty;
    }

    public static AtelierSettings CreateDefault()
    {
        var settings = new AtelierSettings
        {
            AtelierName = "Ceylon Gem Atelier",
            DefaultCurrency = "USD",
            StockNumberPrefix = "CGA",
            ShowPricesPublicly = true
        };

        return settings;
    }

    public void Update(
        string atelierName,
        string? contactEmail,
        string? contactPhone,
        string? whatsAppNumber,
        string? address,
        string? instagramUrl,
        string? facebookUrl,
        string defaultCurrency,
        string stockNumberPrefix,
        bool showPricesPublicly,
        string? heroTitle,
        string? heroSubtitle,
        string? seoTitle,
        string? seoDescription)
    {
        if (string.IsNullOrWhiteSpace(atelierName))
        {
            throw new ArgumentException(
                "Atelier name is required.",
                nameof(atelierName));
        }

        if (string.IsNullOrWhiteSpace(defaultCurrency)
            || defaultCurrency.Trim().Length != 3)
        {
            throw new ArgumentException(
                "Default currency must use a 3-letter ISO code.",
                nameof(defaultCurrency));
        }

        if (string.IsNullOrWhiteSpace(stockNumberPrefix))
        {
            throw new ArgumentException(
                "Stock number prefix is required.",
                nameof(stockNumberPrefix));
        }

        AtelierName = atelierName.Trim();
        ContactEmail = contactEmail?.Trim();
        ContactPhone = contactPhone?.Trim();
        WhatsAppNumber = whatsAppNumber?.Trim();
        Address = address?.Trim();
        InstagramUrl = instagramUrl?.Trim();
        FacebookUrl = facebookUrl?.Trim();
        DefaultCurrency = defaultCurrency.Trim().ToUpperInvariant();
        StockNumberPrefix = stockNumberPrefix.Trim().ToUpperInvariant();
        ShowPricesPublicly = showPricesPublicly;
        HeroTitle = heroTitle?.Trim();
        HeroSubtitle = heroSubtitle?.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }
}
