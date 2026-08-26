using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ILaboratoryRepository
{
    Task<IReadOnlyList<Laboratory>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Laboratory>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default);

    Task<Laboratory?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Laboratory laboratory,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
