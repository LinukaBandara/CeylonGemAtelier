using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ITreatmentRepository
{
    Task<IReadOnlyList<Treatment>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Treatment>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default);

    Task<Treatment?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Treatment treatment,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
