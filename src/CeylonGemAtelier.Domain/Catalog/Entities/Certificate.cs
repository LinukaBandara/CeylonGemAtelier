using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class Certificate : BaseEntity
{
    public Guid GemstoneItemId { get; private set; }

    public Guid LaboratoryId { get; private set; }

    public string CertificateNumber { get; private set; }

    public DateTime IssueDate { get; private set; }

    public string? ReportType { get; private set; }

    public decimal? CertifiedCaratWeight { get; private set; }

    public string? TreatmentStatement { get; private set; }

    public string? ReportUrl { get; private set; }

    public bool IsVerified { get; private set; }

    private Certificate()
    {
        CertificateNumber = string.Empty;
    }

    public Certificate(
        Guid gemstoneItemId,
        Guid laboratoryId,
        string certificateNumber,
        DateTime issueDate,
        string? reportType = null,
        decimal? certifiedCaratWeight = null,
        string? treatmentStatement = null,
        string? reportUrl = null)
    {
        if (gemstoneItemId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone item is required.",
                nameof(gemstoneItemId));
        }

        if (laboratoryId == Guid.Empty)
        {
            throw new ArgumentException(
                "Laboratory is required.",
                nameof(laboratoryId));
        }

        if (string.IsNullOrWhiteSpace(certificateNumber))
        {
            throw new ArgumentException(
                "Certificate number is required.",
                nameof(certificateNumber));
        }

        if (certifiedCaratWeight is <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(certifiedCaratWeight),
                "Certified carat weight must be greater than zero.");
        }

        GemstoneItemId = gemstoneItemId;
        LaboratoryId = laboratoryId;
        CertificateNumber = certificateNumber.Trim().ToUpperInvariant();
        IssueDate = issueDate;
        ReportType = reportType?.Trim();
        CertifiedCaratWeight = certifiedCaratWeight;
        TreatmentStatement = treatmentStatement?.Trim();
        ReportUrl = reportUrl?.Trim();
        IsVerified = false;
    }

    public void Verify()
    {
        IsVerified = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Unverify()
    {
        IsVerified = false;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateReport(
        string certificateNumber,
        DateTime issueDate,
        string? reportType,
        decimal? certifiedCaratWeight,
        string? treatmentStatement,
        string? reportUrl)
    {
        if (string.IsNullOrWhiteSpace(certificateNumber))
        {
            throw new ArgumentException(
                "Certificate number is required.",
                nameof(certificateNumber));
        }

        if (certifiedCaratWeight is <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(certifiedCaratWeight),
                "Certified carat weight must be greater than zero.");
        }

        CertificateNumber = certificateNumber.Trim().ToUpperInvariant();
        IssueDate = issueDate;
        ReportType = reportType?.Trim();
        CertifiedCaratWeight = certifiedCaratWeight;
        TreatmentStatement = treatmentStatement?.Trim();
        ReportUrl = reportUrl?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }
}
