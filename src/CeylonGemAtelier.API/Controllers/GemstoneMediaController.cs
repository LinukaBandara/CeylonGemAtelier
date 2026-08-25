using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/items/{gemstoneItemId:guid}/media")]
public sealed class GemstoneMediaController : ControllerBase
{
    private readonly GemstoneMediaService _service;

    public GemstoneMediaController(GemstoneMediaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetByItem(
        Guid gemstoneItemId,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.GetByItemIdAsync(
            gemstoneItemId,
            cancellationToken));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        Guid gemstoneItemId,
        [FromBody] CreateGemstoneMediaRequest request,
        CancellationToken cancellationToken)
    {
        var correctedRequest = request with
        {
            GemstoneItemId = gemstoneItemId
        };

        var media = await _service.CreateAsync(
            correctedRequest,
            cancellationToken);

        return Ok(media);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid gemstoneItemId,
        Guid id,
        [FromBody] UpdateGemstoneMediaRequest request,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.UpdateAsync(
            id,
            request,
            cancellationToken));
    }

    [HttpPost("{id:guid}/primary")]
    public async Task<IActionResult> SetPrimary(
        Guid gemstoneItemId,
        Guid id,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.SetPrimaryAsync(
            id,
            cancellationToken));
    }

    [HttpDelete("{id:guid}/primary")]
    public async Task<IActionResult> RemovePrimary(
        Guid gemstoneItemId,
        Guid id,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.RemovePrimaryAsync(
            id,
            cancellationToken));
    }
}
