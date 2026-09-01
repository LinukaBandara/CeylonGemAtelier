using CeylonGemAtelier.Domain.Catalog.Entities;
using CeylonGemAtelier.Domain.Common.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace CeylonGemAtelier.Infrastructure.Persistence.Seed;

public static class CatalogSeedData
{
    public static readonly Guid SapphireTypeId =
        Guid.Parse("10000000-0000-0000-0000-000000000001");

    public static readonly Guid RubyTypeId =
        Guid.Parse("10000000-0000-0000-0000-000000000002");

    public static readonly Guid SpinelTypeId =
        Guid.Parse("10000000-0000-0000-0000-000000000003");

    public static readonly Guid SriLankaOriginId =
        Guid.Parse("40000000-0000-0000-0000-000000000001");

    public static readonly Guid MadagascarOriginId =
        Guid.Parse("40000000-0000-0000-0000-000000000002");

    public static readonly Guid MyanmarOriginId =
        Guid.Parse("40000000-0000-0000-0000-000000000003");

    public static readonly Guid NGJALaboratoryId =
        Guid.Parse("50000000-0000-0000-0000-000000000001");

    public static readonly Guid GIALaboratoryId =
        Guid.Parse("50000000-0000-0000-0000-000000000002");

    public static readonly Guid GRSLaboratoryId =
        Guid.Parse("50000000-0000-0000-0000-000000000003");

    public static readonly Guid SSEFLaboratoryId =
        Guid.Parse("50000000-0000-0000-0000-000000000004");

    public static readonly Guid OvalShapeId =
        Guid.Parse("20000000-0000-0000-0000-000000000001");

    public static readonly Guid CushionShapeId =
        Guid.Parse("20000000-0000-0000-0000-000000000002");

    public static readonly Guid RoundShapeId =
        Guid.Parse("20000000-0000-0000-0000-000000000003");

    public static readonly Guid PearShapeId =
        Guid.Parse("20000000-0000-0000-0000-000000000004");

    public static readonly Guid EmeraldShapeId =
        Guid.Parse("20000000-0000-0000-0000-000000000005");

    public static readonly Guid HeatTreatmentId =
        Guid.Parse("30000000-0000-0000-0000-000000000001");

    public static readonly Guid UnheatedTreatmentId =
        Guid.Parse("30000000-0000-0000-0000-000000000002");

    public static readonly Guid DiffusionTreatmentId =
        Guid.Parse("30000000-0000-0000-0000-000000000003");

    private static readonly Guid BlueSapphireProductId =
        Guid.Parse("60000000-0000-0000-0000-000000000001");

    private static readonly Guid PadparadschaProductId =
        Guid.Parse("60000000-0000-0000-0000-000000000002");

    private static readonly Guid RubyProductId =
        Guid.Parse("60000000-0000-0000-0000-000000000003");

    private static readonly Guid BlueSapphireItemId =
        Guid.Parse("70000000-0000-0000-0000-000000000001");

    private static readonly Guid PadparadschaItemId =
        Guid.Parse("70000000-0000-0000-0000-000000000002");

    private static readonly Guid RubyItemId =
        Guid.Parse("70000000-0000-0000-0000-000000000003");

    public static void Seed(ApplicationDbContext db)
    {
        SeedGemstoneTypes(db);
        db.SaveChanges();

        SeedVarieties(db);
        db.SaveChanges();

        SeedShapes(db);
        SeedTreatments(db);
        SeedOrigins(db);
        SeedLaboratories(db);
        db.SaveChanges();

        SeedProducts(db);
        db.SaveChanges();

        SeedItems(db);
        db.SaveChanges();
    }

    private static void SeedGemstoneTypes(ApplicationDbContext db)
    {
        AddIfMissing(
            db.GemstoneTypes,
            SapphireTypeId,
            () => new GemstoneType(
                "Sapphire",
                "Corundum gemstone associated with Ceylon gemstones."));

        AddIfMissing(
            db.GemstoneTypes,
            RubyTypeId,
            () => new GemstoneType(
                "Ruby",
                "Red variety of corundum."));

        AddIfMissing(
            db.GemstoneTypes,
            SpinelTypeId,
            () => new GemstoneType(
                "Spinel",
                "Gemstone known for vibrant red, pink and other colors."));
    }

    private static void SeedVarieties(ApplicationDbContext db)
    {
        EnsureVariety(
            db,
            SapphireTypeId,
            "Blue Sapphire",
            "Classic blue sapphire.");

        EnsureVariety(
            db,
            SapphireTypeId,
            "Padparadscha",
            "Rare pink-orange sapphire.");

        EnsureVariety(
            db,
            SapphireTypeId,
            "Star Sapphire",
            "Sapphire displaying asterism.");

        EnsureVariety(
            db,
            RubyTypeId,
            "Ruby",
            "Gem-quality red corundum.");

        EnsureVariety(
            db,
            SpinelTypeId,
            "Red Spinel",
            "Red to vivid red spinel.");
    }

    private static void EnsureVariety(
        ApplicationDbContext db,
        Guid gemstoneTypeId,
        string name,
        string description)
    {
        var exists = db.GemstoneVarieties.Any(x =>
            x.GemstoneTypeId == gemstoneTypeId &&
            x.Name == name);

        if (!exists)
        {
            db.GemstoneVarieties.Add(
                new GemstoneVariety(
                    gemstoneTypeId,
                    name,
                    description));
        }
    }

    private static void SeedShapes(ApplicationDbContext db)
    {
        AddIfMissing(
            db.Shapes,
            OvalShapeId,
            () => new Shape("Oval"));

        AddIfMissing(
            db.Shapes,
            CushionShapeId,
            () => new Shape("Cushion"));

        AddIfMissing(
            db.Shapes,
            RoundShapeId,
            () => new Shape("Round"));

        AddIfMissing(
            db.Shapes,
            PearShapeId,
            () => new Shape("Pear"));

        AddIfMissing(
            db.Shapes,
            EmeraldShapeId,
            () => new Shape("Emerald"));
    }

    private static void SeedTreatments(ApplicationDbContext db)
    {
        AddIfMissing(
            db.Treatments,
            HeatTreatmentId,
            () => new Treatment(
                "Heated",
                "Gemstone has undergone heat treatment.",
                1));

        AddIfMissing(
            db.Treatments,
            UnheatedTreatmentId,
            () => new Treatment(
                "Unheated",
                "No heat treatment declared.",
                2));

        AddIfMissing(
            db.Treatments,
            DiffusionTreatmentId,
            () => new Treatment(
                "Diffusion",
                "Gemstone has undergone diffusion treatment.",
                3));
    }

    private static void SeedOrigins(ApplicationDbContext db)
    {
        AddIfMissing(
            db.Origins,
            SriLankaOriginId,
            () => new Origin(
                "Sri Lanka",
                "Ratnapura",
                null,
                "Historic source of Ceylon gemstones."));

        AddIfMissing(
            db.Origins,
            MadagascarOriginId,
            () => new Origin(
                "Madagascar",
                null,
                null,
                "Major modern gemstone-producing region."));

        AddIfMissing(
            db.Origins,
            MyanmarOriginId,
            () => new Origin(
                "Myanmar",
                null,
                null,
                "Historic source of high-quality rubies."));
    }

    private static void SeedLaboratories(ApplicationDbContext db)
    {
        AddIfMissing(
            db.Laboratories,
            NGJALaboratoryId,
            () => new Laboratory(
                "National Gem and Jewellery Authority",
                "NGJA",
                null,
                "Sri Lankan gem and jewellery authority."));

        AddIfMissing(
            db.Laboratories,
            GIALaboratoryId,
            () => new Laboratory(
                "Gemological Institute of America",
                "GIA",
                "https://www.gia.edu",
                "International gemological laboratory."));

        AddIfMissing(
            db.Laboratories,
            GRSLaboratoryId,
            () => new Laboratory(
                "GemResearch Swisslab",
                "GRS",
                "https://www.gemresearch.ch",
                "International gemstone laboratory."));

        AddIfMissing(
            db.Laboratories,
            SSEFLaboratoryId,
            () => new Laboratory(
                "Swiss Gemmological Institute SSEF",
                "SSEF",
                "https://www.ssef.ch",
                "Swiss gemstone laboratory."));
    }

    private static void SeedProducts(ApplicationDbContext db)
    {
        EnsurePublishedProduct(
            db,
            BlueSapphireProductId,
            () => new GemstoneProduct(
                "Ceylon Blue Sapphire",
                "ceylon-blue-sapphire",
                SapphireTypeId,
                GetVarietyId(
                    db,
                    SapphireTypeId,
                    "Blue Sapphire"),
                "Natural Ceylon blue sapphire from Sri Lanka."));

        EnsurePublishedProduct(
            db,
            PadparadschaProductId,
            () => new GemstoneProduct(
                "Ceylon Padparadscha Sapphire",
                "ceylon-padparadscha-sapphire",
                SapphireTypeId,
                GetVarietyId(
                    db,
                    SapphireTypeId,
                    "Padparadscha"),
                "Rare pink-orange Ceylon Padparadscha sapphire."));

        EnsurePublishedProduct(
            db,
            RubyProductId,
            () => new GemstoneProduct(
                "Ceylon Ruby",
                "ceylon-ruby",
                RubyTypeId,
                GetVarietyId(
                    db,
                    RubyTypeId,
                    "Ruby"),
                "Natural Sri Lankan ruby."));
    }

    private static void EnsurePublishedProduct(
        ApplicationDbContext db,
        Guid id,
        Func<GemstoneProduct> factory)
    {
        var product = db.GemstoneProducts
            .FirstOrDefault(x =>
                EF.Property<Guid>(x, "Id") == id);

        if (product == null)
        {
            product = factory();

            var property = typeof(GemstoneProduct)
                .GetProperty("Id");

            property!.SetValue(product, id);

            db.GemstoneProducts.Add(product);
        }

        if (!product.IsPublished)
        {
            product.Publish();
        }
    }
    private static void SeedItems(ApplicationDbContext db)
    {
        AddIfMissing(
            db.GemstoneItems,
            BlueSapphireItemId,
            () => new GemstoneItem(
                BlueSapphireProductId,
                "CGA-0001",
                2.31m,
                OvalShapeId,
                UnheatedTreatmentId,
                SriLankaOriginId,
                "Royal Blue",
                "Eye Clean",
                8.20m,
                6.10m,
                4.30m,
                new Money(4500m, "USD"),
                new Money(7200m, "USD")));

        AddIfMissing(
            db.GemstoneItems,
            PadparadschaItemId,
            () => new GemstoneItem(
                PadparadschaProductId,
                "CGA-0002",
                1.84m,
                CushionShapeId,
                UnheatedTreatmentId,
                SriLankaOriginId,
                "Pinkish Orange",
                "Eye Clean",
                7.10m,
                5.90m,
                4.20m,
                new Money(8500m, "USD"),
                new Money(14500m, "USD")));

        AddIfMissing(
            db.GemstoneItems,
            RubyItemId,
            () => new GemstoneItem(
                RubyProductId,
                "CGA-0003",
                2.05m,
                CushionShapeId,
                HeatTreatmentId,
                SriLankaOriginId,
                "Vivid Red",
                "Eye Clean",
                7.40m,
                6.20m,
                4.60m,
                new Money(3200m, "USD"),
                new Money(5600m, "USD")));
    }

    private static Guid GetVarietyId(
        ApplicationDbContext db,
        Guid gemstoneTypeId,
        string name)
    {
        var variety = db.GemstoneVarieties
            .FirstOrDefault(x =>
                x.GemstoneTypeId == gemstoneTypeId &&
                x.Name == name);

        if (variety == null)
        {
            throw new InvalidOperationException(
                $"Required gemstone variety was not found. " +
                $"TypeId: {gemstoneTypeId}, Name: '{name}'.");
        }

        return variety.Id;
    }

    private static void AddIfMissing<T>(
        DbSet<T> set,
        Guid id,
        Func<T> factory)
        where T : class
    {
        if (!set.Any(x => EF.Property<Guid>(x, "Id") == id))
        {
            var entity = factory();

            var property = typeof(T).GetProperty("Id");

            property!.SetValue(entity, id);

            set.Add(entity);
        }
    }
}

