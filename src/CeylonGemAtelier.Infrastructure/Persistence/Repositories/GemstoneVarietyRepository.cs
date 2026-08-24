using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class GemstoneVarietyRepository : IGemstoneVarietyRepository
{
    private readonly ApplicationDbContext _dbContext;

    public GemstoneVarietyRepository(ApplicationDbContext dbContext)
        => _dbContext = dbContext;

    public async Task<IReadOnlyList<GemstoneVariety>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneVarieties
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }
}
