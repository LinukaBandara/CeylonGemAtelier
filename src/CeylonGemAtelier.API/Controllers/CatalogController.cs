using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController : ControllerBase
{
    private readonly IGemstoneCatalogService _catalogService;
private readonly GemstoneCatalogDetailsService _catalogDetailsService;

    public CatalogController(
        IGemstoneCatalogService catalogService,
        GemstoneCatalogDetailsService catalogDetailsService)
    {
        _catalogService = catalogService;
        _catalogDetailsService = catalogDetailsService;
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


    [HttpGet("products/{slug}/details")]
    public async Task<IActionResult> GetProductDetails(
        string slug,
        CancellationToken cancellationToken)
    {
        var product = await _catalogDetailsService.GetBySlugAsync(
            slug,
            cancellationToken);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }
    [HttpPost("products")]
    public async Task<IActionResult> CreateProduct(
        [FromBody] CreateGemstoneProductRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var product = await _catalogService.CreateProductAsync(
                request,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetProduct),
                new { slug = product.Slug },
                product);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new
            {
                message = ex.Message
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}