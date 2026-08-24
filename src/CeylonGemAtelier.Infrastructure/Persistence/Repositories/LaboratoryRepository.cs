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
}
