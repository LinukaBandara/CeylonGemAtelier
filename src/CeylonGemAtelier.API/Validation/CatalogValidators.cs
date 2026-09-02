using CeylonGemAtelier.Application.Catalog.DTOs;
using FluentValidation;

namespace CeylonGemAtelier.API.Validation;

public class CreateGemstoneProductRequestValidator : AbstractValidator<CreateGemstoneProductRequest>
{
    public CreateGemstoneProductRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required")
            .Length(3, 200).WithMessage("Product name must be between 3 and 200 characters");

        RuleFor(x => x.Slug)
            .NotEmpty().WithMessage("Product slug is required")
            .Length(3, 100).WithMessage("Slug must be between 3 and 100 characters")
            .Matches(@"^[a-z0-9-]+$").WithMessage("Slug can only contain lowercase letters, numbers, and hyphens");

        RuleFor(x => x.GemstoneTypeId)
            .NotEqual(Guid.Empty).WithMessage("Gemstone type is required");

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters");
    }
}

public class CreateGemstoneItemRequestValidator : AbstractValidator<CreateGemstoneItemRequest>
{
    public CreateGemstoneItemRequestValidator()
    {
        RuleFor(x => x.StockNumber)
            .NotEmpty().WithMessage("Stock number is required")
            .MaximumLength(50).WithMessage("Stock number must not exceed 50 characters");

        RuleFor(x => x.CaratWeight)
            .GreaterThan(0).WithMessage("Carat weight must be greater than zero")
            .LessThanOrEqualTo(1000).WithMessage("Carat weight cannot exceed 1000");

        RuleFor(x => x.GemstoneProductId)
            .NotEqual(Guid.Empty).WithMessage("Gemstone product is required");

        RuleFor(x => x.ShapeId)
            .NotEqual(Guid.Empty).WithMessage("Shape is required");

        RuleFor(x => x.TreatmentId)
            .NotEqual(Guid.Empty).WithMessage("Treatment is required");

        RuleFor(x => x.SellingAmount)
            .GreaterThan(0).When(x => x.SellingAmount.HasValue)
            .WithMessage("Selling price must be greater than zero");

        RuleFor(x => x.AcquisitionAmount)
            .GreaterThan(0).When(x => x.AcquisitionAmount.HasValue)
            .WithMessage("Acquisition price must be greater than zero");
    }
}

public class CreateReservationRequestValidator : AbstractValidator<CreateReservationRequest>
{
    public CreateReservationRequestValidator()
    {
        RuleFor(x => x.GemstoneItemId)
            .NotEqual(Guid.Empty).WithMessage("Gemstone item is required");

        RuleFor(x => x.CustomerName)
            .NotEmpty().WithMessage("Customer name is required")
            .Length(2, 100).WithMessage("Customer name must be between 2 and 100 characters");

        RuleFor(x => x.CustomerEmail)
            .NotEmpty().WithMessage("Customer email is required")
            .EmailAddress().WithMessage("Customer email must be a valid email address");

        RuleFor(x => x.CustomerPhone)
            .Length(7, 20).When(x => !string.IsNullOrEmpty(x.CustomerPhone))
            .WithMessage("Customer phone must be between 7 and 20 characters");

        RuleFor(x => x.PreferredDate)
            .GreaterThan(DateTime.UtcNow).When(x => x.PreferredDate.HasValue)
            .WithMessage("Preferred date must be in the future");

        RuleFor(x => x.Message)
            .MaximumLength(1000).WithMessage("Message must not exceed 1000 characters");
    }
}

public class CreateSaleRequestValidator : AbstractValidator<CreateSaleRequest>
{
    public CreateSaleRequestValidator()
    {
        RuleFor(x => x.GemstoneItemId)
            .NotEqual(Guid.Empty).WithMessage("Gemstone item is required");

        RuleFor(x => x.BuyerName)
            .NotEmpty().WithMessage("Buyer name is required")
            .Length(2, 100).WithMessage("Buyer name must be between 2 and 100 characters");

        RuleFor(x => x.BuyerEmail)
            .EmailAddress().When(x => !string.IsNullOrEmpty(x.BuyerEmail))
            .WithMessage("Buyer email must be a valid email address");

        RuleFor(x => x.PriceAmount)
            .GreaterThan(0).WithMessage("Sale price must be greater than zero");

        RuleFor(x => x.PriceCurrency)
            .NotEmpty().WithMessage("Currency is required")
            .Length(3, 3).WithMessage("Currency must be a valid 3-letter code");

        RuleFor(x => x.Notes)
            .MaximumLength(1000).WithMessage("Notes must not exceed 1000 characters");
    }
}
