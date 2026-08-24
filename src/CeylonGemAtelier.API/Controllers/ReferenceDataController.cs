using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/reference")]
public sealed class ReferenceDataController : ControllerBase
{
    private readonly ReferenceDataService _service;

    public ReferenceDataController(ReferenceDataService service)
    {
        _service = service;
    }

    [HttpGet("varieties")]
    public async Task<ActionResult<IReadOnlyList<GemstoneVarietyDto>>> GetVarieties(
        CancellationToken cancellationToken)
        => Ok(await _service.GetVarietiesAsync(cancellationToken));

    [HttpGet("shapes")]
    public async Task<ActionResult<IReadOnlyList<ShapeDto>>> GetShapes(
        CancellationToken cancellationToken)
        => Ok(await _service.GetShapesAsync(cancellationToken));

    [HttpGet("treatments")]
    public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatments(
        CancellationToken cancellationToken)
        => Ok(await _service.GetTreatmentsAsync(cancellationToken));

    [HttpGet("origins")]
    public async Task<ActionResult<IReadOnlyList<OriginDto>>> GetOrigins(
        CancellationToken cancellationToken)
        => Ok(await _service.GetOriginsAsync(cancellationToken));

    [HttpGet("laboratories")]
    public async Task<ActionResult<IReadOnlyList<LaboratoryDto>>> GetLaboratories(
        CancellationToken cancellationToken)
        => Ok(await _service.GetLaboratoriesAsync(cancellationToken));
}
