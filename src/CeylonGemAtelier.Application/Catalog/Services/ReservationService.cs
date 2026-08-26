using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class ReservationService
{
    private readonly IReservationRepository _repository;
    private readonly IGemstoneItemRepository _itemRepository;

    public ReservationService(
        IReservationRepository repository,
        IGemstoneItemRepository itemRepository)
    {
        _repository = repository;
        _itemRepository = itemRepository;
    }

    public async Task<IReadOnlyList<ReservationDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var reservations = await _repository.GetAllAsync(
            cancellationToken);

        var items = await _itemRepository.GetAllAsync(
            cancellationToken);

        var stockNumbers = items.ToDictionary(
            x => x.Id,
            x => x.StockNumber);

        return reservations
            .Select(x => Map(
                x,
                stockNumbers.GetValueOrDefault(x.GemstoneItemId)))
            .ToList();
    }

    public async Task<ReservationDto> CreateAsync(
        CreateReservationRequest request,
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

        var reservation = new Reservation(
            request.GemstoneItemId,
            request.CustomerName,
            request.CustomerEmail,
            request.CustomerPhone,
            request.PreferredDate,
            request.Message);

        await _repository.AddAsync(reservation, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, item.StockNumber);
    }

    public async Task<ReservationDto> ConfirmAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var reservation = await GetEntity(id, cancellationToken);

        reservation.Confirm();

        var item = await _itemRepository.GetByIdAsync(
            reservation.GemstoneItemId,
            cancellationToken);

        if (item is not null
            && item.Status == GemstoneItemStatus.Available)
        {
            item.Reserve();
        }

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, item?.StockNumber);
    }

    public async Task<ReservationDto> RejectAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var reservation = await GetEntity(id, cancellationToken);

        reservation.Reject();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, null);
    }

    public async Task<ReservationDto> CancelAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var reservation = await GetEntity(id, cancellationToken);

        var wasConfirmed =
            reservation.Status == ReservationStatus.Confirmed;

        reservation.Cancel();

        var item = await _itemRepository.GetByIdAsync(
            reservation.GemstoneItemId,
            cancellationToken);

        if (wasConfirmed
            && item is not null
            && item.Status == GemstoneItemStatus.Reserved)
        {
            item.ReleaseReservation();
        }

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, item?.StockNumber);
    }

    public async Task<ReservationDto> CompleteAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var reservation = await GetEntity(id, cancellationToken);

        reservation.Complete();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, null);
    }

    public async Task<ReservationDto> UpdateNotesAsync(
        Guid id,
        UpdateReservationNotesRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var reservation = await GetEntity(id, cancellationToken);

        reservation.UpdateInternalNotes(request.InternalNotes);

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(reservation, null);
    }

    private async Task<Reservation> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var reservation = await _repository.GetByIdAsync(
            id,
            cancellationToken);

        if (reservation is null)
        {
            throw new KeyNotFoundException(
                "Reservation was not found.");
        }

        return reservation;
    }

    private static ReservationDto Map(
        Reservation reservation,
        string? stockNumber)
    {
        return new ReservationDto(
            reservation.Id,
            reservation.GemstoneItemId,
            stockNumber,
            reservation.CustomerName,
            reservation.CustomerEmail,
            reservation.CustomerPhone,
            reservation.PreferredDate,
            reservation.Message,
            reservation.InternalNotes,
            reservation.Status.ToString(),
            reservation.CreatedAt,
            reservation.UpdatedAt);
    }
}
