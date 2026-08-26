using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class AtelierSettingsService
{
    private readonly IAtelierSettingsRepository _repository;

    public AtelierSettingsService(
        IAtelierSettingsRepository repository)
    {
        _repository = repository;
    }

    public async Task<AtelierSettingsDto> GetAsync(
        CancellationToken cancellationToken = default)
    {
        var settings = await GetOrCreateAsync(cancellationToken);

        return Map(settings);
    }

    public async Task<AtelierSettingsDto> UpdateAsync(
        UpdateAtelierSettingsRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var settings = await GetOrCreateAsync(cancellationToken);

        settings.Update(
            request.AtelierName,
            request.ContactEmail,
            request.ContactPhone,
            request.WhatsAppNumber,
            request.Address,
            request.InstagramUrl,
            request.FacebookUrl,
            request.DefaultCurrency,
            request.StockNumberPrefix,
            request.ShowPricesPublicly,
            request.HeroTitle,
            request.HeroSubtitle,
            request.SeoTitle,
            request.SeoDescription);

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(settings);
    }

    private async Task<AtelierSettings> GetOrCreateAsync(
        CancellationToken cancellationToken)
    {
        var settings = await _repository.GetAsync(cancellationToken);

        if (settings is not null)
        {
            return settings;
        }

        settings = AtelierSettings.CreateDefault();

        await _repository.AddAsync(settings, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return settings;
    }

    private static AtelierSettingsDto Map(AtelierSettings settings)
    {
        return new AtelierSettingsDto(
            settings.Id,
            settings.AtelierName,
            settings.ContactEmail,
            settings.ContactPhone,
            settings.WhatsAppNumber,
            settings.Address,
            settings.InstagramUrl,
            settings.FacebookUrl,
            settings.DefaultCurrency,
            settings.StockNumberPrefix,
            settings.ShowPricesPublicly,
            settings.HeroTitle,
            settings.HeroSubtitle,
            settings.SeoTitle,
            settings.SeoDescription);
    }
}
