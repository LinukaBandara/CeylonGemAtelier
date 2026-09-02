using CeylonGemAtelier.Application.Catalog.Interfaces;
using CeylonGemAtelier.Application.Catalog.Services;
using CeylonGemAtelier.Infrastructure.Persistence;
using CeylonGemAtelier.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using CeylonGemAtelier.Infrastructure.Persistence.Seed;
using CeylonGemAtelier.API.Infrastructure;
using CeylonGemAtelier.API.Infrastructure.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
using FluentValidation;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog for production-grade logging
builder.Host.UseSerilog((context, config) =>
{
    config
        .MinimumLevel.Information()
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
        .WriteTo.File(
            path: Path.Combine("logs", "ceylon-gem-atelier-.txt"),
            rollingInterval: RollingInterval.Day,
            outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} [{Level:u3}] {Message:lj}{NewLine}{Exception}",
            retainedFileCountLimit: 7)
        .Enrich.FromLogContext()
        .Enrich.WithProperty("Application", "CeylonGemAtelier.API");

    if (!context.HostingEnvironment.IsProduction())
    {
        config.MinimumLevel.Debug();
    }
});

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Add FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));

// Add authentication service
builder.Services.AddScoped<IAuthenticationService, JwtAuthenticationService>();

// Configure JWT authentication
var jwtSecretKey = builder.Configuration["Jwt:SecretKey"];
if (string.IsNullOrEmpty(jwtSecretKey))
{
    throw new InvalidOperationException("JWT secret key is not configured");
}

var key = Encoding.ASCII.GetBytes(jwtSecretKey);
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "CeylonGemAtelier",
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "CeylonGemAtelier.API",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception is SecurityTokenExpiredException)
                {
                    context.Response.Headers["Token-Expired"] = "true";
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

// Configure CORS
var allowedOrigins = builder.Configuration.GetSection("CorsPolicy:AllowedOrigins")
    .Get<string[]>() ?? new[] { "http://localhost:3000", "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

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
builder.Services.AddScoped<ReferenceDataAdminService>();

builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<ReservationService>();

builder.Services.AddScoped<ISaleRepository, SaleRepository>();
builder.Services.AddScoped<SaleService>();

builder.Services.AddScoped<IAtelierSettingsRepository, AtelierSettingsRepository>();
builder.Services.AddScoped<AtelierSettingsService>();

builder.Services.AddScoped<DashboardService>();

var app = builder.Build();

app.UseExceptionHandler();
app.UseCors("AllowFrontend");

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

// Add authentication and authorization middleware BEFORE MapControllers
app.UseAuthentication();
app.UseAuthorization();

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



