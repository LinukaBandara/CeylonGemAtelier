using CeylonGemAtelier.Application.Catalog.DTOs;
using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Services;

public sealed class GemstoneMediaService
{
    private readonly IGemstoneMediaRepository _repository;

    public GemstoneMediaService(
        IGemstoneMediaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<GemstoneMediaDto>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        var media = await _repository.GetAllAsync(cancellationToken);

        return media.Select(Map).ToList();
    }

    public async Task<IReadOnlyList<GemstoneMediaDto>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default)
    {
        var media = await _repository.GetByItemIdAsync(
            gemstoneItemId,
            cancellationToken);

        return media.Select(Map).ToList();
    }

    public async Task<GemstoneMediaDto> CreateAsync(
        CreateGemstoneMediaRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var media = new GemstoneMedia(
            request.GemstoneItemId,
            request.Type,
            request.Url,
            request.AltText,
            request.SortOrder,
            request.IsPrimary);

        await _repository.AddAsync(media, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return Map(media);
    }

    public async Task<GemstoneMediaDto> UpdateAsync(
        Guid id,
        UpdateGemstoneMediaRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var media = await GetEntity(id, cancellationToken);

        media.Update(
            request.Url,
            request.AltText,
            request.SortOrder);

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(media);
    }

    public async Task<GemstoneMediaDto> SetPrimaryAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var media = await GetEntity(id, cancellationToken);

        media.SetPrimary();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(media);
    }

    public async Task<GemstoneMediaDto> RemovePrimaryAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var media = await GetEntity(id, cancellationToken);

        media.RemovePrimary();

        await _repository.SaveChangesAsync(cancellationToken);

        return Map(media);
    }

    private async Task<GemstoneMedia> GetEntity(
        Guid id,
        CancellationToken cancellationToken)
    {
        var media = await _repository.GetByIdAsync(
            id,
            cancellationToken);

        if (media is null)
        {
            throw new KeyNotFoundException(
                "Gemstone media was not found.");
        }

        return media;
    }

    private static GemstoneMediaDto Map(
        GemstoneMedia media)
    {
        return new GemstoneMediaDto(
            media.Id,
            media.GemstoneItemId,
            media.Type,
            media.Url,
            media.AltText,
            media.SortOrder,
            media.IsPrimary);
    }
}
