using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneTypeRepository
{
    Task<IReadOnlyList<GemstoneType>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
