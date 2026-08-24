using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IOriginRepository
{
    Task<IReadOnlyList<Origin>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
