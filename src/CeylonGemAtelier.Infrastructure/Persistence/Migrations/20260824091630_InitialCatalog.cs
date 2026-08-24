using System;
using CeylonGemAtelier.Domain.Common.ValueObjects;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CeylonGemAtelier.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "certificates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GemstoneItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    LaboratoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    CertificateNumber = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    IssueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReportType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CertifiedCaratWeight = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: true),
                    TreatmentStatement = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReportUrl = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_certificates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "gemstone_media",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GemstoneItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    AltText = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gemstone_media", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "gemstone_products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Slug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    GemstoneTypeId = table.Column<Guid>(type: "uuid", nullable: false),
                    GemstoneVarietyId = table.Column<Guid>(type: "uuid", nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gemstone_products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneVarieties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GemstoneTypeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneVarieties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Laboratories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ShortCode = table.Column<string>(type: "text", nullable: false),
                    Website = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Origins",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: true),
                    Mine = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Origins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shapes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shapes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treatments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "gemstone_items",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GemstoneProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    StockNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CaratWeight = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: false),
                    ShapeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Color = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Clarity = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    TreatmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    OriginId = table.Column<Guid>(type: "uuid", nullable: true),
                    LengthMm = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: true),
                    WidthMm = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: true),
                    DepthMm = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: true),
                    AcquisitionCost = table.Column<Money>(type: "jsonb", nullable: true),
                    SellingPrice = table.Column<Money>(type: "jsonb", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gemstone_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_gemstone_items_gemstone_products_GemstoneProductId",
                        column: x => x.GemstoneProductId,
                        principalTable: "gemstone_products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_certificates_CertificateNumber",
                table: "certificates",
                column: "CertificateNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_certificates_GemstoneItemId",
                table: "certificates",
                column: "GemstoneItemId");

            migrationBuilder.CreateIndex(
                name: "IX_certificates_LaboratoryId",
                table: "certificates",
                column: "LaboratoryId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_GemstoneProductId",
                table: "gemstone_items",
                column: "GemstoneProductId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_OriginId",
                table: "gemstone_items",
                column: "OriginId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_ShapeId",
                table: "gemstone_items",
                column: "ShapeId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_Status",
                table: "gemstone_items",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_StockNumber",
                table: "gemstone_items",
                column: "StockNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_items_TreatmentId",
                table: "gemstone_items",
                column: "TreatmentId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_media_GemstoneItemId",
                table: "gemstone_media",
                column: "GemstoneItemId");

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_media_GemstoneItemId_SortOrder",
                table: "gemstone_media",
                columns: new[] { "GemstoneItemId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_gemstone_products_Slug",
                table: "gemstone_products",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "certificates");

            migrationBuilder.DropTable(
                name: "gemstone_items");

            migrationBuilder.DropTable(
                name: "gemstone_media");

            migrationBuilder.DropTable(
                name: "GemstoneTypes");

            migrationBuilder.DropTable(
                name: "GemstoneVarieties");

            migrationBuilder.DropTable(
                name: "Laboratories");

            migrationBuilder.DropTable(
                name: "Origins");

            migrationBuilder.DropTable(
                name: "Shapes");

            migrationBuilder.DropTable(
                name: "Treatments");

            migrationBuilder.DropTable(
                name: "gemstone_products");
        }
    }
}
