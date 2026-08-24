using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class ReferenceDataService
{
    private readonly IGemstoneVarietyRepository _varieties;
    private readonly IShapeRepository _shapes;
    private readonly ITreatmentRepository _treatments;
    private readonly IOriginRepository _origins;
    private readonly ILaboratoryRepository _laboratories;

    public ReferenceDataService(
        IGemstoneVarietyRepository varieties,
        IShapeRepository shapes,
        ITreatmentRepository treatments,
        IOriginRepository origins,
        ILaboratoryRepository laboratories)
    {
        _varieties = varieties;
        _shapes = shapes;
        _treatments = treatments;
        _origins = origins;
        _laboratories = laboratories;
    }

    public async Task<IReadOnlyList<GemstoneVarietyDto>> GetVarietiesAsync(
        CancellationToken cancellationToken = default)
    {
        var data = await _varieties.GetAllAsync(cancellationToken);

        return data.Select(x => new GemstoneVarietyDto(
            x.Id, x.GemstoneTypeId, x.Name, x.Description, x.IsActive)).ToList();
    }

    public async Task<IReadOnlyList<ShapeDto>> GetShapesAsync(
        CancellationToken cancellationToken = default)
    {
        var data = await _shapes.GetAllAsync(cancellationToken);

        return data.Select(x => new ShapeDto(
            x.Id, x.Name, x.Description, x.IsActive)).ToList();
    }

    public async Task<IReadOnlyList<TreatmentDto>> GetTreatmentsAsync(
        CancellationToken cancellationToken = default)
    {
        var data = await _treatments.GetAllAsync(cancellationToken);

        return data.Select(x => new TreatmentDto(
            x.Id, x.Name, x.Description, x.SortOrder, x.IsActive)).ToList();
    }

    public async Task<IReadOnlyList<OriginDto>> GetOriginsAsync(
        CancellationToken cancellationToken = default)
    {
        var data = await _origins.GetAllAsync(cancellationToken);

        return data.Select(x => new OriginDto(
            x.Id, x.Country, x.Region, x.Mine, x.Description, x.IsActive)).ToList();
    }

    public async Task<IReadOnlyList<LaboratoryDto>> GetLaboratoriesAsync(
        CancellationToken cancellationToken = default)
    {
        var data = await _laboratories.GetAllAsync(cancellationToken);

        return data.Select(x => new LaboratoryDto(
            x.Id, x.Name, x.ShortCode, x.Website, x.Description, x.IsActive)).ToList();
    }
}
