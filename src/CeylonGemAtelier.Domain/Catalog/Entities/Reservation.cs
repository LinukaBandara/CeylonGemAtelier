using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class Reservation : BaseEntity
{
    public Guid GemstoneItemId { get; private set; }

    public string CustomerName { get; private set; }

    public string CustomerEmail { get; private set; }

    public string? CustomerPhone { get; private set; }

    public DateTime? PreferredDate { get; private set; }

    public string? Message { get; private set; }

    public string? InternalNotes { get; private set; }

    public ReservationStatus Status { get; private set; }

    private Reservation()
    {
        CustomerName = string.Empty;
        CustomerEmail = string.Empty;
    }

    public Reservation(
        Guid gemstoneItemId,
        string customerName,
        string customerEmail,
        string? customerPhone = null,
        DateTime? preferredDate = null,
        string? message = null)
    {
        if (gemstoneItemId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone item is required.",
                nameof(gemstoneItemId));
        }

        if (string.IsNullOrWhiteSpace(customerName))
        {
            throw new ArgumentException(
                "Customer name is required.",
                nameof(customerName));
        }

        if (string.IsNullOrWhiteSpace(customerEmail))
        {
            throw new ArgumentException(
                "Customer email is required.",
                nameof(customerEmail));
        }

        GemstoneItemId = gemstoneItemId;
        CustomerName = customerName.Trim();
        CustomerEmail = customerEmail.Trim();
        CustomerPhone = customerPhone?.Trim();
        PreferredDate = preferredDate;
        Message = message?.Trim();
        Status = ReservationStatus.Pending;
    }

    public void Confirm()
    {
        EnsureStatus(ReservationStatus.Pending);

        Status = ReservationStatus.Confirmed;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Reject()
    {
        EnsureStatus(ReservationStatus.Pending);

        Status = ReservationStatus.Rejected;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Cancel()
    {
        if (Status is not ReservationStatus.Pending
            and not ReservationStatus.Confirmed)
        {
            throw new InvalidOperationException(
                "Only pending or confirmed reservations can be cancelled.");
        }

        Status = ReservationStatus.Cancelled;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Complete()
    {
        EnsureStatus(ReservationStatus.Confirmed);

        Status = ReservationStatus.Completed;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateInternalNotes(string? internalNotes)
    {
        InternalNotes = internalNotes?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    private void EnsureStatus(ReservationStatus expectedStatus)
    {
        if (Status != expectedStatus)
        {
            throw new InvalidOperationException(
                $"Reservation must be {expectedStatus}.");
        }
    }
}

public enum ReservationStatus
{
    Pending = 1,
    Confirmed = 2,
    Completed = 3,
    Cancelled = 4,
    Rejected = 5
}
