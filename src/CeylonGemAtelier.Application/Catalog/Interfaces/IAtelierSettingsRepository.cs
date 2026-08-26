using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IAtelierSettingsRepository
{
    Task<AtelierSettings?> GetAsync(
        CancellationToken cancellationToken = default);

    Task AddAsync(
        AtelierSettings settings,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
