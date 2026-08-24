using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneVarietyRepository
{
    Task<IReadOnlyList<GemstoneVariety>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
