using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneTypeService
{
    private readonly IGemstoneTypeRepository _repository;

    public GemstoneTypeService(IGemstoneTypeRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<GemstoneTypeDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var types = await _repository.GetAllAsync(cancellationToken);

        return types
            .Select(x => new GemstoneTypeDto(
                x.Id,
                x.Name,
                x.Description,
                x.IsActive))
            .ToList();
    }
}
