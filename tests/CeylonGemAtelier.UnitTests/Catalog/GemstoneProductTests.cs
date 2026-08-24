using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.UnitTests.Catalog;

public class GemstoneProductTests
{
    [Fact]
    public void Create_WithValidData_CreatesUnpublishedProduct()
    {
        var typeId = Guid.NewGuid();

        var product = new GemstoneProduct(
            "Ceylon Blue Sapphire",
            "ceylon-blue-sapphire",
            typeId);

        Assert.NotEqual(Guid.Empty, product.Id);
        Assert.Equal("Ceylon Blue Sapphire", product.Name);
        Assert.Equal("ceylon-blue-sapphire", product.Slug);
        Assert.Equal(typeId, product.GemstoneTypeId);
        Assert.False(product.IsPublished);
        Assert.Empty(product.Items);
    }

    [Fact]
    public void Publish_MakesProductPublished()
    {
        var product = CreateProduct();

        product.Publish();

        Assert.True(product.IsPublished);
    }

    [Fact]
    public void AddItem_AddsItemToProduct()
    {
        var product = CreateProduct();

        var item = CreateItem(product);

        product.AddItem(item);

        Assert.Single(product.Items);
        Assert.Equal(item.Id, product.Items.First().Id);
    }

    [Fact]
    public void AddItem_WithDifferentProduct_ThrowsException()
    {
        var product = CreateProduct();
        var otherProduct = CreateProduct();
        var item = CreateItem(otherProduct);

        Assert.Throws<InvalidOperationException>(
            () => product.AddItem(item));
    }

    [Fact]
    public void AddItem_WithDuplicateStockNumber_ThrowsException()
    {
        var product = CreateProduct();

        var first = CreateItem(product);
        var second = CreateItem(product, first.StockNumber);

        product.AddItem(first);

        Assert.Throws<InvalidOperationException>(
            () => product.AddItem(second));
    }

    [Fact]
    public void RemoveItem_RemovesExistingItem()
    {
        var product = CreateProduct();
        var item = CreateItem(product);

        product.AddItem(item);
        product.RemoveItem(item.Id);

        Assert.Empty(product.Items);
    }

    private static GemstoneProduct CreateProduct()
    {
        return new GemstoneProduct(
            "Ceylon Blue Sapphire",
            "ceylon-blue-sapphire",
            Guid.NewGuid());
    }

    private static GemstoneItem CreateItem(
        GemstoneProduct product,
        string? stockNumber = null)
    {
        return new GemstoneItem(
            product.Id,
            stockNumber ?? $"CGA-{Guid.NewGuid():N}"[..12],
            2.50m,
            Guid.NewGuid(),
            Guid.NewGuid(),
            color: "Royal Blue",
            clarity: "Eye Clean",
            acquisitionCost: new Money(5000m, "USD"),
            sellingPrice: new Money(8500m, "USD"));
    }
}
