using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class GemstoneMediaConfiguration
    : IEntityTypeConfiguration<GemstoneMedia>
{
    public void Configure(EntityTypeBuilder<GemstoneMedia> builder)
    {
        builder.ToTable("gemstone_media");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Url)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(x => x.AltText)
            .HasMaxLength(500);

        builder.Property(x => x.SortOrder)
            .IsRequired();

        builder.Property(x => x.IsPrimary)
            .IsRequired();

        builder.Property(x => x.Type)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);

        builder.HasIndex(x => x.GemstoneItemId);
        builder.HasIndex(x => new
        {
            x.GemstoneItemId,
            x.SortOrder
        });
    }
}
