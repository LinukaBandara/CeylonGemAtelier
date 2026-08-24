using Microsoft.EntityFrameworkCore;
using CeylonGemAtelier.Domain.Catalog.Entities;

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

    public static void Seed(ApplicationDbContext db)
    {
        SeedGemstoneTypes(db);
        SeedVarieties(db);
        SeedShapes(db);
        SeedTreatments(db);
        SeedOrigins(db);
        SeedLaboratories(db);

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
        if (db.GemstoneVarieties.Any())
            return;

        db.GemstoneVarieties.AddRange(
            new GemstoneVariety(
                SapphireTypeId,
                "Blue Sapphire",
                "Classic blue sapphire."),

            new GemstoneVariety(
                SapphireTypeId,
                "Padparadscha",
                "Rare pink-orange sapphire."),

            new GemstoneVariety(
                SapphireTypeId,
                "Star Sapphire",
                "Sapphire displaying asterism."),

            new GemstoneVariety(
                RubyTypeId,
                "Ruby",
                "Gem-quality red corundum."),

            new GemstoneVariety(
                SpinelTypeId,
                "Red Spinel",
                "Red to vivid red spinel.")
        );
    }

    private static void SeedShapes(ApplicationDbContext db)
    {
        AddIfMissing(db.Shapes, OvalShapeId, () => new Shape("Oval"));
        AddIfMissing(db.Shapes, CushionShapeId, () => new Shape("Cushion"));
        AddIfMissing(db.Shapes, RoundShapeId, () => new Shape("Round"));
        AddIfMissing(db.Shapes, PearShapeId, () => new Shape("Pear"));
        AddIfMissing(db.Shapes, EmeraldShapeId, () => new Shape("Emerald"));
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
