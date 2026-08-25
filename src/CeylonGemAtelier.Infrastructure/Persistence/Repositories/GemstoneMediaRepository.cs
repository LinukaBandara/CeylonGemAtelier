using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class GemstoneMediaRepository : IGemstoneMediaRepository
{
    private readonly ApplicationDbContext _dbContext;

    public GemstoneMediaRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<GemstoneMedia>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneMedia
            .Where(x => x.GemstoneItemId == gemstoneItemId)
            .OrderBy(x => x.SortOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<GemstoneMedia?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneMedia
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(
        GemstoneMedia media,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.GemstoneMedia.AddAsync(
            media,
            cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
