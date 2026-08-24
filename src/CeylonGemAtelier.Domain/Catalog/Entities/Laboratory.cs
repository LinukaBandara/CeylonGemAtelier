using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class Laboratory : BaseEntity
{
    public string Name { get; private set; }

    public string ShortCode { get; private set; }

    public string? Website { get; private set; }

    public string? Description { get; private set; }

    public bool IsActive { get; private set; }

    private Laboratory()
    {
        Name = string.Empty;
        ShortCode = string.Empty;
    }

    public Laboratory(
        string name,
        string shortCode,
        string? website = null,
        string? description = null)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Laboratory name is required.",
                nameof(name));
        }

        if (string.IsNullOrWhiteSpace(shortCode))
        {
            throw new ArgumentException(
                "Laboratory short code is required.",
                nameof(shortCode));
        }

        Name = name.Trim();
        ShortCode = shortCode.Trim().ToUpperInvariant();
        Website = website?.Trim();
        Description = description?.Trim();
        IsActive = true;
    }

    public void Update(
        string name,
        string shortCode,
        string? website,
        string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Laboratory name is required.",
                nameof(name));
        }

        if (string.IsNullOrWhiteSpace(shortCode))
        {
            throw new ArgumentException(
                "Laboratory short code is required.",
                nameof(shortCode));
        }

        Name = name.Trim();
        ShortCode = shortCode.Trim().ToUpperInvariant();
        Website = website?.Trim();
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
