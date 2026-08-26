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

    public async Task<IReadOnlyList<Origin>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Origins
            .AsNoTracking()
            .OrderBy(x => x.Country)
            .ThenBy(x => x.Region)
            .ToListAsync(cancellationToken);
    }

    public async Task<Origin?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Origins
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(
        Origin origin,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.Origins.AddAsync(origin, cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
