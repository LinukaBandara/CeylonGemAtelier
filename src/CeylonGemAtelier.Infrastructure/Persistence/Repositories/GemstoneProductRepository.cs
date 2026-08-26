using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class GemstoneProductRepository
    : IGemstoneProductRepository
{
    private readonly ApplicationDbContext _dbContext;

    public GemstoneProductRepository(
        ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<GemstoneProduct>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneProducts
            .Include(x => x.Items)
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<GemstoneProduct?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneProducts
            .Include(x => x.Items)
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken);
    }

    public async Task<GemstoneProduct?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneProducts
            .Include(x => x.Items)
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Slug == slug,
                cancellationToken);
    }

    public async Task AddAsync(
        GemstoneProduct product,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.GemstoneProducts.AddAsync(
            product,
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> SlugExistsAsync(
        string slug,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneProducts
            .AnyAsync(
                x => x.Slug == slug,
                cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}