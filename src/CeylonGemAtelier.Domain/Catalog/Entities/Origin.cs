using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class Origin : BaseEntity
{
    public string Country { get; private set; }

    public string? Region { get; private set; }

    public string? Mine { get; private set; }

    public string? Description { get; private set; }

    public bool IsActive { get; private set; }

    private Origin()
    {
        Country = string.Empty;
    }

    public Origin(
        string country,
        string? region = null,
        string? mine = null,
        string? description = null)
    {
        if (string.IsNullOrWhiteSpace(country))
        {
            throw new ArgumentException(
                "Country is required.",
                nameof(country));
        }

        Country = country.Trim();
        Region = region?.Trim();
        Mine = mine?.Trim();
        Description = description?.Trim();
        IsActive = true;
    }

    public void Update(
        string country,
        string? region,
        string? mine,
        string? description)
    {
        if (string.IsNullOrWhiteSpace(country))
        {
            throw new ArgumentException(
                "Country is required.",
                nameof(country));
        }

        Country = country.Trim();
        Region = region?.Trim();
        Mine = mine?.Trim();
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
