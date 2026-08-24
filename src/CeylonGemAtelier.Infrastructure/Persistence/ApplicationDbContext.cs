using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence;

public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<GemstoneProduct> GemstoneProducts => Set<GemstoneProduct>();

    public DbSet<GemstoneItem> GemstoneItems => Set<GemstoneItem>();

    public DbSet<Certificate> Certificates => Set<Certificate>();

    public DbSet<GemstoneMedia> GemstoneMedia => Set<GemstoneMedia>();

    public DbSet<GemstoneType> GemstoneTypes => Set<GemstoneType>();

    public DbSet<GemstoneVariety> GemstoneVarieties => Set<GemstoneVariety>();

    public DbSet<Laboratory> Laboratories => Set<Laboratory>();

    public DbSet<Origin> Origins => Set<Origin>();

    public DbSet<Shape> Shapes => Set<Shape>();

    public DbSet<Treatment> Treatments => Set<Treatment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}
