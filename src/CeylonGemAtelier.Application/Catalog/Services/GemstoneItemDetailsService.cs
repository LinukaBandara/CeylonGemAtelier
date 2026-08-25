using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneItemDetailsService
{
    private readonly IGemstoneItemRepository _itemRepository;
    private readonly IGemstoneMediaRepository _mediaRepository;
    private readonly ICertificateRepository _certificateRepository;

    public GemstoneItemDetailsService(
        IGemstoneItemRepository itemRepository,
        IGemstoneMediaRepository mediaRepository,
        ICertificateRepository certificateRepository)
    {
        _itemRepository = itemRepository;
        _mediaRepository = mediaRepository;
        _certificateRepository = certificateRepository;
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
