using CeylonGemAtelier.Domain.Common;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class GemstoneItem : BaseEntity
{
    public Guid GemstoneProductId { get; private set; }

    public string StockNumber { get; private set; }

    public decimal CaratWeight { get; private set; }

    public Guid ShapeId { get; private set; }

    public string? Color { get; private set; }

    public string? Clarity { get; private set; }

    public Guid TreatmentId { get; private set; }

    public Guid? OriginId { get; private set; }

    public decimal? LengthMm { get; private set; }

    public decimal? WidthMm { get; private set; }

    public decimal? DepthMm { get; private set; }

    public Money? AcquisitionCost { get; private set; }

    public Money? SellingPrice { get; private set; }

    public GemstoneItemStatus Status { get; private set; }

    private GemstoneItem()
    {
        StockNumber = string.Empty;
    }

    public GemstoneItem(
        Guid gemstoneProductId,
        string stockNumber,
        decimal caratWeight,
        Guid shapeId,
        Guid treatmentId,
        Guid? originId = null,
        string? color = null,
        string? clarity = null,
        decimal? lengthMm = null,
        decimal? widthMm = null,
        decimal? depthMm = null,
        Money? acquisitionCost = null,
        Money? sellingPrice = null)
    {
        if (gemstoneProductId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone product is required.",
                nameof(gemstoneProductId));
        }

        if (string.IsNullOrWhiteSpace(stockNumber))
        {
            throw new ArgumentException(
                "Stock number is required.",
                nameof(stockNumber));
        }

        if (caratWeight <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(caratWeight),
                "Carat weight must be greater than zero.");
        }

        if (shapeId == Guid.Empty)
        {
            throw new ArgumentException(
                "Shape is required.",
                nameof(shapeId));
        }

        if (treatmentId == Guid.Empty)
        {
            throw new ArgumentException(
                "Treatment is required.",
                nameof(treatmentId));
        }

        ValidateMeasurement(lengthMm, nameof(lengthMm));
        ValidateMeasurement(widthMm, nameof(widthMm));
        ValidateMeasurement(depthMm, nameof(depthMm));

        GemstoneProductId = gemstoneProductId;
        StockNumber = stockNumber.Trim().ToUpperInvariant();
        CaratWeight = caratWeight;
        ShapeId = shapeId;
        TreatmentId = treatmentId;
        OriginId = originId;
        Color = color?.Trim();
        Clarity = clarity?.Trim();
        LengthMm = lengthMm;
        WidthMm = widthMm;
        DepthMm = depthMm;
        AcquisitionCost = acquisitionCost;
        SellingPrice = sellingPrice;
        Status = GemstoneItemStatus.Available;
    }

    public void UpdateDetails(
        decimal caratWeight,
        Guid shapeId,
        Guid treatmentId,
        Guid? originId,
        string? color,
        string? clarity,
        decimal? lengthMm,
        decimal? widthMm,
        decimal? depthMm)
    {
        if (caratWeight <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(caratWeight),
                "Carat weight must be greater than zero.");
        }

        if (shapeId == Guid.Empty)
        {
            throw new ArgumentException(
                "Shape is required.",
                nameof(shapeId));
        }

        if (treatmentId == Guid.Empty)
        {
            throw new ArgumentException(
                "Treatment is required.",
                nameof(treatmentId));
        }

        ValidateMeasurement(lengthMm, nameof(lengthMm));
        ValidateMeasurement(widthMm, nameof(widthMm));
        ValidateMeasurement(depthMm, nameof(depthMm));

        CaratWeight = caratWeight;
        ShapeId = shapeId;
        TreatmentId = treatmentId;
        OriginId = originId;
        Color = color?.Trim();
        Clarity = clarity?.Trim();
        LengthMm = lengthMm;
        WidthMm = widthMm;
        DepthMm = depthMm;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetAcquisitionCost(Money cost)
    {
        AcquisitionCost = cost
            ?? throw new ArgumentNullException(nameof(cost));

        UpdatedAt = DateTime.UtcNow;
    }

    public void SetSellingPrice(Money price)
    {
        SellingPrice = price
            ?? throw new ArgumentNullException(nameof(price));

        UpdatedAt = DateTime.UtcNow;
    }

    public void Reserve()
    {
        EnsureStatus(GemstoneItemStatus.Available);

        Status = GemstoneItemStatus.Reserved;
        UpdatedAt = DateTime.UtcNow;
    }

    public void ReleaseReservation()
    {
        EnsureStatus(GemstoneItemStatus.Reserved);

        Status = GemstoneItemStatus.Available;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkAsSold()
    {
        EnsureStatus(GemstoneItemStatus.Available);

        Status = GemstoneItemStatus.Sold;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkAsUnavailable()
    {
        if (Status == GemstoneItemStatus.Sold)
        {
            throw new InvalidOperationException(
                "A sold gemstone cannot be marked unavailable.");
        }

        Status = GemstoneItemStatus.Unavailable;
        UpdatedAt = DateTime.UtcNow;
    }

    private void EnsureStatus(GemstoneItemStatus expectedStatus)
    {
        if (Status != expectedStatus)
        {
            throw new InvalidOperationException(
                $"Gemstone must be {expectedStatus}.");
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
}

public enum GemstoneItemStatus
{
    Available = 1,
    Reserved = 2,
    Sold = 3,
    Unavailable = 4,
    Archived = 5
}
