# Ceylon Gem Atelier — API Documentation

## Overview

Ceylon Gem Atelier is a full-stack platform for gemstone and jewelry catalog, inventory, reservations, sales, and administration.

## Authentication

Protected endpoints require a JWT bearer token.

### Login

`POST /api/auth/login`

Request:

```json
{
  "username": "<configured-username>",
  "password": "<configured-password>"
}
```

Credentials are **not stored in this repository**. The API reads configured users from `Auth:Users`, supplied through environment variables or a secret manager in deployed environments. Do not copy real credentials into documentation, source code, or issue comments.

Response:

```json
{
  "token": "<jwt-token>",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### Using a token

```http
GET /api/catalog/products
Authorization: Bearer <jwt-token>
```

## Base URL

- **Development**: `https://localhost:5001` (or the configured local API URL)
- **Production**: use the deployed API origin configured for the environment

For a same-domain deployment, the frontend can call the API through the same origin. For separate frontend/API deployments, configure `CorsPolicy:AllowedOrigins` with only trusted frontend origins.

## API Endpoints

### Public endpoints

#### Catalog

```http
GET /api/catalog/products
GET /api/catalog/products/{slug}
GET /api/catalog/items
GET /api/catalog/items/{id}/details
```

#### Reference data

```http
GET /api/catalog/reference/shapes
GET /api/catalog/reference/treatments
GET /api/catalog/reference/origins
GET /api/catalog/reference/laboratories
```

#### Dashboard and health

```http
GET /api/dashboard/summary
GET /api/health
```

#### Authentication

```http
POST /api/auth/login
```

### Protected endpoints

Protected catalog, inventory, media, certificate, reservation, sales, and reference-administration operations require an authenticated JWT and the role allowed by the controller policy (currently Admin/Manager for administrative operations).

#### Products

```http
POST /api/catalog/products
PUT /api/catalog/products/{id}
POST /api/catalog/products/{id}/publish
POST /api/catalog/products/{id}/unpublish
```

Example create request:

```json
{
  "name": "Ceylon Blue Sapphire",
  "slug": "ceylon-blue-sapphire",
  "gemstoneTypeId": "550e8400-e29b-41d4-a716-446655440000",
  "description": "Premium quality blue sapphires"
}
```

#### Gemstone items

```http
POST /api/catalog/items
PUT /api/catalog/items/{id}
POST /api/catalog/items/{id}/reserve
POST /api/catalog/items/{id}/release
POST /api/catalog/items/{id}/sell
POST /api/catalog/items/{id}/unavailable
```

Example create request:

```json
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
```

#### Media

```http
POST /api/catalog/items/{id}/media
PUT /api/catalog/items/{itemId}/media/{mediaId}
POST /api/catalog/items/{itemId}/media/{mediaId}/primary
```

#### Certificates

```http
POST /api/catalog/items/{id}/certificates
POST /api/catalog/items/{itemId}/certificates/{certId}/verify
```

#### Reservations

```http
GET /api/catalog/reservations
POST /api/catalog/reservations
POST /api/catalog/reservations/{id}/confirm
POST /api/catalog/reservations/{id}/complete
POST /api/catalog/reservations/{id}/cancel
```

Example reservation request:

```json
{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1-555-0123",
  "preferredDate": "2024-02-15T00:00:00Z",
  "message": "Interested in this beautiful sapphire"
}
```

#### Sales

```http
POST /api/catalog/sales
```

Example:

```json
{
  "gemstoneItemId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "Jane Smith",
  "buyerEmail": "jane@example.com",
  "priceAmount": 1500,
  "priceCurrency": "USD",
  "notes": "Delivered via courier"
}
```

#### Reference administration

```http
POST /api/catalog/reference/admin/gemstone-types
```

## Error responses

Validation and application errors use standard HTTP status codes. Protected resources return `401 Unauthorized` when authentication is missing or invalid and `403 Forbidden` when the authenticated user lacks the required role.

Example validation response:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "<trace-id>",
  "errors": {
    "fieldName": ["Error message"]
  }
}
```

### Status codes

- **200** — Request successful
- **201** — Resource created
- **204** — Request successful with no response body
- **400** — Invalid input or validation error
- **401** — Missing or invalid authentication
- **403** — Insufficient permissions
- **404** — Resource not found
- **409** — Business-rule conflict
- **500** — Unexpected server error

## Security notes

- Never commit real usernames/passwords, JWT secrets, database credentials, or API keys.
- Configure `Jwt:SecretKey` outside source control; production requires at least 32 characters and rejects the known development placeholder.
- Configure `ConnectionStrings:DefaultConnection` outside source control.
- Configure trusted browser origins through `CorsPolicy:AllowedOrigins`.
- Do not put real credentials in API examples, screenshots, tests, or deployment documentation.

## Pagination

Where supported, list endpoints may accept pagination parameters such as:

```http
GET /api/catalog/items?page=1&pageSize=20
```

Use the actual response schema exposed by the running API/OpenAPI document as the source of truth for pagination fields.

## API Version

**Version:** 1.0  
**Documentation status:** Maintained alongside the implementation
