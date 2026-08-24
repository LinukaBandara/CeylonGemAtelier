using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class GemstoneType : BaseEntity
{
    public string Name { get; private set; }

    public string? Description { get; private set; }

    public bool IsActive { get; private set; }

    private GemstoneType()
    {
        Name = string.Empty;
    }

    public GemstoneType(string name, string? description = null)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Gemstone type name is required.",
                nameof(name));
        }

        Name = name.Trim();
        Description = description?.Trim();
        IsActive = true;
    }

    public void Update(string name, string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Gemstone type name is required.",
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
