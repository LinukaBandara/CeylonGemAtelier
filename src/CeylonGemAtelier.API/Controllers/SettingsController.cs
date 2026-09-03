using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Authorize(Roles = "Admin,Manager")]
[Route("api/settings")]
public sealed class SettingsController : ControllerBase
{
    private readonly AtelierSettingsService _service;

    public SettingsController(AtelierSettingsService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        CancellationToken cancellationToken)
    {
        return Ok(await _service.GetAsync(cancellationToken));
    }

    [HttpPut]
    public async Task<IActionResult> Update(
        [FromBody] UpdateAtelierSettingsRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.UpdateAsync(
                request,
                cancellationToken));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

