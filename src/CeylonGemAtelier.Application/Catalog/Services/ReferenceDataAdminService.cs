using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class ReferenceDataAdminService
{
    private readonly IGemstoneTypeRepository _gemstoneTypeRepository;
    private readonly IShapeRepository _shapeRepository;
    private readonly ITreatmentRepository _treatmentRepository;
    private readonly IOriginRepository _originRepository;
    private readonly ILaboratoryRepository _laboratoryRepository;

    public ReferenceDataAdminService(
        IGemstoneTypeRepository gemstoneTypeRepository,
        IShapeRepository shapeRepository,
        ITreatmentRepository treatmentRepository,
        IOriginRepository originRepository,
        ILaboratoryRepository laboratoryRepository)
    {
        _gemstoneTypeRepository = gemstoneTypeRepository;
        _shapeRepository = shapeRepository;
        _treatmentRepository = treatmentRepository;
        _originRepository = originRepository;
        _laboratoryRepository = laboratoryRepository;
    }

    public async Task<IReadOnlyList<GemstoneTypeDto>> GetGemstoneTypesAsync(
        CancellationToken cancellationToken = default)
    {
        var types = await _gemstoneTypeRepository
            .GetAllIncludingInactiveAsync(cancellationToken);

        return types.Select(MapGemstoneType).ToList();
    }

    public async Task<GemstoneTypeDto> CreateGemstoneTypeAsync(
        SaveGemstoneTypeRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var gemstoneType = new GemstoneType(
            request.Name,
            request.Description);

        await _gemstoneTypeRepository.AddAsync(
            gemstoneType,
            cancellationToken);

        await _gemstoneTypeRepository.SaveChangesAsync(
            cancellationToken);

        return MapGemstoneType(gemstoneType);
    }

    public async Task<GemstoneTypeDto> UpdateGemstoneTypeAsync(
        Guid id,
        SaveGemstoneTypeRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var gemstoneType = await GetGemstoneTypeEntity(
            id,
            cancellationToken);

        gemstoneType.Update(request.Name, request.Description);

        await _gemstoneTypeRepository.SaveChangesAsync(
            cancellationToken);

        return MapGemstoneType(gemstoneType);
    }

    public async Task<GemstoneTypeDto> SetGemstoneTypeActiveAsync(
        Guid id,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        var gemstoneType = await GetGemstoneTypeEntity(
            id,
            cancellationToken);

        if (isActive)
        {
            gemstoneType.Activate();
        }
        else
        {
            gemstoneType.Deactivate();
        }

        await _gemstoneTypeRepository.SaveChangesAsync(
            cancellationToken);

        return MapGemstoneType(gemstoneType);
    }

    public async Task<IReadOnlyList<ShapeDto>> GetShapesAsync(
        CancellationToken cancellationToken = default)
    {
        var shapes = await _shapeRepository
            .GetAllIncludingInactiveAsync(cancellationToken);

        return shapes.Select(MapShape).ToList();
    }

    public async Task<ShapeDto> CreateShapeAsync(
        SaveShapeRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var shape = new Shape(request.Name, request.Description);

        await _shapeRepository.AddAsync(shape, cancellationToken);
        await _shapeRepository.SaveChangesAsync(cancellationToken);

        return MapShape(shape);
    }

    public async Task<ShapeDto> UpdateShapeAsync(
        Guid id,
        SaveShapeRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var shape = await GetShapeEntity(id, cancellationToken);

        shape.Update(request.Name, request.Description);

        await _shapeRepository.SaveChangesAsync(cancellationToken);

        return MapShape(shape);
    }

    public async Task<ShapeDto> SetShapeActiveAsync(
        Guid id,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        var shape = await GetShapeEntity(id, cancellationToken);

        if (isActive)
        {
            shape.Activate();
        }
        else
        {
            shape.Deactivate();
        }

        await _shapeRepository.SaveChangesAsync(cancellationToken);

        return MapShape(shape);
    }

    public async Task<IReadOnlyList<TreatmentDto>> GetTreatmentsAsync(
        CancellationToken cancellationToken = default)
    {
        var treatments = await _treatmentRepository
            .GetAllIncludingInactiveAsync(cancellationToken);

        return treatments.Select(MapTreatment).ToList();
    }

    public async Task<TreatmentDto> CreateTreatmentAsync(
        SaveTreatmentRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var treatment = new Treatment(
            request.Name,
            request.Description,
            request.SortOrder);

        await _treatmentRepository.AddAsync(
            treatment,
            cancellationToken);

        await _treatmentRepository.SaveChangesAsync(
            cancellationToken);

        return MapTreatment(treatment);
    }

    public async Task<TreatmentDto> UpdateTreatmentAsync(
        Guid id,
        SaveTreatmentRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var treatment = await GetTreatmentEntity(
            id,
            cancellationToken);

        treatment.Update(
            request.Name,
            request.Description,
            request.SortOrder);

        await _treatmentRepository.SaveChangesAsync(
            cancellationToken);

        return MapTreatment(treatment);
    }

    public async Task<TreatmentDto> SetTreatmentActiveAsync(
        Guid id,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        var treatment = await GetTreatmentEntity(
            id,
            cancellationToken);

        if (isActive)
        {
            treatment.Activate();
        }
        else
        {
            treatment.Deactivate();
        }

        await _treatmentRepository.SaveChangesAsync(
            cancellationToken);

        return MapTreatment(treatment);
    }

    public async Task<IReadOnlyList<OriginDto>> GetOriginsAsync(
        CancellationToken cancellationToken = default)
    {
        var origins = await _originRepository
            .GetAllIncludingInactiveAsync(cancellationToken);

        return origins.Select(MapOrigin).ToList();
    }

    public async Task<OriginDto> CreateOriginAsync(
        SaveOriginRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var origin = new Origin(
            request.Country,
            request.Region,
            request.Mine,
            request.Description);

        await _originRepository.AddAsync(origin, cancellationToken);
        await _originRepository.SaveChangesAsync(cancellationToken);

        return MapOrigin(origin);
    }

    public async Task<OriginDto> UpdateOriginAsync(
        Guid id,
        SaveOriginRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var origin = await GetOriginEntity(id, cancellationToken);

        origin.Update(
            request.Country,
            request.Region,
            request.Mine,
            request.Description);

        await _originRepository.SaveChangesAsync(cancellationToken);

        return MapOrigin(origin);
    }

    public async Task<OriginDto> SetOriginActiveAsync(
        Guid id,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        var origin = await GetOriginEntity(id, cancellationToken);

        if (isActive)
        {
            origin.Activate();
        }
        else
        {
            origin.Deactivate();
        }

        await _originRepository.SaveChangesAsync(cancellationToken);

        return MapOrigin(origin);
    }

    public async Task<IReadOnlyList<LaboratoryDto>> GetLaboratoriesAsync(
        CancellationToken cancellationToken = default)
    {
        var laboratories = await _laboratoryRepository
            .GetAllIncludingInactiveAsync(cancellationToken);

        return laboratories.Select(MapLaboratory).ToList();
    }

    public async Task<LaboratoryDto> CreateLaboratoryAsync(
        SaveLaboratoryRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var laboratory = new Laboratory(
            request.Name,
            request.ShortCode,
            request.Website,
            request.Description);

        await _laboratoryRepository.AddAsync(
            laboratory,
            cancellationToken);

        await _laboratoryRepository.SaveChangesAsync(
            cancellationToken);

        return MapLaboratory(laboratory);
    }

    public async Task<LaboratoryDto> UpdateLaboratoryAsync(
        Guid id,
        SaveLaboratoryRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var laboratory = await GetLaboratoryEntity(
            id,
            cancellationToken);

        laboratory.Update(
            request.Name,
            request.ShortCode,
            request.Website,
            request.Description);

        await _laboratoryRepository.SaveChangesAsync(
            cancellationToken);

        return MapLaboratory(laboratory);
    }

    public async Task<LaboratoryDto> SetLaboratoryActiveAsync(
        Guid id,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        var laboratory = await GetLaboratoryEntity(
            id,
            cancellationToken);

        if (isActive)
        {
            laboratory.Activate();
        }
        else
        {
            laboratory.Deactivate();
        }

        await _laboratoryRepository.SaveChangesAsync(
            cancellationToken);

        return MapLaboratory(laboratory);
    }

    private async Task<GemstoneType> GetGemstoneTypeEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var gemstoneType = await _gemstoneTypeRepository.GetByIdAsync(
            id,
            cancellationToken);

        return gemstoneType
            ?? throw new KeyNotFoundException(
                "Gemstone type was not found.");
    }

    private async Task<Shape> GetShapeEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var shape = await _shapeRepository.GetByIdAsync(
            id,
            cancellationToken);

        return shape
            ?? throw new KeyNotFoundException(
                "Shape was not found.");
    }

    private async Task<Treatment> GetTreatmentEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var treatment = await _treatmentRepository.GetByIdAsync(
            id,
            cancellationToken);

        return treatment
            ?? throw new KeyNotFoundException(
                "Treatment was not found.");
    }

    private async Task<Origin> GetOriginEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var origin = await _originRepository.GetByIdAsync(
            id,
            cancellationToken);

        return origin
            ?? throw new KeyNotFoundException(
                "Origin was not found.");
    }

    private async Task<Laboratory> GetLaboratoryEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var laboratory = await _laboratoryRepository.GetByIdAsync(
            id,
            cancellationToken);

        return laboratory
            ?? throw new KeyNotFoundException(
                "Laboratory was not found.");
    }

    private static GemstoneTypeDto MapGemstoneType(GemstoneType x)
        => new(x.Id, x.Name, x.Description, x.IsActive);

    private static ShapeDto MapShape(Shape x)
        => new(x.Id, x.Name, x.Description, x.IsActive);

    private static TreatmentDto MapTreatment(Treatment x)
        => new(x.Id, x.Name, x.Description, x.SortOrder, x.IsActive);

    private static OriginDto MapOrigin(Origin x)
        => new(x.Id, x.Country, x.Region, x.Mine, x.Description, x.IsActive);

    private static LaboratoryDto MapLaboratory(Laboratory x)
        => new(x.Id, x.Name, x.ShortCode, x.Website, x.Description, x.IsActive);
}
