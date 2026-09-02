using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneItemService
{
    private readonly IGemstoneItemRepository _itemRepository;
    private readonly IGemstoneProductRepository _productRepository;
    private readonly IShapeRepository _shapeRepository;
    private readonly ITreatmentRepository _treatmentRepository;
    private readonly IOriginRepository _originRepository;

    public GemstoneItemService(
        IGemstoneItemRepository itemRepository,
        IGemstoneProductRepository productRepository,
        IShapeRepository shapeRepository,
        ITreatmentRepository treatmentRepository,
        IOriginRepository originRepository)
    {
        _itemRepository = itemRepository;
        _productRepository = productRepository;
        _shapeRepository = shapeRepository;
        _treatmentRepository = treatmentRepository;
        _originRepository = originRepository;
    }

    public async Task<IReadOnlyList<GemstoneItemDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var items = await _itemRepository.GetAllAsync(cancellationToken);

        return items.Select(Map).ToList();
    }

    public async Task<GemstoneItemDto?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await _itemRepository.GetByIdAsync(
            id,
            cancellationToken);

        return item is null ? null : Map(item);
    }

    public async Task<GemstoneItemDto> CreateAsync(
        CreateGemstoneItemRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        ValidateRequest(
            request.StockNumber,
            request.CaratWeight,
            request.LengthMm,
            request.WidthMm,
            request.DepthMm,
            request.AcquisitionAmount,
            request.SellingAmount);

        var stockNumber = NormalizeStockNumber(request.StockNumber);

        if (await _itemRepository.StockNumberExistsAsync(
                stockNumber,
                cancellationToken))
        {
            throw new InvalidOperationException(
                "A gemstone with this stock number already exists.");
        }

        await ValidateReferences(
            request.GemstoneProductId,
            request.ShapeId,
            request.TreatmentId,
            request.OriginId,
            cancellationToken);

        Money? acquisitionCost = null;

        if (request.AcquisitionAmount.HasValue)
        {
            acquisitionCost = new Money(
                request.AcquisitionAmount.Value,
                NormalizeCurrency(request.AcquisitionCurrency));
        }

        Money? sellingPrice = null;

        if (request.SellingAmount.HasValue)
        {
            sellingPrice = new Money(
                request.SellingAmount.Value,
                NormalizeCurrency(request.SellingCurrency));
        }

        var item = new GemstoneItem(
            request.GemstoneProductId,
            stockNumber,
            request.CaratWeight,
            request.ShapeId,
            request.TreatmentId,
            request.OriginId,
            NormalizeOptionalText(request.Color),
            NormalizeOptionalText(request.Clarity),
            request.LengthMm,
            request.WidthMm,
            request.DepthMm,
            acquisitionCost,
            sellingPrice);

        await _itemRepository.AddAsync(
            item,
            cancellationToken);

        await _itemRepository.SaveChangesAsync(
            cancellationToken);

        return Map(item);
    }

    public async Task<GemstoneItemDto> UpdateAsync(
        Guid id,
        UpdateGemstoneItemRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        ValidateRequest(
            request.CaratWeight,
            request.LengthMm,
            request.WidthMm,
            request.DepthMm,
            request.SellingPriceAmount);

        var item = await _itemRepository.GetByIdAsync(
            id,
            cancellationToken);

        if (item is null)
        {
            throw new KeyNotFoundException(
                "Gemstone item was not found.");
        }

        await ValidateReferences(
            item.GemstoneProductId,
            request.ShapeId,
            request.TreatmentId,
            request.OriginId,
            cancellationToken);

        item.UpdateDetails(
            request.CaratWeight,
            request.ShapeId,
            request.TreatmentId,
            request.OriginId,
            NormalizeOptionalText(request.Color),
            NormalizeOptionalText(request.Clarity),
            request.LengthMm,
            request.WidthMm,
            request.DepthMm);

        if (request.SellingPriceAmount.HasValue)
        {
            item.SetSellingPrice(
                new Money(
                    request.SellingPriceAmount.Value,
                    NormalizeCurrency(request.SellingPriceCurrency)));
        }

        await _itemRepository.SaveChangesAsync(
            cancellationToken);

        return Map(item);
    }

    public async Task<GemstoneItemDto> ReserveAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await GetEntity(id, cancellationToken);

        item.Reserve();

        await _itemRepository.SaveChangesAsync(cancellationToken);

        return Map(item);
    }

    public async Task<GemstoneItemDto> ReleaseAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await GetEntity(id, cancellationToken);

        item.ReleaseReservation();

        await _itemRepository.SaveChangesAsync(cancellationToken);

        return Map(item);
    }

    public async Task<GemstoneItemDto> SellAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await GetEntity(id, cancellationToken);

        item.MarkAsSold();

        await _itemRepository.SaveChangesAsync(cancellationToken);

        return Map(item);
    }

    public async Task<GemstoneItemDto> UnavailableAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await GetEntity(id, cancellationToken);

        item.MarkAsUnavailable();

        await _itemRepository.SaveChangesAsync(cancellationToken);

        return Map(item);
    }

    private async Task ValidateReferences(
        Guid productId,
        Guid shapeId,
        Guid treatmentId,
        Guid? originId,
        CancellationToken cancellationToken)
    {
        var products = await _productRepository.GetAllAsync(
            cancellationToken);

        if (!products.Any(x => x.Id == productId))
        {
            throw new ArgumentException(
                "The specified gemstone product does not exist.");
        }

        var shapes = await _shapeRepository.GetAllAsync(
            cancellationToken);

        if (!shapes.Any(x => x.Id == shapeId && x.IsActive))
        {
            throw new ArgumentException(
                "The specified shape does not exist or is inactive.");
        }

        var treatments = await _treatmentRepository.GetAllAsync(
            cancellationToken);

        if (!treatments.Any(x => x.Id == treatmentId && x.IsActive))
        {
            throw new ArgumentException(
                "The specified treatment does not exist or is inactive.");
        }

        if (originId.HasValue)
        {
            var origins = await _originRepository.GetAllAsync(
                cancellationToken);

            if (!origins.Any(x =>
                    x.Id == originId.Value &&
                    x.IsActive))
            {
                throw new ArgumentException(
                    "The specified origin does not exist or is inactive.");
            }
        }
    }

    private static void ValidateRequest(
        string? stockNumber,
        decimal caratWeight,
        decimal? lengthMm,
        decimal? widthMm,
        decimal? depthMm,
        decimal? acquisitionAmount = null,
        decimal? sellingAmount = null)
    {
        if (string.IsNullOrWhiteSpace(stockNumber))
        {
            throw new ArgumentException(
                "Stock number is required.",
                nameof(stockNumber));
        }

        if (NormalizeStockNumber(stockNumber).Length > 100)
        {
            throw new ArgumentException(
                "Stock number cannot exceed 100 characters.",
                nameof(stockNumber));
        }

        ValidateNumericValue(
            caratWeight,
            "Carat weight must be greater than zero.",
            nameof(caratWeight));

        ValidateMeasurement(lengthMm, nameof(lengthMm));
        ValidateMeasurement(widthMm, nameof(widthMm));
        ValidateMeasurement(depthMm, nameof(depthMm));

        ValidatePrice(
            acquisitionAmount,
            nameof(acquisitionAmount));

        ValidatePrice(
            sellingAmount,
            nameof(sellingAmount));
    }

    private static void ValidateRequest(
        decimal caratWeight,
        decimal? lengthMm,
        decimal? widthMm,
        decimal? depthMm,
        decimal? sellingPriceAmount)
    {
        ValidateNumericValue(
            caratWeight,
            "Carat weight must be greater than zero.",
            nameof(caratWeight));

        ValidateMeasurement(lengthMm, nameof(lengthMm));
        ValidateMeasurement(widthMm, nameof(widthMm));
        ValidateMeasurement(depthMm, nameof(depthMm));

        ValidatePrice(
            sellingPriceAmount,
            nameof(sellingPriceAmount));
    }

    private static void ValidateNumericValue(
        decimal value,
        string message,
        string parameterName)
    {
        if (value <= 0)
        {
            throw new ArgumentOutOfRangeException(
                parameterName,
                message);
        }
    }

    private static void ValidateMeasurement(
        decimal? value,
        string parameterName)
    {
        if (value is <= 0)
        {
            throw new ArgumentOutOfRangeException(
                parameterName,
                "Measurement must be greater than zero.");
        }
    }

    private static void ValidatePrice(
        decimal? value,
        string parameterName)
    {
        if (value is < 0)
        {
            throw new ArgumentOutOfRangeException(
                parameterName,
                "Price cannot be negative.");
        }
    }

    private static string NormalizeStockNumber(string stockNumber)
    {
        return stockNumber.Trim().ToUpperInvariant();
    }

    private static string? NormalizeOptionalText(string? value)
    {
        return string.IsNullOrWhiteSpace(value)
            ? null
            : value.Trim();
    }

    private static string NormalizeCurrency(string? currency)
    {
        var normalized = string.IsNullOrWhiteSpace(currency)
            ? "USD"
            : currency.Trim().ToUpperInvariant();

        if (normalized.Length != 3)
        {
            throw new ArgumentException(
                "Currency must be a valid three-letter currency code.");
        }

        return normalized;
    }

    private async Task<GemstoneItem> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var item = await _itemRepository.GetByIdAsync(
            id,
            cancellationToken);

        if (item is null)
        {
            throw new KeyNotFoundException(
                "Gemstone item was not found.");
        }

        return item;
    }

    public async Task<IReadOnlyList<GemstoneItemEnrichedDto>> GetAllEnrichedAsync(
        CancellationToken cancellationToken = default)
    {
        var items = await _itemRepository.GetAllAsync(cancellationToken);
        var enriched = new List<GemstoneItemEnrichedDto>();

        foreach (var item in items)
        {
            var dto = await MapEnrichedAsync(item, cancellationToken);
            enriched.Add(dto);
        }

        return enriched;
    }

    public async Task<GemstoneItemEnrichedDto?> GetByIdEnrichedAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var item = await _itemRepository.GetByIdAsync(
            id,
            cancellationToken);

        return item is null ? null : await MapEnrichedAsync(item, cancellationToken);
    }

    private async Task<GemstoneItemEnrichedDto> MapEnrichedAsync(
        GemstoneItem item,
        CancellationToken cancellationToken)
    {
        // Load reference names
        var shape = await _shapeRepository.GetByIdAsync(item.ShapeId, cancellationToken);
        var treatment = await _treatmentRepository.GetByIdAsync(item.TreatmentId, cancellationToken);
        var product = await _productRepository.GetByIdAsync(item.GemstoneProductId, cancellationToken);
        var origin = item.OriginId.HasValue
            ? await _originRepository.GetByIdAsync(item.OriginId.Value, cancellationToken)
            : null;

        return new GemstoneItemEnrichedDto(
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
    }

    private static GemstoneItemDto Map(GemstoneItem item)
    {
        return new GemstoneItemDto(
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
    }
}
