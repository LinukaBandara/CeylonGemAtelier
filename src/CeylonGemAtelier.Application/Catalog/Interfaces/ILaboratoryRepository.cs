using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ILaboratoryRepository
{
    Task<IReadOnlyList<Laboratory>> GetAllAsync(
        CancellationToken cancellationToken = default);
}
