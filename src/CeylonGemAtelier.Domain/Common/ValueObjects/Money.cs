namespace CeylonGemAtelier.Domain.Common.ValueObjects;

public sealed record Money
{
    public decimal Amount { get; }

    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        if (amount < 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(amount),
                "Money amount cannot be negative.");
        }

        if (string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException(
                "Currency is required.",
                nameof(currency));
        }

        Currency = currency.Trim().ToUpperInvariant();

        if (Currency.Length != 3)
        {
            throw new ArgumentException(
                "Currency must use a 3-letter ISO code.",
                nameof(currency));
        }

        Amount = amount;
    }

    public override string ToString()
    {
        return $"{Amount:0.00} {Currency}";
    }
}
