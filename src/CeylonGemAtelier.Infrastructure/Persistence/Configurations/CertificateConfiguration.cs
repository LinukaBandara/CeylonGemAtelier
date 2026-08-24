using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class CertificateConfiguration
    : IEntityTypeConfiguration<Certificate>
{
    public void Configure(EntityTypeBuilder<Certificate> builder)
    {
        builder.ToTable("certificates");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.CertificateNumber)
            .IsRequired()
            .HasMaxLength(150);

        builder.HasIndex(x => x.CertificateNumber)
            .IsUnique();

        builder.Property(x => x.IssueDate)
            .IsRequired();

        builder.Property(x => x.ReportType)
            .HasMaxLength(100);

        builder.Property(x => x.CertifiedCaratWeight)
            .HasPrecision(10, 3);

        builder.Property(x => x.TreatmentStatement)
            .HasMaxLength(1000);

        builder.Property(x => x.ReportUrl)
            .HasMaxLength(2000);

        builder.Property(x => x.IsVerified)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);

        builder.HasIndex(x => x.GemstoneItemId);
        builder.HasIndex(x => x.LaboratoryId);
    }
}
