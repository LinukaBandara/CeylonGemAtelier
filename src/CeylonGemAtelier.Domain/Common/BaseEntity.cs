namespace CeylonGemAtelier.Domain.Common;

public abstract class BaseEntity
{
    public Guid Id { get; protected set; }

    public DateTime CreatedAt { get; protected set; }

    public DateTime? UpdatedAt { get; protected set; }

    protected BaseEntity()
        : this(Guid.NewGuid())
    {
    }

    protected BaseEntity(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new ArgumentException(
                "Entity ID is required.",
                nameof(id));
        }

        Id = id;
        CreatedAt = DateTime.UtcNow;
    }
}
