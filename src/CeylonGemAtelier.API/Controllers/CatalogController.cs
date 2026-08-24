using CeylonGemAtelier.Application.Catalog.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController : ControllerBase
{
    private readonly IGemstoneCatalogService _catalogService;

    public CatalogController(
        IGemstoneCatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts(
        CancellationToken cancellationToken)
    {
        var products = await _catalogService.GetProductsAsync(
            cancellationToken);

        return Ok(products);
    }

    [HttpGet("products/{slug}")]
    public async Task<IActionResult> GetProduct(
        string slug,
        CancellationToken cancellationToken)
    {
        var product = await _catalogService.GetProductBySlugAsync(
            slug,
            cancellationToken);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }
}
