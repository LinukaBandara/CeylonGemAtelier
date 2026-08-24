using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneCatalogService : IGemstoneCatalogService
{
    private readonly IGemstoneProductRepository _repository;

    public GemstoneCatalogService(
        IGemstoneProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<GemstoneProductDto>> GetProductsAsync(
        CancellationToken cancellationToken = default)
    {
        var products = await _repository.GetAllAsync(cancellationToken);

        return products
            .Select(MapProduct)
            .ToList();
    }

    public async Task<GemstoneProductDto?> GetProductBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        var product = await _repository.GetBySlugAsync(
            slug.Trim().ToLowerInvariant(),
            cancellationToken);

        return product is null ? null : MapProduct(product);
    }

    private static GemstoneProductDto MapProduct(
        GemstoneProduct product)
    {
        return new GemstoneProductDto(
            product.Id,
            product.Name,
            product.Slug,
            product.GemstoneTypeId,
            product.GemstoneVarietyId,
            product.Description,
            product.IsPublished,
            product.Items
                .Select(MapItem)
                .ToList());
    }

    private static GemstoneItemDto MapItem(
        GemstoneItem item)
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
