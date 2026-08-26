using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class SaleService
{
    private const string DefaultCurrency = "USD";

    private readonly ISaleRepository _repository;
    private readonly IGemstoneItemRepository _itemRepository;

    public SaleService(
        ISaleRepository repository,
        IGemstoneItemRepository itemRepository)
    {
        _repository = repository;
        _itemRepository = itemRepository;
    }

    public async Task<IReadOnlyList<SaleDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var sales = await _repository.GetAllAsync(cancellationToken);

        var items = await _itemRepository.GetAllAsync(
            cancellationToken);

        var stockNumbers = items.ToDictionary(
            x => x.Id,
            x => x.StockNumber);

        return sales
            .Select(x => Map(
                x,
                stockNumbers.GetValueOrDefault(x.GemstoneItemId)))
            .ToList();
    }

    public async Task<SaleDto> CreateAsync(
        CreateSaleRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var item = await _itemRepository.GetByIdAsync(
            request.GemstoneItemId,
            cancellationToken);

        if (item is null)
        {
            throw new KeyNotFoundException(
                "Gemstone item was not found.");
        }

        if (item.Status == GemstoneItemStatus.Reserved)
        {
            item.ReleaseReservation();
        }

        item.MarkAsSold();

        var currency = string.IsNullOrWhiteSpace(request.PriceCurrency)
            ? DefaultCurrency
            : request.PriceCurrency;

        var count = await _repository.CountAsync(cancellationToken);

        var sale = new Sale(
            request.GemstoneItemId,
            $"CGS-{count + 1:00000}",
            request.BuyerName,
            new Money(request.PriceAmount, currency),
            request.SaleDate ?? DateTime.UtcNow,
            request.BuyerEmail,
            request.Notes);

        await _repository.AddAsync(sale, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return Map(sale, item.StockNumber);
    }

    public async Task<SaleDto> MarkPaidAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var sale = await GetEntity(id, cancellationToken);

        sale.MarkPaid();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(sale, null);
    }

    public async Task<SaleDto> MarkPendingAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var sale = await GetEntity(id, cancellationToken);

        sale.MarkPending();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(sale, null);
    }

    public async Task<SaleDto> MarkRefundedAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var sale = await GetEntity(id, cancellationToken);

        sale.MarkRefunded();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(sale, null);
    }

    private async Task<Sale> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var sale = await _repository.GetByIdAsync(
            id,
            cancellationToken);

        if (sale is null)
        {
            throw new KeyNotFoundException(
                "Sale was not found.");
        }

        return sale;
    }

    private static SaleDto Map(
        Sale sale,
        string? stockNumber)
    {
        return new SaleDto(
            sale.Id,
            sale.SaleNumber,
            sale.GemstoneItemId,
            stockNumber,
            sale.BuyerName,
            sale.BuyerEmail,
            sale.Price.Amount,
            sale.Price.Currency,
            sale.SaleDate,
            sale.PaymentStatus.ToString(),
            sale.Notes,
            sale.CreatedAt);
    }
}
