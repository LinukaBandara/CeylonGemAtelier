using CeylonGemAtelier.Application.Catalog.DTOs;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneCatalogService
{
    Task<IReadOnlyList<GemstoneProductDto>> GetProductsAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto?> GetProductBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto> CreateProductAsync(
        CreateGemstoneProductRequest request,
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto> UpdateProductAsync(
        Guid id,
        UpdateGemstoneProductRequest request,
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto> PublishProductAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto> UnpublishProductAsync(
        Guid id,
        CancellationToken cancellationToken = default);
}