using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class DashboardService
{
    private const string DefaultCurrency = "USD";
    private const int RecentActivityLimit = 8;

    private readonly IGemstoneProductRepository _productRepository;
    private readonly IGemstoneItemRepository _itemRepository;
    private readonly ICertificateRepository _certificateRepository;
    private readonly IGemstoneMediaRepository _mediaRepository;
    private readonly IReservationRepository _reservationRepository;
    private readonly ISaleRepository _saleRepository;

    public DashboardService(
        IGemstoneProductRepository productRepository,
        IGemstoneItemRepository itemRepository,
        ICertificateRepository certificateRepository,
        IGemstoneMediaRepository mediaRepository,
        IReservationRepository reservationRepository,
        ISaleRepository saleRepository)
    {
        _productRepository = productRepository;
        _itemRepository = itemRepository;
        _certificateRepository = certificateRepository;
        _mediaRepository = mediaRepository;
        _reservationRepository = reservationRepository;
        _saleRepository = saleRepository;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync(
        CancellationToken cancellationToken = default)
    {
        var products = await _productRepository.GetAllAsync(
            cancellationToken);

        var items = await _itemRepository.GetAllAsync(
            cancellationToken);

        var certificates = await _certificateRepository.GetAllAsync(
            cancellationToken);

        var media = await _mediaRepository.GetAllAsync(
            cancellationToken);

        var reservations = await _reservationRepository.GetAllAsync(
            cancellationToken);

        var sales = await _saleRepository.GetAllAsync(
            cancellationToken);

        var itemsWithMedia = media
            .Select(x => x.GemstoneItemId)
            .ToHashSet();

        var totalValue = items
            .Where(x => x.Status != GemstoneItemStatus.Sold)
            .Sum(x => x.SellingPrice?.Amount ?? 0);

        var currency = items
            .Select(x => x.SellingPrice?.Currency)
            .FirstOrDefault(x => x is not null)
            ?? DefaultCurrency;

        var stockNumbers = items.ToDictionary(
            x => x.Id,
            x => x.StockNumber);

        var activity = new List<DashboardActivityDto>();

        activity.AddRange(items.Select(x => new DashboardActivityDto(
            "gemstone",
            $"Gemstone {x.StockNumber} added",
            x.CreatedAt)));

        activity.AddRange(reservations.Select(x => new DashboardActivityDto(
            "reservation",
            $"Reservation by {x.CustomerName}"
                + $" for {stockNumbers.GetValueOrDefault(x.GemstoneItemId, "unknown stone")}"
                + $" ({x.Status})",
            x.UpdatedAt ?? x.CreatedAt)));

        activity.AddRange(sales.Select(x => new DashboardActivityDto(
            "sale",
            $"Sale {x.SaleNumber} to {x.BuyerName}"
                + $" — {x.Price.Amount:N0} {x.Price.Currency}",
            x.CreatedAt)));

        activity.AddRange(certificates.Select(x => new DashboardActivityDto(
            "certificate",
            $"Certificate {x.CertificateNumber} recorded",
            x.CreatedAt)));

        return new DashboardSummaryDto(
            items.Count,
            items.Count(x => x.Status == GemstoneItemStatus.Available),
            items.Count(x => x.Status == GemstoneItemStatus.Reserved),
            items.Count(x => x.Status == GemstoneItemStatus.Sold),
            items.Count(x => x.Status == GemstoneItemStatus.Unavailable),
            totalValue,
            currency,
            products.Count,
            products.Count(x => x.IsPublished),
            certificates.Count,
            certificates.Count(x => !x.IsVerified),
            items.Count(x => !itemsWithMedia.Contains(x.Id)),
            reservations.Count(x => x.Status == ReservationStatus.Pending),
            sales.Count,
            activity
                .OrderByDescending(x => x.OccurredAt)
                .Take(RecentActivityLimit)
                .ToList());
    }
}
