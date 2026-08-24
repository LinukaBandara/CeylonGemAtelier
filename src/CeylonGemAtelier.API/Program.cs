using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Application.Catalog.Services;
using CeylonGemAtelier.Infrastructure.Persistence;
using CeylonGemAtelier.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IGemstoneProductRepository, GemstoneProductRepository>();
builder.Services.AddScoped<IGemstoneCatalogService, GemstoneCatalogService>();

builder.Services.AddScoped<IGemstoneTypeRepository, GemstoneTypeRepository>();
builder.Services.AddScoped<GemstoneTypeService>();

builder.Services.AddScoped<IGemstoneVarietyRepository, GemstoneVarietyRepository>();
builder.Services.AddScoped<IShapeRepository, ShapeRepository>();
builder.Services.AddScoped<ITreatmentRepository, TreatmentRepository>();
builder.Services.AddScoped<IOriginRepository, OriginRepository>();
builder.Services.AddScoped<ILaboratoryRepository, LaboratoryRepository>();

builder.Services.AddScoped<ReferenceDataService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/health", async (
    ApplicationDbContext dbContext,
    CancellationToken cancellationToken) =>
{
    var databaseHealthy = await dbContext.Database.CanConnectAsync(
        cancellationToken);

    return Results.Ok(new
    {
        status = databaseHealthy ? "healthy" : "unhealthy",
        database = databaseHealthy
            ? "ceylon_gem_atelier"
            : "unavailable"
    });
});

app.MapControllers();
app.Run();