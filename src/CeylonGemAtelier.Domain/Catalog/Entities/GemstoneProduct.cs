using CeylonGemAtelier.Domain.Common;

namespace CeylonGemAtelier.Domain.Catalog.Entities;

public sealed class GemstoneProduct : BaseEntity
{
    private readonly List<GemstoneItem> _items = new();

    public string Name { get; private set; }

    public string Slug { get; private set; }

    public Guid GemstoneTypeId { get; private set; }

    public Guid? GemstoneVarietyId { get; private set; }

    public string? Description { get; private set; }

    public bool IsPublished { get; private set; }

    public IReadOnlyCollection<GemstoneItem> Items => _items.AsReadOnly();

    private GemstoneProduct()
    {
        Name = string.Empty;
        Slug = string.Empty;
    }

    public GemstoneProduct(
        string name,
        string slug,
        Guid gemstoneTypeId,
        Guid? gemstoneVarietyId = null,
        string? description = null)
    {
        ValidateName(name);
        ValidateSlug(slug);
        ValidateGemstoneType(gemstoneTypeId);

        Name = name.Trim();
        Slug = slug.Trim().ToLowerInvariant();
        GemstoneTypeId = gemstoneTypeId;
        GemstoneVarietyId = gemstoneVarietyId;
        Description = description?.Trim();
        IsPublished = false;
    }

    public void Update(
        string name,
        string slug,
        Guid gemstoneTypeId,
        Guid? gemstoneVarietyId,
        string? description)
    {
        ValidateName(name);
        ValidateSlug(slug);
        ValidateGemstoneType(gemstoneTypeId);

        Name = name.Trim();
        Slug = slug.Trim().ToLowerInvariant();
        GemstoneTypeId = gemstoneTypeId;
        GemstoneVarietyId = gemstoneVarietyId;
        Description = description?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void AddItem(GemstoneItem item)
    {
        ArgumentNullException.ThrowIfNull(item);

        if (item.GemstoneProductId != Id)
        {
            throw new InvalidOperationException(
                "The gemstone item belongs to a different product.");
        }

        if (_items.Any(x =>
                x.Id == item.Id ||
                x.StockNumber.Equals(
                    item.StockNumber,
                    StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException(
                "This gemstone item already exists in the product.");
        }

        _items.Add(item);
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoveItem(Guid itemId)
    {
        var item = _items.FirstOrDefault(x => x.Id == itemId);

        if (item is null)
        {
            throw new InvalidOperationException(
                "The gemstone item was not found.");
        }

        _items.Remove(item);
        UpdatedAt = DateTime.UtcNow;
    }

    public void Publish()
    {
        IsPublished = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Unpublish()
    {
        IsPublished = false;
        UpdatedAt = DateTime.UtcNow;
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Product name is required.",
                nameof(name));
        }
    }

    private static void ValidateSlug(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException(
                "Product slug is required.",
                nameof(slug));
        }
    }

    private static void ValidateGemstoneType(Guid gemstoneTypeId)
    {
        if (gemstoneTypeId == Guid.Empty)
        {
            throw new ArgumentException(
                "Gemstone type is required.",
                nameof(gemstoneTypeId));
        }
    }
}
