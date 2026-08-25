using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.UnitTests;

public class GemstoneProductTests
{
    [Fact]
    public void Product_Creates_WithValidData()
    {
        var product = new GemstoneProduct(
            "Blue Sapphire",
            "blue-sapphire",
            Guid.NewGuid());

        Assert.Equal("Blue Sapphire", product.Name);
        Assert.Equal("blue-sapphire", product.Slug);
        Assert.False(product.IsPublished);
    }

    [Fact]
    public void Product_Publish_SetsPublishedTrue()
    {
        var product = new GemstoneProduct(
            "Blue Sapphire",
            "blue-sapphire",
            Guid.NewGuid());

        product.Publish();

        Assert.True(product.IsPublished);
    }

    [Fact]
    public void Product_Unpublish_SetsPublishedFalse()
    {
        var product = new GemstoneProduct(
            "Blue Sapphire",
            "blue-sapphire",
            Guid.NewGuid());

        product.Publish();
        product.Unpublish();

        Assert.False(product.IsPublished);
    }

    [Fact]
    public void GemstoneItem_Creates_WithValidData()
    {
        var productId = Guid.NewGuid();
        var shapeId = Guid.NewGuid();
        var treatmentId = Guid.NewGuid();

        var item = new GemstoneItem(
            productId,
            "CGA-0001",
            2.15m,
            shapeId,
            treatmentId);

        Assert.Equal("CGA-0001", item.StockNumber);
        Assert.Equal(2.15m, item.CaratWeight);
        Assert.Equal(GemstoneItemStatus.Available, item.Status);
    }

    [Fact]
    public void GemstoneItem_Reserve_ChangesStatus()
    {
        var item = new GemstoneItem(
            Guid.NewGuid(),
            "CGA-0002",
            1.50m,
            Guid.NewGuid(),
            Guid.NewGuid());

        item.Reserve();

        Assert.Equal(GemstoneItemStatus.Reserved, item.Status);
    }

    [Fact]
    public void GemstoneItem_MarkAsSold_ChangesStatus()
    {
        var item = new GemstoneItem(
            Guid.NewGuid(),
            "CGA-0003",
            2.00m,
            Guid.NewGuid(),
            Guid.NewGuid());

        item.MarkAsSold();

        Assert.Equal(GemstoneItemStatus.Sold, item.Status);
    }

    [Fact]
    public void Money_NormalizesCurrency()
    {
        var money = new Money(150000m, "usd");

        Assert.Equal(150000m, money.Amount);
        Assert.Equal("USD", money.Currency);
    }
}