using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneProductRepository
{
    Task<IReadOnlyList<GemstoneProduct>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneProduct?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default);
}
