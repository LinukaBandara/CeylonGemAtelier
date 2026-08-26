namespace CeylonGemAtelier.Application.Catalog.DTOs;

public sealed record DashboardSummaryDto(
    int TotalItems,
    int AvailableItems,
    int ReservedItems,
    int SoldItems,
    int UnavailableItems,
    decimal TotalValueAmount,
    string TotalValueCurrency,
    int TotalProducts,
    int PublishedProducts,
    int TotalCertificates,
    int UnverifiedCertificates,
    int ItemsMissingMedia,
    int PendingReservations,
    int TotalSales,
    IReadOnlyList<DashboardActivityDto> RecentActivity);

public sealed record DashboardActivityDto(
    string Type,
    string Description,
    DateTime OccurredAt);
