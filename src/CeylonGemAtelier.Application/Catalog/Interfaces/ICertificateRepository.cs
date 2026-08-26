using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.Application.Catalog.Interfaces;

public interface ICertificateRepository
{
    Task<IReadOnlyList<Certificate>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Certificate>> GetByItemIdAsync(
        Guid gemstoneItemId,
        CancellationToken cancellationToken = default);

    Task<Certificate?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Certificate certificate,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);
}
