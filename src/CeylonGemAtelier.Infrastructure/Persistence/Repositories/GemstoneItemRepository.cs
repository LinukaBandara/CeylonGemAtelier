using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class GemstoneItemRepository : IGemstoneItemRepository
{
    private readonly ApplicationDbContext _dbContext;

    public GemstoneItemRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<GemstoneItem>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneItems
            .AsNoTracking()
            .OrderBy(x => x.StockNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<GemstoneItem?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneItems
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken);
    }

    public async Task<bool> StockNumberExistsAsync(
        string stockNumber,
        CancellationToken cancellationToken = default)
    {
        var normalized = stockNumber.Trim().ToUpperInvariant();

        return await _dbContext.GemstoneItems
            .AnyAsync(
                x => x.StockNumber == normalized,
                cancellationToken);
    }

    public async Task AddAsync(
        GemstoneItem item,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.GemstoneItems.AddAsync(
            item,
            cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
