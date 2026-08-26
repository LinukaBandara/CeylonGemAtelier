using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneProductRepository
{
    Task<IReadOnlyList<GemstoneProduct>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneProduct?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<GemstoneProduct?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        GemstoneProduct product,
        CancellationToken cancellationToken = default);

    Task<bool> SlugExistsAsync(
        string slug,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}