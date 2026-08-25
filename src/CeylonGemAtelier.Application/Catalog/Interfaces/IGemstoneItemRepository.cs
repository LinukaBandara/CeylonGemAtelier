using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneItemRepository
{
    Task<IReadOnlyList<GemstoneItem>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneItem?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<bool> StockNumberExistsAsync(
        string stockNumber,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        GemstoneItem item,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
