# Ceylon Gem Atelier - API Documentation

## Overview

Ceylon Gem Atelier is a full-stack e-commerce platform for gemstone and jewelry management. This API provides RESTful endpoints for product catalogs, inventory management, reservations, sales, and administrative functions.

## Authentication

All protected endpoints require JWT bearer token authentication.

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 7200
}
```

### Using Token
```http
GET /api/catalog/products
Authorization: Bearer {token}
```

## Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://api.atelier.example.com`

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Catalog - List All Products
```http
GET /api/catalog/products
Response (200): Array of enriched product DTOs
```

#### Catalog - Get Product by Slug
```http
GET /api/catalog/products/{slug}
Response (200): Single product DTO with all items
```

#### Gemstone Items - List All Available Items
```http
GET /api/catalog/items
Response (200): Array of enriched gemstone item DTOs with reference names
Fields included:
  - id, stockNumber, caratWeight
  - shapeName, color, clarity, treatmentName
  - originName (country), status
  - productName, sellingPriceAmount, sellingPriceCurrency
```

#### Gemstone Items - Get Item Details
```http
GET /api/catalog/items/{id}/details
Response (200): Item with associated media and certificates
{
  "item": { ...GemstoneItemEnrichedDto },
  "media": [...],
  "certificates": [...]
}
```

#### Reference Data - All Shapes
```http
GET /api/catalog/reference/shapes
Response (200): Array of shape DTOs
```

#### Reference Data - All Treatments
```http
GET /api/catalog/reference/treatments
Response (200): Array of treatment DTOs
```

#### Reference Data - All Origins
```http
GET /api/catalog/reference/origins
Response (200): Array of origin DTOs
```

#### Reference Data - All Laboratories
```http
GET /api/catalog/reference/laboratories
Response (200): Array of laboratory DTOs
```

#### Dashboard - Summary Statistics
```http
GET /api/dashboard/summary
Response (200):
{
  "totalItems": 150,
  "availableItems": 85,
  "reservedItems": 20,
  "soldItems": 40,
  "unavailableItems": 5,
  "totalValueAmount": 450000.00,
  "totalValueCurrency": "USD",
  "totalProducts": 12,
  "publishedProducts": 10,
  "totalCertificates": 145,
  "unverifiedCertificates": 5,
  "itemsMissingMedia": 3,
  "pendingReservations": 8,
  "totalSales": 42,
  "recentActivity": [...]
}
```

#### Health Check
```http
GET /api/health
Response (200):
{
  "status": "healthy",
  "database": "ceylon_gem_atelier"
}
```

### Protected Endpoints (Admin/Manager Roles Required)

#### Catalog - Create Product
```http
POST /api/catalog/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ceylon Blue Sapphire",
  "slug": "ceylon-blue-sapphire",
  "gemstoneTypeId": "550e8400-e29b-41d4-a716-446655440000",
  "description": "Premium quality blue sapphires"
}

Response (201): Created product DTO with location header
```

#### Catalog - Update Product
```http
PUT /api/catalog/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ceylon Blue Sapphire Premium",
  "slug": "ceylon-blue-sapphire-premium",
  "description": "Premium quality blue sapphires"
}

Response (200): Updated product DTO
```

#### Catalog - Publish Product
```http
POST /api/catalog/products/{id}/publish
Authorization: Bearer {token}

Response (200): Published product DTO
```

#### Catalog - Unpublish Product
```http
POST /api/catalog/products/{id}/unpublish
Authorization: Bearer {token}

Response (200): Unpublished product DTO
```

#### Gemstone Items - Create Item
```http
POST /api/catalog/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "gemstoneProductId": "550e8400-e29b-41d4-a716-446655440000",
  "stockNumber": "CEYBLUESAP-001",
  "caratWeight": 2.5,
  "shapeId": "650e8400-e29b-41d4-a716-446655440001",
  "treatmentId": "750e8400-e29b-41d4-a716-446655440002",
  "originId": "850e8400-e29b-41d4-a716-446655440003",
  "color": "Blue",
  "clarity": "VS1",
  "sellingAmount": 1500,
  "sellingCurrency": "USD"
}

Response (201): Created item DTO
```

#### Gemstone Items - Update Item
```http
PUT /api/catalog/items/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "color": "Deep Blue",
  "clarity": "VVS1",
  "sellingAmount": 2000
}

Response (200): Updated item DTO
```

#### Gemstone Items - Reserve Item
```http
POST /api/catalog/items/{id}/reserve
Authorization: Bearer {token}

Response (200): Updated item with status = Reserved
```

#### Gemstone Items - Release Reservation
```http
POST /api/catalog/items/{id}/release
Authorization: Bearer {token}

Response (200): Updated item with status = Available
```

#### Gemstone Items - Mark as Sold
```http
POST /api/catalog/items/{id}/sell
Authorization: Bearer {token}

Response (200): Updated item with status = Sold
```

#### Gemstone Items - Mark as Unavailable
```http
POST /api/catalog/items/{id}/unavailable
Authorization: Bearer {token}

Response (200): Updated item with status = Unavailable
```

#### Media - Add Media to Item
```http
POST /api/catalog/items/{id}/media
Authorization: Bearer {token}
Content-Type: application/json

{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "Photo",
  "url": "https://cdn.example.com/photo-001.jpg",
  "altText": "Front view of sapphire",
  "sortOrder": 1
}

Response (201): Created media DTO
```

#### Media - Update Media
```http
PUT /api/catalog/items/{itemId}/media/{mediaId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "Photo",
  "url": "https://cdn.example.com/photo-001-updated.jpg",
  "altText": "Updated front view",
  "sortOrder": 1
}

Response (200): Updated media DTO
```

#### Media - Set as Primary
```http
POST /api/catalog/items/{itemId}/media/{mediaId}/primary
Authorization: Bearer {token}

Response (200): Updated media with isPrimary = true
```

#### Certificates - Add Certificate
```http
POST /api/catalog/items/{id}/certificates
Authorization: Bearer {token}
Content-Type: application/json

{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "laboratoryId": "950e8400-e29b-41d4-a716-446655440004",
  "certificateNumber": "GIA-2024-001234",
  "issueDate": "2024-01-15T00:00:00Z",
  "reportType": "Gemstone Report",
  "certifiedCaratWeight": 2.5,
  "treatmentStatement": "Heat Treatment Applied"
}

Response (201): Created certificate DTO
```

#### Certificates - Verify Certificate
```http
POST /api/catalog/items/{itemId}/certificates/{certId}/verify
Authorization: Bearer {token}

Response (200): Certificate with isVerified = true
```

#### Reservations - Get All Reservations
```http
GET /api/catalog/reservations
Authorization: Bearer {token}

Response (200): Array of reservation DTOs
```

#### Reservations - Create Reservation
```http
POST /api/catalog/reservations
Authorization: Bearer {token}
Content-Type: application/json

{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1-555-0123",
  "preferredDate": "2024-02-15T00:00:00Z",
  "message": "Interested in this beautiful sapphire"
}

Response (201): Created reservation DTO with Pending status
```

#### Reservations - Confirm Reservation
```http
POST /api/catalog/reservations/{id}/confirm
Authorization: Bearer {token}

Response (200): Reservation with status = Confirmed
```

#### Reservations - Complete Reservation
```http
POST /api/catalog/reservations/{id}/complete
Authorization: Bearer {token}

Response (200): Reservation with status = Completed
```

#### Reservations - Cancel Reservation
```http
POST /api/catalog/reservations/{id}/cancel
Authorization: Bearer {token}

Response (200): Reservation with status = Cancelled
```

#### Sales - Create Sale
```http
POST /api/catalog/sales
Authorization: Bearer {token}
Content-Type: application/json

{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "Jane Smith",
  "buyerEmail": "jane@example.com",
  "priceAmount": 1500,
  "priceCurrency": "USD",
  "notes": "Delivered via courier"
}

Response (201): Created sale DTO with PaymentStatus = Pending
```

#### Reference Data Admin - Create Gemstone Type
```http
POST /api/catalog/reference/admin/gemstone-types
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ruby",
  "description": "Precious red gemstone"
}

Response (201): Created gemstone type DTO
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "0HN1GDN6B2QHU:00000001",
  "errors": {
    "fieldName": ["Error message 1", "Error message 2"]
  }
}
```

### Status Codes
- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **204**: No Content - Request successful, no body
- **400**: Bad Request - Invalid input or validation error
- **401**: Unauthorized - Missing or invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **409**: Conflict - Business rule violation (e.g., duplicate stock number, invalid status transition)
- **500**: Internal Server Error - Server error

## Rate Limiting

- **Limit**: 100 requests per minute per API key/IP
- **Headers**:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: requests remaining
  - `X-RateLimit-Reset`: Unix timestamp of reset

## Pagination

List endpoints support pagination:
```http
GET /api/catalog/items?page=1&pageSize=20
```

Response includes:
- `data`: Array of items
- `pageNumber`: Current page
- `pageSize`: Items per page
- `totalCount`: Total items
- `hasNextPage`: Whether next page exists

## Webhooks (Future)

Webhooks for:
- Product published/unpublished
- Item reserved/released
- Sale completed
- Reservation confirmed/completed

---

**API Version**: 1.0
**Last Updated**: 2024
**Contact**: api-support@atelier.example.com
