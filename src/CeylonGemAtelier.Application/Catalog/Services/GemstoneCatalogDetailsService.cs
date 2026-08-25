using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneCatalogDetailsService
{
    private readonly IGemstoneProductRepository _productRepository;
    private readonly IShapeRepository _shapeRepository;
    private readonly ITreatmentRepository _treatmentRepository;
    private readonly IOriginRepository _originRepository;
    private readonly IGemstoneTypeRepository _typeRepository;
    private readonly IGemstoneMediaRepository _mediaRepository;
    private readonly ICertificateRepository _certificateRepository;

    public GemstoneCatalogDetailsService(
        IGemstoneProductRepository productRepository,
        IShapeRepository shapeRepository,
        ITreatmentRepository treatmentRepository,
        IOriginRepository originRepository,
        IGemstoneTypeRepository typeRepository,
        IGemstoneMediaRepository mediaRepository,
        ICertificateRepository certificateRepository)
    {
        _productRepository = productRepository;
        _shapeRepository = shapeRepository;
        _treatmentRepository = treatmentRepository;
        _originRepository = originRepository;
        _typeRepository = typeRepository;
        _mediaRepository = mediaRepository;
        _certificateRepository = certificateRepository;
    }

    public async Task<CatalogGemstoneProductDto?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        var product = await _productRepository.GetBySlugAsync(
            slug.Trim().ToLowerInvariant(),
            cancellationToken);

        if (product is null)
        {
            return null;
        }

        var shapes = await _shapeRepository.GetAllAsync(cancellationToken);
        var treatments = await _treatmentRepository.GetAllAsync(cancellationToken);
        var origins = await _originRepository.GetAllAsync(cancellationToken);
        var types = await _typeRepository.GetAllAsync(cancellationToken);

        var shapeMap = shapes.ToDictionary(x => x.Id);
        var treatmentMap = treatments.ToDictionary(x => x.Id);
        var originMap = origins.ToDictionary(x => x.Id);
        var typeMap = types.ToDictionary(x => x.Id);

        var itemDtos = new List<CatalogGemstoneItemDto>();

        foreach (var item in product.Items)
        {
            var media = await _mediaRepository.GetByItemIdAsync(
                item.Id,
                cancellationToken);

            var certificates = await _certificateRepository.GetByItemIdAsync(
                item.Id,
                cancellationToken);

            var itemDto = new GemstoneItemDto(
                item.Id,
                item.StockNumber,
                item.CaratWeight,
                item.ShapeId,
                item.Color,
                item.Clarity,
                item.TreatmentId,
                item.OriginId,
                item.LengthMm,
                item.WidthMm,
                item.DepthMm,
                item.SellingPrice?.Amount,
                item.SellingPrice?.Currency,
                item.Status.ToString());

            var shape = shapeMap.TryGetValue(
                item.ShapeId,
                out var shapeEntity)
                ? new CatalogReferenceDto(
                    shapeEntity.Id,
                    shapeEntity.Name,
                    shapeEntity.Description)
                : null;

            var treatment = treatmentMap.TryGetValue(
                item.TreatmentId,
                out var treatmentEntity)
                ? new CatalogReferenceDto(
                    treatmentEntity.Id,
                    treatmentEntity.Name,
                    treatmentEntity.Description)
                : null;

            var origin = item.OriginId.HasValue &&
                         originMap.TryGetValue(
                             item.OriginId.Value,
                             out var originEntity)
                ? new CatalogOriginDto(
                    originEntity.Id,
                    originEntity.Country,
                    originEntity.Region,
                    originEntity.Mine,
                    originEntity.Description)
                : null;

            itemDtos.Add(
                new CatalogGemstoneItemDto(
                    itemDto,
                    shape,
                    treatment,
                    origin,
                    media
                        .Select(x => new GemstoneMediaDto(
                            x.Id,
                            x.GemstoneItemId,
                            x.Type,
                            x.Url,
                            x.AltText,
                            x.SortOrder,
                            x.IsPrimary))
                        .ToList(),
                    certificates
                        .Select(x => new CertificateDto(
                            x.Id,
                            x.GemstoneItemId,
                            x.LaboratoryId,
                            x.CertificateNumber,
                            x.IssueDate,
                            x.ReportType,
                            x.CertifiedCaratWeight,
                            x.TreatmentStatement,
                            x.ReportUrl,
                            x.IsVerified))
                        .ToList()));
        }

        var gemstoneType = typeMap.TryGetValue(
            product.GemstoneTypeId,
            out var typeEntity)
            ? new CatalogReferenceDto(
                typeEntity.Id,
                typeEntity.Name,
                typeEntity.Description)
            : null;

        return new CatalogGemstoneProductDto(
            product.Id,
            product.Name,
            product.Slug,
            gemstoneType,
            product.Description,
            product.IsPublished,
            itemDtos);
    }
}
