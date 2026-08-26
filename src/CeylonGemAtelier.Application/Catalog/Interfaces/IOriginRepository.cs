using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IOriginRepository
{
    Task<IReadOnlyList<Origin>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Origin>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default);

    Task<Origin?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Origin origin,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
