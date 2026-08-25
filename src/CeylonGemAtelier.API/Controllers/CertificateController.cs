using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/catalog/items/{gemstoneItemId:guid}/certificates")]
public sealed class CertificateController : ControllerBase
{
    private readonly CertificateService _service;

    public CertificateController(CertificateService service)
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
        [FromBody] CreateCertificateRequest request,
        CancellationToken cancellationToken)
    {
        var correctedRequest = request with
        {
            GemstoneItemId = gemstoneItemId
        };

        var certificate = await _service.CreateAsync(
            correctedRequest,
            cancellationToken);

        return Ok(certificate);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid gemstoneItemId,
        Guid id,
        [FromBody] UpdateCertificateRequest request,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.UpdateAsync(
            id,
            request,
            cancellationToken));
    }

    [HttpPost("{id:guid}/verify")]
    public async Task<IActionResult> Verify(
        Guid gemstoneItemId,
        Guid id,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.VerifyAsync(
            id,
            cancellationToken));
    }

    [HttpPost("{id:guid}/unverify")]
    public async Task<IActionResult> Unverify(
        Guid gemstoneItemId,
        Guid id,
        CancellationToken cancellationToken)
    {
        return Ok(await _service.UnverifyAsync(
            id,
            cancellationToken));
    }
}
