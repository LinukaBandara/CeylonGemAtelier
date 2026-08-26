using CeylonGemAtelier.Domain.Catalog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CeylonGemAtelier.Infrastructure.Persistence.Configurations;

public sealed class AtelierSettingsConfiguration
    : IEntityTypeConfiguration<AtelierSettings>
{
    public void Configure(EntityTypeBuilder<AtelierSettings> builder)
    {
        builder.ToTable("atelier_settings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.AtelierName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.ContactEmail)
            .HasMaxLength(320);

        builder.Property(x => x.ContactPhone)
            .HasMaxLength(50);

        builder.Property(x => x.WhatsAppNumber)
            .HasMaxLength(50);

        builder.Property(x => x.Address)
            .HasMaxLength(1000);

        builder.Property(x => x.InstagramUrl)
            .HasMaxLength(500);

        builder.Property(x => x.FacebookUrl)
            .HasMaxLength(500);

        builder.Property(x => x.DefaultCurrency)
            .IsRequired()
            .HasMaxLength(3);

        builder.Property(x => x.StockNumberPrefix)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(x => x.ShowPricesPublicly)
            .IsRequired();

        builder.Property(x => x.HeroTitle)
            .HasMaxLength(300);

        builder.Property(x => x.HeroSubtitle)
            .HasMaxLength(500);

        builder.Property(x => x.SeoTitle)
            .HasMaxLength(300);

        builder.Property(x => x.SeoDescription)
            .HasMaxLength(500);

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt);
    }
}
