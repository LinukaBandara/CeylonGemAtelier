namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record UpdateCertificateRequest(
    string CertificateNumber,
    DateTime IssueDate,
    string? ReportType,
    decimal? CertifiedCaratWeight,
    string? TreatmentStatement,
    string? ReportUrl);
