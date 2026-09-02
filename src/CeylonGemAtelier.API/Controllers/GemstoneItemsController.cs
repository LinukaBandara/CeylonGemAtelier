using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/items")]
public sealed class GemstoneItemsController : ControllerBase
{
    private readonly GemstoneItemService _service;
    private readonly GemstoneItemDetailsService _detailsService;

    public GemstoneItemsController(GemstoneItemService service, GemstoneItemDetailsService detailsService)
    {
        _service = service;
        _detailsService = detailsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        CancellationToken cancellationToken)
    {
        return Ok(await _service.GetAllEnrichedAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var item = await _service.GetByIdAsync(
            id,
            cancellationToken);

        return item is null
            ? NotFound(new { message = "Gemstone item was not found." })
            : Ok(item);
    }

    [HttpGet("{id:guid}/details")]
    public async Task<IActionResult> GetDetails(
        Guid id,
        CancellationToken cancellationToken)
    {
        var details = await _detailsService.GetByItemIdAsync(
            id,
            cancellationToken);

        return details is null
            ? NotFound(new { message = "Gemstone item was not found." })
            : Ok(details);
    }
    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Create(
        [FromBody] CreateGemstoneItemRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var item = await _service.CreateAsync(
                request,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetById),
                new { id = item.Id },
                item);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UpdateGemstoneItemRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.UpdateAsync(
                id,
                request,
                cancellationToken));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id:guid}/reserve")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Reserve(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await ExecuteStatusChange(
            () => _service.ReserveAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/release")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Release(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await ExecuteStatusChange(
            () => _service.ReleaseAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/sell")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Sell(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await ExecuteStatusChange(
            () => _service.SellAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/unavailable")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Unavailable(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await ExecuteStatusChange(
            () => _service.UnavailableAsync(id, cancellationToken));
    }

    private static async Task<IActionResult> ExecuteStatusChange(
        Func<Task<GemstoneItemDto>> action)
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
    }
}
