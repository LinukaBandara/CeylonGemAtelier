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
}
