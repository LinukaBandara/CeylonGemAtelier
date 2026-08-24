using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class GemstoneItemConfiguration
    : IEntityTypeConfiguration<GemstoneItem>
{
    public void Configure(EntityTypeBuilder<GemstoneItem> builder)
    {
        builder.ToTable("gemstone_items");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.StockNumber)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(x => x.StockNumber)
            .IsUnique();

        builder.Property(x => x.CaratWeight)
            .HasPrecision(10, 3)
            .IsRequired();

        builder.Property(x => x.Color)
            .HasMaxLength(100);

        builder.Property(x => x.Clarity)
            .HasMaxLength(100);

        builder.Property(x => x.LengthMm)
            .HasPrecision(10, 3);

        builder.Property(x => x.WidthMm)
            .HasPrecision(10, 3);

        builder.Property(x => x.DepthMm)
            .HasPrecision(10, 3);

        builder.Property(x => x.Status)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);

        builder.Property(x => x.AcquisitionCost)
            .HasColumnType("jsonb");

        builder.Property(x => x.SellingPrice)
            .HasColumnType("jsonb");

        builder.HasIndex(x => x.GemstoneProductId);
        builder.HasIndex(x => x.ShapeId);
        builder.HasIndex(x => x.TreatmentId);
        builder.HasIndex(x => x.OriginId);
        builder.HasIndex(x => x.Status);
    }
}
