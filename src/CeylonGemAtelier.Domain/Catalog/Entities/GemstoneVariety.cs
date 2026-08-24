using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class GemstoneVariety : BaseEntity
{
    public Guid GemstoneTypeId { get; private set; }

    public string Name { get; private set; }

    public string? Description { get; private set; }

    public bool IsActive { get; private set; }

    private GemstoneVariety()
    {
        Name = string.Empty;
    }

    public GemstoneVariety(
        Guid gemstoneTypeId,
        string name,
        string? description = null)
    {
        if (gemstoneTypeId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone type is required.",
                nameof(gemstoneTypeId));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Gemstone variety name is required.",
                nameof(name));
        }

        GemstoneTypeId = gemstoneTypeId;
        Name = name.Trim();
        Description = description?.Trim();
        IsActive = true;
    }

    public void Update(
        string name,
        string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Gemstone variety name is required.",
                nameof(name));
        }

        Name = name.Trim();
        Description = description?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }
}
