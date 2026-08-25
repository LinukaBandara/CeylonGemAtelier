using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Application.Catalog.Services;
using CeylonGemAtelier.Infrastructure.Persistence;
using CeylonGemAtelier.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using CeylonGemAtelier.Infrastructure.Persistence.Seed;
using CeylonGemAtelier.API.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

var dataSourceBuilder = new NpgsqlDataSourceBuilder(
    builder.Configuration.GetConnectionString("DefaultConnection"));

dataSourceBuilder.EnableDynamicJson();

var dataSource = dataSourceBuilder.Build();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(dataSource);
});

builder.Services.AddScoped<IGemstoneProductRepository, GemstoneProductRepository>();
builder.Services.AddScoped<IGemstoneItemRepository, GemstoneItemRepository>();
builder.Services.AddScoped<IGemstoneMediaRepository, GemstoneMediaRepository>();
builder.Services.AddScoped<ICertificateRepository, CertificateRepository>();
builder.Services.AddScoped<IGemstoneMediaRepository, GemstoneMediaRepository>();
builder.Services.AddScoped<ICertificateRepository, CertificateRepository>();
builder.Services.AddScoped<IGemstoneCatalogService, GemstoneCatalogService>();
builder.Services.AddScoped<GemstoneItemService>();
builder.Services.AddScoped<GemstoneCatalogDetailsService>();
builder.Services.AddScoped<GemstoneItemDetailsService>();
builder.Services.AddScoped<GemstoneMediaService>();
builder.Services.AddScoped<CertificateService>();
builder.Services.AddScoped<GemstoneMediaService>();
builder.Services.AddScoped<CertificateService>();

builder.Services.AddScoped<IGemstoneTypeRepository, GemstoneTypeRepository>();
builder.Services.AddScoped<GemstoneTypeService>();

builder.Services.AddScoped<IGemstoneVarietyRepository, GemstoneVarietyRepository>();
builder.Services.AddScoped<IShapeRepository, ShapeRepository>();
builder.Services.AddScoped<ITreatmentRepository, TreatmentRepository>();
builder.Services.AddScoped<IOriginRepository, OriginRepository>();
builder.Services.AddScoped<ILaboratoryRepository, LaboratoryRepository>();

builder.Services.AddScoped<ReferenceDataService>();

var app = builder.Build();

app.UseExceptionHandler();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await db.Database.MigrateAsync();

    CatalogSeedData.Seed(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI();
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

public partial class Program;



