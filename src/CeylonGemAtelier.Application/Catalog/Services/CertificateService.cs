using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class CertificateService
{
    private readonly ICertificateRepository _repository;

    public CertificateService(
        ICertificateRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<CertificateDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var certificates = await _repository.GetAllAsync(
            cancellationToken);

        return certificates.Select(Map).ToList();
    }

    public async Task<IReadOnlyList<CertificateDto>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default)
    {
        var certificates = await _repository.GetByItemIdAsync(
            gemstoneItemId,
            cancellationToken);

        return certificates.Select(Map).ToList();
    }

    public async Task<CertificateDto> CreateAsync(
        CreateCertificateRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var certificate = new Certificate(
            request.GemstoneItemId,
            request.LaboratoryId,
            request.CertificateNumber,
            request.IssueDate,
            request.ReportType,
            request.CertifiedCaratWeight,
            request.TreatmentStatement,
            request.ReportUrl);

        await _repository.AddAsync(
            certificate,
            cancellationToken);

        await _repository.SaveChangesAsync(
            cancellationToken);

        return Map(certificate);
    }

    public async Task<CertificateDto> UpdateAsync(
        Guid id,
        UpdateCertificateRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var certificate = await GetEntity(
            id,
            cancellationToken);

        certificate.UpdateReport(
            request.CertificateNumber,
            request.IssueDate,
            request.ReportType,
            request.CertifiedCaratWeight,
            request.TreatmentStatement,
            request.ReportUrl);

        await _repository.SaveChangesAsync(
            cancellationToken);

        return Map(certificate);
    }

    public async Task<CertificateDto> VerifyAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var certificate = await GetEntity(
            id,
            cancellationToken);

        certificate.Verify();

        await _repository.SaveChangesAsync(
            cancellationToken);

        return Map(certificate);
    }

    public async Task<CertificateDto> UnverifyAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var certificate = await GetEntity(
            id,
            cancellationToken);

        certificate.Unverify();

        await _repository.SaveChangesAsync(
            cancellationToken);

        return Map(certificate);
    }

    private async Task<Certificate> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var certificate = await _repository.GetByIdAsync(
            id,
            cancellationToken);

        if (certificate is null)
        {
            throw new KeyNotFoundException(
                "Certificate was not found.");
        }

        return certificate;
    }

    private static CertificateDto Map(
        Certificate certificate)
    {
        return new CertificateDto(
            certificate.Id,
            certificate.GemstoneItemId,
            certificate.LaboratoryId,
            certificate.CertificateNumber,
            certificate.IssueDate,
            certificate.ReportType,
            certificate.CertifiedCaratWeight,
            certificate.TreatmentStatement,
            certificate.ReportUrl,
            certificate.IsVerified);
    }
}
