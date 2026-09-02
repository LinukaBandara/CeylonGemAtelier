using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/reservations")]
public sealed class ReservationsController : ControllerBase
{
    private readonly ReservationService _service;

    public ReservationsController(ReservationService service)
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
        [FromBody] CreateReservationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var reservation = await _service.CreateAsync(
                request,
                cancellationToken);

            return Created(
                $"/api/reservations/{reservation.Id}",
                reservation);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id:guid}/confirm")]
    public async Task<IActionResult> Confirm(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.ConfirmAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/reject")]
    public async Task<IActionResult> Reject(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.RejectAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.CancelAsync(id, cancellationToken));
    }

    [HttpPost("{id:guid}/complete")]
    public async Task<IActionResult> Complete(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.CompleteAsync(id, cancellationToken));
    }

    [HttpPut("{id:guid}/notes")]
    public async Task<IActionResult> UpdateNotes(
        Guid id,
        [FromBody] UpdateReservationNotesRequest request,
        CancellationToken cancellationToken)
    {
        return await Execute(
            () => _service.UpdateNotesAsync(id, request, cancellationToken));
    }

    private static async Task<IActionResult> Execute(
        Func<Task<ReservationDto>> action)
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
