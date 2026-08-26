using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Repositories;

public sealed class CertificateRepository : ICertificateRepository
{
    private readonly ApplicationDbContext _dbContext;

    public CertificateRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<Certificate>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Certificates
            .AsNoTracking()
            .OrderByDescending(x => x.IssueDate)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Certificate>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Certificates
            .Where(x => x.GemstoneItemId == gemstoneItemId)
            .OrderByDescending(x => x.IssueDate)
            .ToListAsync(cancellationToken);
    }

    public async Task<Certificate?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Certificates
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(
        Certificate certificate,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.Certificates.AddAsync(
            certificate,
            cancellationToken);
    }

    public async Task SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
