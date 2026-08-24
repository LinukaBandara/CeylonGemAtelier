using CeylonGemAtelier.Domain.Catalog.Entities;

namespace CeylonGemAtelier.UnitTests.Catalog;

public class GemstoneTypeTests
{
    [Fact]
    public void Create_WithValidName_CreatesActiveType()
    {
        var gemstoneType = new GemstoneType("Sapphire");

        Assert.NotEqual(Guid.Empty, gemstoneType.Id);
        Assert.Equal("Sapphire", gemstoneType.Name);
        Assert.True(gemstoneType.IsActive);
        Assert.NotEqual(default, gemstoneType.CreatedAt);
    }

    [Fact]
    public void Create_WithWhitespace_TrimsName()
    {
        var gemstoneType = new GemstoneType("  Sapphire  ");

        Assert.Equal("Sapphire", gemstoneType.Name);
    }

    [Fact]
    public void Create_WithEmptyName_ThrowsException()
    {
        Assert.Throws<ArgumentException>(
            () => new GemstoneType(""));
    }

    [Fact]
    public void Deactivate_SetsTypeInactive()
    {
        var gemstoneType = new GemstoneType("Sapphire");

        gemstoneType.Deactivate();

        Assert.False(gemstoneType.IsActive);
    }

    [Fact]
    public void Activate_SetsTypeActive()
    {
        var gemstoneType = new GemstoneType("Sapphire");

        gemstoneType.Deactivate();
        gemstoneType.Activate();

        Assert.True(gemstoneType.IsActive);
    }

    [Fact]
    public void Update_ChangesNameAndDescription()
    {
        var gemstoneType = new GemstoneType(
            "Sapphire",
            "Blue gemstone");

        gemstoneType.Update(
            "Ruby",
            "Red gemstone");

        Assert.Equal("Ruby", gemstoneType.Name);
        Assert.Equal("Red gemstone", gemstoneType.Description);
        Assert.NotNull(gemstoneType.UpdatedAt);
    }
}
