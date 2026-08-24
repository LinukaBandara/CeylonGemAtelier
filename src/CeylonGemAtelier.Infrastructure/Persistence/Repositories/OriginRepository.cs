using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class OriginRepository : IOriginRepository
{
    private readonly ApplicationDbContext _dbContext;

    public OriginRepository(ApplicationDbContext dbContext)
        => _dbContext = dbContext;

    public async Task<IReadOnlyList<Origin>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Origins
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Country)
            .ThenBy(x => x.Region)
            .ToListAsync(cancellationToken);
    }
}
