using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneItemDetailsService
{
    private readonly IGemstoneItemRepository _itemRepository;
    private readonly IGemstoneMediaRepository _mediaRepository;
    private readonly ICertificateRepository _certificateRepository;
    private readonly IShapeRepository _shapeRepository;
    private readonly ITreatmentRepository _treatmentRepository;
    private readonly IGemstoneProductRepository _productRepository;
    private readonly IOriginRepository _originRepository;

    public GemstoneItemDetailsService(
        IGemstoneItemRepository itemRepository,
        IGemstoneMediaRepository mediaRepository,
        ICertificateRepository certificateRepository,
        IShapeRepository shapeRepository,
        ITreatmentRepository treatmentRepository,
        IGemstoneProductRepository productRepository,
        IOriginRepository originRepository)
    {
        _itemRepository = itemRepository;
        _mediaRepository = mediaRepository;
        _certificateRepository = certificateRepository;
        _shapeRepository = shapeRepository;
        _treatmentRepository = treatmentRepository;
        _productRepository = productRepository;
        _originRepository = originRepository;
    }

    public async Task<GemstoneItemDetailsDto?> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default)
    {
        var item = await _itemRepository.GetByIdAsync(
            gemstoneItemId,
            cancellationToken);

        if (item is null)
        {
            return null;
        }

        var media = await _mediaRepository.GetByItemIdAsync(
            gemstoneItemId,
            cancellationToken);

        var certificates = await _certificateRepository.GetByItemIdAsync(
            gemstoneItemId,
            cancellationToken);

        // Enrich item with reference data
        var shape = await _shapeRepository.GetByIdAsync(item.ShapeId, cancellationToken);
        var treatment = await _treatmentRepository.GetByIdAsync(item.TreatmentId, cancellationToken);
        var product = await _productRepository.GetByIdAsync(item.GemstoneProductId, cancellationToken);
        var origin = item.OriginId.HasValue
            ? await _originRepository.GetByIdAsync(item.OriginId.Value, cancellationToken)
            : null;

        var itemDto = new GemstoneItemEnrichedDto(
            item.Id,
            item.StockNumber,
            item.CaratWeight,
            item.ShapeId,
            shape?.Name,
            item.Color,
            item.Clarity,
            item.TreatmentId,
            treatment?.Name,
            item.OriginId,
            origin?.Country,
            item.LengthMm,
            item.WidthMm,
            item.DepthMm,
            item.SellingPrice?.Amount,
            item.SellingPrice?.Currency,
            item.Status.ToString(),
            item.GemstoneProductId,
            product?.Name);

        var mediaDtos = media
            .Select(x => new GemstoneMediaDto(
                x.Id,
                x.GemstoneItemId,
                x.Type,
                x.Url,
                x.AltText,
                x.SortOrder,
                x.IsPrimary))
            .ToList();

        var certificateDtos = certificates
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
            .ToList();

        return new GemstoneItemDetailsDto(
            itemDto,
            mediaDtos,
            certificateDtos);
    }
}
