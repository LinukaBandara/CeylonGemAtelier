using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IShapeRepository
{
    Task<IReadOnlyList<Shape>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Shape>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default);

    Task<Shape?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Shape shape,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
