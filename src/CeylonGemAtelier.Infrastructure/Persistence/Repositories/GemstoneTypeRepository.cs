using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class GemstoneTypeRepository : IGemstoneTypeRepository
{
    private readonly ApplicationDbContext _dbContext;

    public GemstoneTypeRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<GemstoneType>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.GemstoneTypes
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }
}
