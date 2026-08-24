using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class GemstoneProductConfiguration
    : IEntityTypeConfiguration<GemstoneProduct>
{
    public void Configure(EntityTypeBuilder<GemstoneProduct> builder)
    {
        builder.ToTable("gemstone_products");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Slug)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasIndex(x => x.Slug)
            .IsUnique();

        builder.Property(x => x.Description)
            .HasMaxLength(4000);

        builder.Property(x => x.IsPublished)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);

        builder.HasMany(x => x.Items)
            .WithOne()
            .HasForeignKey(x => x.GemstoneProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
