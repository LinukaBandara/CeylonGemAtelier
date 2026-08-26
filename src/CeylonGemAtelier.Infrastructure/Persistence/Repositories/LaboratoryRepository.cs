using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class LaboratoryRepository : ILaboratoryRepository
{
    private readonly ApplicationDbContext _dbContext;

    public LaboratoryRepository(ApplicationDbContext dbContext)
        => _dbContext = dbContext;

    public async Task<IReadOnlyList<Laboratory>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Laboratories
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Laboratory>> GetAllIncludingInactiveAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Laboratories
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<Laboratory?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Laboratories
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(
        Laboratory laboratory,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.Laboratories.AddAsync(
            laboratory,
            cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
