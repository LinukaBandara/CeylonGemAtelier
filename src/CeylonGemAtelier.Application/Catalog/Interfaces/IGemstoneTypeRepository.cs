using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneTypeRepository
{
    Task<IReadOnlyList<GemstoneType>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<GemstoneType>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneType?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        GemstoneType gemstoneType,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
