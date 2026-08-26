using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ISaleRepository
{
    Task<IReadOnlyList<Sale>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<Sale?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<int> CountAsync(
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Sale sale,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
