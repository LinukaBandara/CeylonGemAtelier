using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class AtelierSettingsRepository
    : IAtelierSettingsRepository
{
    private readonly ApplicationDbContext _dbContext;

    public AtelierSettingsRepository(ApplicationDbContext dbContext)
        => _dbContext = dbContext;

    public async Task<AtelierSettings?> GetAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.AtelierSettings
            .OrderBy(x => x.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task AddAsync(
        AtelierSettings settings,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.AtelierSettings.AddAsync(
            settings,
            cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
