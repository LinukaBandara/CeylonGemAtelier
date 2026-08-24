using CeylonGemAtelier.Application.Catalog.DTOs;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface IGemstoneCatalogService
{
    Task<IReadOnlyList<GemstoneProductDto>> GetProductsAsync(
        CancellationToken cancellationToken = default);

    Task<GemstoneProductDto?> GetProductBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default);
}
