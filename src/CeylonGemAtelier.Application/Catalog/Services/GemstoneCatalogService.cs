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
        var products = await _repository.GetAllAsync(
            cancellationToken);

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

        return product is null
            ? null
            : MapProduct(product);
    }

    public async Task<GemstoneProductDto> CreateProductAsync(
        CreateGemstoneProductRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var slug = request.Slug.Trim().ToLowerInvariant();

        var existingProduct = await _repository.GetBySlugAsync(
            slug,
            cancellationToken);

        if (existingProduct is not null)
        {
            throw new InvalidOperationException(
                "A gemstone product with this slug already exists.");
        }

        var product = new GemstoneProduct(
            request.Name,
            slug,
            request.GemstoneTypeId,
            request.GemstoneVarietyId,
            request.Description);

        await _repository.AddAsync(
            product,
            cancellationToken);

        return MapProduct(product);
    }

    public async Task<GemstoneProductDto> UpdateProductAsync(
        Guid id,
        UpdateGemstoneProductRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var product = await GetEntity(id, cancellationToken);

        var slug = request.Slug.Trim().ToLowerInvariant();

        if (slug != product.Slug
            && await _repository.SlugExistsAsync(slug, cancellationToken))
        {
            throw new InvalidOperationException(
                "A gemstone product with this slug already exists.");
        }

        product.Update(
            request.Name,
            slug,
            request.GemstoneTypeId,
            request.GemstoneVarietyId,
            request.Description);

        await _repository.SaveChangesAsync(cancellationToken);

        return MapProduct(product);
    }

    public async Task<GemstoneProductDto> PublishProductAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var product = await GetEntity(id, cancellationToken);

        product.Publish();

        await _repository.SaveChangesAsync(cancellationToken);

        return MapProduct(product);
    }

    public async Task<GemstoneProductDto> UnpublishProductAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var product = await GetEntity(id, cancellationToken);

        product.Unpublish();

        await _repository.SaveChangesAsync(cancellationToken);

        return MapProduct(product);
    }

    private async Task<GemstoneProduct> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var product = await _repository.GetByIdAsync(
            id,
            cancellationToken);

        if (product is null)
        {
            throw new KeyNotFoundException(
                "Gemstone product was not found.");
        }

        return product;
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