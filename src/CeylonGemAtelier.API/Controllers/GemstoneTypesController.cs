using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/gemstone-types")]
public sealed class GemstoneTypesController : ControllerBase
{
    private readonly GemstoneTypeService _service;

    public GemstoneTypesController(GemstoneTypeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<GemstoneTypeDto>>> GetAll(
        CancellationToken cancellationToken)
    {
        var types = await _service.GetAllAsync(cancellationToken);

        return Ok(types);
    }
}
