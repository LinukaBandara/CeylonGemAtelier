using CeylonGemAtelier.Domain.Common;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class Sale : BaseEntity
{
    public Guid GemstoneItemId { get; private set; }

    public string SaleNumber { get; private set; }

    public string BuyerName { get; private set; }

    public string? BuyerEmail { get; private set; }

    public Money Price { get; private set; }

    public DateTime SaleDate { get; private set; }

    public SalePaymentStatus PaymentStatus { get; private set; }

    public string? Notes { get; private set; }

    private Sale()
    {
        SaleNumber = string.Empty;
        BuyerName = string.Empty;
        Price = null!;
    }

    public Sale(
        Guid gemstoneItemId,
        string saleNumber,
        string buyerName,
        Money price,
        DateTime saleDate,
        string? buyerEmail = null,
        string? notes = null)
    {
        if (gemstoneItemId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone item is required.",
                nameof(gemstoneItemId));
        }

        if (string.IsNullOrWhiteSpace(saleNumber))
        {
            throw new ArgumentException(
                "Sale number is required.",
                nameof(saleNumber));
        }

        if (string.IsNullOrWhiteSpace(buyerName))
        {
            throw new ArgumentException(
                "Buyer name is required.",
                nameof(buyerName));
        }

        GemstoneItemId = gemstoneItemId;
        SaleNumber = saleNumber.Trim().ToUpperInvariant();
        BuyerName = buyerName.Trim();
        BuyerEmail = buyerEmail?.Trim();
        Price = price
            ?? throw new ArgumentNullException(nameof(price));
        SaleDate = saleDate;
        PaymentStatus = SalePaymentStatus.Pending;
        Notes = notes?.Trim();
    }

    public void MarkPaid()
    {
        PaymentStatus = SalePaymentStatus.Paid;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkPending()
    {
        PaymentStatus = SalePaymentStatus.Pending;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkRefunded()
    {
        PaymentStatus = SalePaymentStatus.Refunded;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateNotes(string? notes)
    {
        Notes = notes?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }
}

public enum SalePaymentStatus
{
    Pending = 1,
    Paid = 2,
    Refunded = 3
}
