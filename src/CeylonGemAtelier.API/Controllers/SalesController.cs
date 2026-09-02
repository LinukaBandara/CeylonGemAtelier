using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/sales")]
public sealed class SalesController : ControllerBase
{
    private readonly SaleService _service;

    public SalesController(SaleService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        CancellationToken cancellationToken)
    {
        return Ok(await _service.GetAllAsync(cancellationToken));
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateSaleRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var sale = await _service.CreateAsync(
                request,
                cancellationToken);

            return Created($"/api/sales/{sale.Id}", sale);
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

    [HttpPost("{id:guid}/mark-paid")]
    public async Task<IActionResult> MarkPaid(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.MarkPaidAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/mark-pending")]
    public async Task<IActionResult> MarkPending(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.MarkPendingAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/mark-refunded")]
    public async Task<IActionResult> MarkRefunded(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.MarkRefundedAsync(id, cancellationToken));
    }

    private static async Task<IActionResult> Execute(
        Func<Task<SaleDto>> action)
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
