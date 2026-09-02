using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.UnitTests.Catalog;

/// <summary>
/// Comprehensive tests for error handling and edge cases in gemstone operations.
/// </summary>
public class GemstoneErrorHandlingTests
{
    #region GemstoneItem Validation

    [Fact]
    public void GemstoneItem_Create_RequiresProductId()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new GemstoneItem(
                Guid.Empty,
                "STOCK-001",
                2.5m,
                Guid.NewGuid(),
                Guid.NewGuid()));

        Assert.Contains("product", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void GemstoneItem_Create_RequiresStockNumber()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new GemstoneItem(
                Guid.NewGuid(),
                string.Empty,
                2.5m,
                Guid.NewGuid(),
                Guid.NewGuid()));

        Assert.Contains("Stock number", exception.Message);
    }

    [Fact]
    public void GemstoneItem_Create_RequiresPositiveCaratWeight()
    {
        var exception = Assert.Throws<ArgumentOutOfRangeException>(() =>
            new GemstoneItem(
                Guid.NewGuid(),
                "STOCK-001",
                0m,
                Guid.NewGuid(),
                Guid.NewGuid()));

        Assert.Contains("Carat weight", exception.Message);
    }

    [Fact]
    public void GemstoneItem_Create_RequiresShapeId()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new GemstoneItem(
                Guid.NewGuid(),
                "STOCK-001",
                2.5m,
                Guid.Empty,
                Guid.NewGuid()));

        Assert.Contains("Shape", exception.Message);
    }

    [Fact]
    public void GemstoneItem_Create_RequiresTreatmentId()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new GemstoneItem(
                Guid.NewGuid(),
                "STOCK-001",
                2.5m,
                Guid.NewGuid(),
                Guid.Empty));

        Assert.Contains("Treatment", exception.Message);
    }

    #endregion

    #region Reservation Validation

    [Fact]
    public void Reservation_Create_RequiresItemId()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new Reservation(
                Guid.Empty,
                "John Doe",
                "john@example.com"));

        Assert.Contains("item", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Reservation_Create_RequiresCustomerName()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new Reservation(
                Guid.NewGuid(),
                string.Empty,
                "john@example.com"));

        Assert.Contains("name", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Reservation_Create_RequiresCustomerEmail()
    {
        var exception = Assert.Throws<ArgumentException>(() =>
            new Reservation(
                Guid.NewGuid(),
                "John Doe",
                string.Empty));

        Assert.Contains("email", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Reservation_Create_TrimsWhitespace()
    {
        var reservation = new Reservation(
            Guid.NewGuid(),
            "  John Doe  ",
            "  john@example.com  ",
            "  555-1234  ");

        Assert.Equal("John Doe", reservation.CustomerName);
        Assert.Equal("john@example.com", reservation.CustomerEmail);
        Assert.Equal("555-1234", reservation.CustomerPhone);
    }

    #endregion

    #region Complex Scenarios

    [Fact]
    public void GemstoneItem_CannotTransitionThroughInvalidStates()
    {
        var item = CreateGemstoneItem();
        
        // Should not be able to go from Available to Sold to Reserved
        item.MarkAsSold();
        var exception = Assert.Throws<InvalidOperationException>(() => item.Reserve());
        Assert.Contains("Available", exception.Message);
    }

    [Fact]
    public void GemstoneItem_SetPrice_UpdatesSellingPrice()
    {
        var item = CreateGemstoneItem();
        
        // Update with valid price should work
        item.SetSellingPrice(new Money(2000m, "USD"));
        Assert.Equal(2000m, item.SellingPrice?.Amount);
        Assert.Equal("USD", item.SellingPrice?.Currency);
    }

    [Fact]
    public void Reservation_MultipleStatusTransitions_TrackChanges()
    {
        var reservation = CreateReservation();
        var createdAt = reservation.CreatedAt;
        
        System.Threading.Thread.Sleep(10); // Ensure time difference
        reservation.Confirm();
        var confirmedAt = reservation.UpdatedAt;
        
        System.Threading.Thread.Sleep(10);
        reservation.Complete();
        var completedAt = reservation.UpdatedAt;

        Assert.Equal(ReservationStatus.Completed, reservation.Status);
        Assert.True(createdAt < confirmedAt);
        Assert.True(confirmedAt < completedAt);
    }

    #endregion

    #region Test Helpers

    private GemstoneItem CreateGemstoneItem()
    {
        return new GemstoneItem(
            Guid.NewGuid(),
            "STOCK-TEST",
            2.5m,
            Guid.NewGuid(),
            Guid.NewGuid(),
            color: "Blue",
            clarity: "VS1",
            sellingPrice: new Money(1500m, "USD"));
    }

    private Reservation CreateReservation()
    {
        return new Reservation(
            Guid.NewGuid(),
            "Test Customer",
            "test@example.com");
    }

    #endregion
}
