using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ITreatmentRepository
{
    Task<IReadOnlyList<Treatment>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
