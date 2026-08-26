using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class SaleConfiguration
    : IEntityTypeConfiguration<Sale>
{
    public void Configure(EntityTypeBuilder<Sale> builder)
    {
        builder.ToTable("sales");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.SaleNumber)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(x => x.SaleNumber)
            .IsUnique();

        builder.Property(x => x.BuyerName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.BuyerEmail)
            .HasMaxLength(320);

        builder.Property(x => x.Price)
            .HasColumnType("jsonb")
            .IsRequired();

        builder.Property(x => x.SaleDate)
            .IsRequired();

        builder.Property(x => x.PaymentStatus)
            .IsRequired();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);

        builder.HasIndex(x => x.GemstoneItemId);
        builder.HasIndex(x => x.PaymentStatus);
    }
}
