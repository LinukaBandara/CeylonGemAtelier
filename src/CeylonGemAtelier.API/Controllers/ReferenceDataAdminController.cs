using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/reference/admin")]
public sealed class ReferenceDataAdminController : ControllerBase
{
    private readonly ReferenceDataAdminService _service;

    public ReferenceDataAdminController(
        ReferenceDataAdminService service)
    {
        _service = service;
    }

    [HttpGet("gemstone-types")]
    public async Task<IActionResult> GetGemstoneTypes(
        CancellationToken cancellationToken)
        => Ok(await _service.GetGemstoneTypesAsync(cancellationToken));

    [HttpPost("gemstone-types")]
    public async Task<IActionResult> CreateGemstoneType(
        [FromBody] SaveGemstoneTypeRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.CreateGemstoneTypeAsync(
            request,
            cancellationToken));

    [HttpPut("gemstone-types/{id:guid}")]
    public async Task<IActionResult> UpdateGemstoneType(
        Guid id,
        [FromBody] SaveGemstoneTypeRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.UpdateGemstoneTypeAsync(
            id,
            request,
            cancellationToken));

    [HttpPost("gemstone-types/{id:guid}/activate")]
    public async Task<IActionResult> ActivateGemstoneType(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetGemstoneTypeActiveAsync(
            id,
            true,
            cancellationToken));

    [HttpPost("gemstone-types/{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateGemstoneType(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetGemstoneTypeActiveAsync(
            id,
            false,
            cancellationToken));

    [HttpGet("shapes")]
    public async Task<IActionResult> GetShapes(
        CancellationToken cancellationToken)
        => Ok(await _service.GetShapesAsync(cancellationToken));

    [HttpPost("shapes")]
    public async Task<IActionResult> CreateShape(
        [FromBody] SaveShapeRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.CreateShapeAsync(
            request,
            cancellationToken));

    [HttpPut("shapes/{id:guid}")]
    public async Task<IActionResult> UpdateShape(
        Guid id,
        [FromBody] SaveShapeRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.UpdateShapeAsync(
            id,
            request,
            cancellationToken));

    [HttpPost("shapes/{id:guid}/activate")]
    public async Task<IActionResult> ActivateShape(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetShapeActiveAsync(
            id,
            true,
            cancellationToken));

    [HttpPost("shapes/{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateShape(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetShapeActiveAsync(
            id,
            false,
            cancellationToken));

    [HttpGet("treatments")]
    public async Task<IActionResult> GetTreatments(
        CancellationToken cancellationToken)
        => Ok(await _service.GetTreatmentsAsync(cancellationToken));

    [HttpPost("treatments")]
    public async Task<IActionResult> CreateTreatment(
        [FromBody] SaveTreatmentRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.CreateTreatmentAsync(
            request,
            cancellationToken));

    [HttpPut("treatments/{id:guid}")]
    public async Task<IActionResult> UpdateTreatment(
        Guid id,
        [FromBody] SaveTreatmentRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.UpdateTreatmentAsync(
            id,
            request,
            cancellationToken));

    [HttpPost("treatments/{id:guid}/activate")]
    public async Task<IActionResult> ActivateTreatment(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetTreatmentActiveAsync(
            id,
            true,
            cancellationToken));

    [HttpPost("treatments/{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateTreatment(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetTreatmentActiveAsync(
            id,
            false,
            cancellationToken));

    [HttpGet("origins")]
    public async Task<IActionResult> GetOrigins(
        CancellationToken cancellationToken)
        => Ok(await _service.GetOriginsAsync(cancellationToken));

    [HttpPost("origins")]
    public async Task<IActionResult> CreateOrigin(
        [FromBody] SaveOriginRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.CreateOriginAsync(
            request,
            cancellationToken));

    [HttpPut("origins/{id:guid}")]
    public async Task<IActionResult> UpdateOrigin(
        Guid id,
        [FromBody] SaveOriginRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.UpdateOriginAsync(
            id,
            request,
            cancellationToken));

    [HttpPost("origins/{id:guid}/activate")]
    public async Task<IActionResult> ActivateOrigin(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetOriginActiveAsync(
            id,
            true,
            cancellationToken));

    [HttpPost("origins/{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateOrigin(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetOriginActiveAsync(
            id,
            false,
            cancellationToken));

    [HttpGet("laboratories")]
    public async Task<IActionResult> GetLaboratories(
        CancellationToken cancellationToken)
        => Ok(await _service.GetLaboratoriesAsync(cancellationToken));

    [HttpPost("laboratories")]
    public async Task<IActionResult> CreateLaboratory(
        [FromBody] SaveLaboratoryRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.CreateLaboratoryAsync(
            request,
            cancellationToken));

    [HttpPut("laboratories/{id:guid}")]
    public async Task<IActionResult> UpdateLaboratory(
        Guid id,
        [FromBody] SaveLaboratoryRequest request,
        CancellationToken cancellationToken)
        => await Execute(() => _service.UpdateLaboratoryAsync(
            id,
            request,
            cancellationToken));

    [HttpPost("laboratories/{id:guid}/activate")]
    public async Task<IActionResult> ActivateLaboratory(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetLaboratoryActiveAsync(
            id,
            true,
            cancellationToken));

    [HttpPost("laboratories/{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateLaboratory(
        Guid id,
        CancellationToken cancellationToken)
        => await Execute(() => _service.SetLaboratoryActiveAsync(
            id,
            false,
            cancellationToken));

    private static async Task<IActionResult> Execute<T>(
        Func<Task<T>> action)
    {
        try
        {
            return new OkObjectResult(await action());
        }
        catch (KeyNotFoundException ex)
        {
            return new NotFoundObjectResult(new
            {
                message = ex.Message
            });
        }
        catch (InvalidOperationException ex)
        {
            return new ConflictObjectResult(new
            {
                message = ex.Message
            });
        }
        catch (ArgumentException ex)
        {
            return new BadRequestObjectResult(new
            {
                message = ex.Message
            });
        }
    }
}
