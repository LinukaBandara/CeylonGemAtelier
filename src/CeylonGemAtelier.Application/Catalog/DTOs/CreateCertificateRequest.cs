namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record CreateCertificateRequest(
    Guid GemstoneItemId,
    Guid LaboratoryId,
    string CertificateNumber,
    DateTime IssueDate,
    string? ReportType,
    decimal? CertifiedCaratWeight,
    string? TreatmentStatement,
    string? ReportUrl);
