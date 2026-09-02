using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.UnitTests.Catalog;

/// <summary>
/// Business workflow verification tests for complete gemstone lifecycle.
/// Tests status transitions, state machines, and business rule enforcement.
/// </summary>
public class GemstoneWorkflowTests
{
    #region GemstoneItem Status Transitions

    [Fact]
    public void GemstoneItem_WhenCreated_StartsAsAvailable()
    {
        var item = CreateGemstoneItem();
        Assert.Equal(GemstoneItemStatus.Available, item.Status);
    }

    [Fact]
    public void GemstoneItem_Reserve_TransitionsFromAvailableToReserved()
    {
        var item = CreateGemstoneItem();
        
        item.Reserve();
        
        Assert.Equal(GemstoneItemStatus.Reserved, item.Status);
    }

    [Fact]
    public void GemstoneItem_Reserve_FailsIfNotAvailable()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        var exception = Assert.Throws<InvalidOperationException>(() => item.Reserve());
        Assert.Contains("Available", exception.Message);
    }

    [Fact]
    public void GemstoneItem_ReleaseReservation_TransitionsFromReservedToAvailable()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        item.ReleaseReservation();
        
        Assert.Equal(GemstoneItemStatus.Available, item.Status);
    }

    [Fact]
    public void GemstoneItem_ReleaseReservation_FailsIfNotReserved()
    {
        var item = CreateGemstoneItem();
        
        var exception = Assert.Throws<InvalidOperationException>(() => item.ReleaseReservation());
        Assert.Contains("Reserved", exception.Message);
    }

    [Fact]
    public void GemstoneItem_MarkAsSold_TransitionsFromAvailableToSold()
    {
        var item = CreateGemstoneItem();
        
        item.MarkAsSold();
        
        Assert.Equal(GemstoneItemStatus.Sold, item.Status);
    }

    [Fact]
    public void GemstoneItem_MarkAsSold_FailsIfNotAvailable()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        var exception = Assert.Throws<InvalidOperationException>(() => item.MarkAsSold());
        Assert.Contains("Available", exception.Message);
    }

    [Fact]
    public void GemstoneItem_MarkAsUnavailable_SucceedsFromAvailable()
    {
        var item = CreateGemstoneItem();
        
        item.MarkAsUnavailable();
        
        Assert.Equal(GemstoneItemStatus.Unavailable, item.Status);
    }

    [Fact]
    public void GemstoneItem_MarkAsUnavailable_SucceedsFromReserved()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        item.MarkAsUnavailable();
        
        Assert.Equal(GemstoneItemStatus.Unavailable, item.Status);
    }

    [Fact]
    public void GemstoneItem_MarkAsUnavailable_FailsIfSold()
    {
        var item = CreateGemstoneItem();
        item.MarkAsSold();
        
        var exception = Assert.Throws<InvalidOperationException>(() => item.MarkAsUnavailable());
        Assert.Contains("sold", exception.Message);
    }

    [Fact]
    public void GemstoneItem_CannotSellReservedGemstone()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        var exception = Assert.Throws<InvalidOperationException>(() => item.MarkAsSold());
        Assert.Contains("Available", exception.Message);
    }

    [Fact]
    public void GemstoneItem_CanReleaseReservationBeforeSelling()
    {
        var item = CreateGemstoneItem();
        item.Reserve();
        
        item.ReleaseReservation();
        item.MarkAsSold();
        
        Assert.Equal(GemstoneItemStatus.Sold, item.Status);
    }

    #endregion

    #region Reservation Workflow

    [Fact]
    public void Reservation_WhenCreated_StartsAsPending()
    {
        var itemId = Guid.NewGuid();
        var reservation = new Reservation(itemId, "John Doe", "john@example.com");
        
        Assert.Equal(ReservationStatus.Pending, reservation.Status);
    }

    [Fact]
    public void Reservation_Confirm_TransitionsFromPendingToConfirmed()
    {
        var reservation = CreateReservation();
        
        reservation.Confirm();
        
        Assert.Equal(ReservationStatus.Confirmed, reservation.Status);
    }

    [Fact]
    public void Reservation_Confirm_FailsIfNotPending()
    {
        var reservation = CreateReservation();
        reservation.Confirm();
        
        var exception = Assert.Throws<InvalidOperationException>(() => reservation.Confirm());
        Assert.Contains("Pending", exception.Message);
    }

    [Fact]
    public void Reservation_Reject_TransitionsFromPendingToRejected()
    {
        var reservation = CreateReservation();
        
        reservation.Reject();
        
        Assert.Equal(ReservationStatus.Rejected, reservation.Status);
    }

    [Fact]
    public void Reservation_Reject_FailsIfNotPending()
    {
        var reservation = CreateReservation();
        reservation.Confirm();
        
        var exception = Assert.Throws<InvalidOperationException>(() => reservation.Reject());
        Assert.Contains("Pending", exception.Message);
    }

    [Fact]
    public void Reservation_Cancel_SucceedsFromPending()
    {
        var reservation = CreateReservation();
        
        reservation.Cancel();
        
        Assert.Equal(ReservationStatus.Cancelled, reservation.Status);
    }

    [Fact]
    public void Reservation_Cancel_SucceedsFromConfirmed()
    {
        var reservation = CreateReservation();
        reservation.Confirm();
        
        reservation.Cancel();
        
        Assert.Equal(ReservationStatus.Cancelled, reservation.Status);
    }

    [Fact]
    public void Reservation_Cancel_FailsFromRejected()
    {
        var reservation = CreateReservation();
        reservation.Reject();
        
        var exception = Assert.Throws<InvalidOperationException>(() => reservation.Cancel());
        Assert.Contains("pending or confirmed", exception.Message);
    }

    [Fact]
    public void Reservation_Complete_TransitionsFromConfirmedToCompleted()
    {
        var reservation = CreateReservation();
        reservation.Confirm();
        
        reservation.Complete();
        
        Assert.Equal(ReservationStatus.Completed, reservation.Status);
    }

    [Fact]
    public void Reservation_Complete_FailsIfNotConfirmed()
    {
        var reservation = CreateReservation();
        
        var exception = Assert.Throws<InvalidOperationException>(() => reservation.Complete());
        Assert.Contains("Confirmed", exception.Message);
    }

    [Fact]
    public void Reservation_StandardWorkflow_PendingToCompletedSucceeds()
    {
        var reservation = CreateReservation();
        
        reservation.Confirm();
        Assert.Equal(ReservationStatus.Confirmed, reservation.Status);
        
        reservation.Complete();
        Assert.Equal(ReservationStatus.Completed, reservation.Status);
    }

    #endregion

    #region GemstoneItem + Reservation Integration

    [Fact]
    public void GemstoneItem_And_Reservation_SellWorkflow()
    {
        // Given a gemstone that's reserved
        var item = CreateGemstoneItem();
        item.Reserve();
        var reservation = CreateReservation(item.Id);
        reservation.Confirm();
        
        // When we complete the sale
        item.ReleaseReservation();
        item.MarkAsSold();
        reservation.Complete();
        
        // Then both should reflect the sold state
        Assert.Equal(GemstoneItemStatus.Sold, item.Status);
        Assert.Equal(ReservationStatus.Completed, reservation.Status);
    }

    [Fact]
    public void GemstoneItem_And_Reservation_CancellationWorkflow()
    {
        // Given a reserved gemstone with confirmed reservation
        var item = CreateGemstoneItem();
        item.Reserve();
        var reservation = CreateReservation(item.Id);
        reservation.Confirm();
        
        // When we cancel the reservation
        reservation.Cancel();
        item.ReleaseReservation();
        
        // Then both should be back to available/cancelled
        Assert.Equal(GemstoneItemStatus.Available, item.Status);
        Assert.Equal(ReservationStatus.Cancelled, reservation.Status);
    }

    [Fact]
    public void GemstoneItem_ReserveReleaseAndSellWorkflow()
    {
        var item = CreateGemstoneItem();
        
        // Reserve then release
        item.Reserve();
        Assert.Equal(GemstoneItemStatus.Reserved, item.Status);
        
        item.ReleaseReservation();
        Assert.Equal(GemstoneItemStatus.Available, item.Status);
        
        // Then sell
        item.MarkAsSold();
        Assert.Equal(GemstoneItemStatus.Sold, item.Status);
    }

    #endregion

    #region Test Helpers

    private GemstoneItem CreateGemstoneItem(
        Guid? productId = null,
        Guid? shapeId = null,
        Guid? treatmentId = null)
    {
        return new GemstoneItem(
            productId ?? Guid.NewGuid(),
            "STOCK-001",
            caratWeight: 2.5m,
            shapeId ?? Guid.NewGuid(),
            treatmentId ?? Guid.NewGuid(),
            color: "Blue",
            clarity: "VS1",
            sellingPrice: new Money(1500m, "USD"));
    }

    private Reservation CreateReservation(Guid? itemId = null)
    {
        return new Reservation(
            itemId ?? Guid.NewGuid(),
            "John Doe",
            "john@example.com");
    }

    #endregion
}
