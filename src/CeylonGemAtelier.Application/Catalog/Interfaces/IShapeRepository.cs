using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IShapeRepository
{
    Task<IReadOnlyList<Shape>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
