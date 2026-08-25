using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneMediaRepository
{
    Task<IReadOnlyList<GemstoneMedia>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default);

    Task<GemstoneMedia?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        GemstoneMedia media,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
