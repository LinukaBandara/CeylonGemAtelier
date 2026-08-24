using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class GemstoneMedia : BaseEntity
{
    public Guid GemstoneItemId { get; private set; }

    public GemstoneMediaType Type { get; private set; }

    public string Url { get; private set; }

    public string? AltText { get; private set; }

    public int SortOrder { get; private set; }

    public bool IsPrimary { get; private set; }

    private GemstoneMedia()
    {
        Url = string.Empty;
    }

    public GemstoneMedia(
        Guid gemstoneItemId,
        GemstoneMediaType type,
        string url,
        string? altText = null,
        int sortOrder = 0,
        bool isPrimary = false)
    {
        if (gemstoneItemId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone item is required.",
                nameof(gemstoneItemId));
        }

        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException(
                "Media URL is required.",
                nameof(url));
        }

        if (sortOrder < 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(sortOrder));
        }

        GemstoneItemId = gemstoneItemId;
        Type = type;
        Url = url.Trim();
        AltText = altText?.Trim();
        SortOrder = sortOrder;
        IsPrimary = isPrimary;
    }

    public void Update(
        string url,
        string? altText,
        int sortOrder)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException(
                "Media URL is required.",
                nameof(url));
        }

        if (sortOrder < 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(sortOrder));
        }

        Url = url.Trim();
        AltText = altText?.Trim();
        SortOrder = sortOrder;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetPrimary()
    {
        IsPrimary = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemovePrimary()
    {
        IsPrimary = false;
        UpdatedAt = DateTime.UtcNow;
    }
}

public enum GemstoneMediaType
{
    Image = 1,
    Video = 2,
    ThreeDModel = 3
}
