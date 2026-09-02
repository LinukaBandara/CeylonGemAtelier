# Ceylon Gem Atelier — Deployment Guide

This guide covers production deployment for the API, admin dashboard, and public website.

## Production checklist

### 1. Database
- [ ] Provision PostgreSQL 18+ (or a supported managed PostgreSQL service).
- [ ] Create a dedicated application database/user with least-privilege access.
- [ ] Configure the production connection string through environment variables or a secret manager.
- [ ] Apply the committed EF Core migrations before release.
- [ ] Configure automated backups and test restores.
- [ ] Enable TLS for database connections when supported by the provider.

### 2. Secrets and configuration
**Never commit production passwords, JWT secrets, API keys, or other credentials.**

Configure these outside source control:
- `ASPNETCORE_ENVIRONMENT=Production`
- `ConnectionStrings__DefaultConnection=<production PostgreSQL connection string>`
- `Jwt__SecretKey=<random secret of at least 32 characters>`
- `Jwt__Issuer=CeylonGemAtelier`
- `Jwt__Audience=CeylonGemAtelier.API`
- `Jwt__ExpiryMinutes=60` (or the approved production value)
- `CorsPolicy__AllowedOrigins__0=https://<admin-domain>`
- Additional `CorsPolicy__AllowedOrigins__N` entries only for trusted browser origins.
- `Auth__Users` containing configured application users, supplied through a secret manager/environment variable. Do not store real passwords in this repository.

The API rejects the default JWT placeholder and requires a production database connection string.

### 3. API deployment
```bash
dotnet restore CeylonGemAtelier.slnx
dotnet build CeylonGemAtelier.slnx --configuration Release
dotnet test CeylonGemAtelier.slnx --configuration Release
dotnet publish src/CeylonGemAtelier.API/CeylonGemAtelier.API.csproj -c Release -o ./publish
```

Deploy the published API to Railway, Render, Azure, Docker, IIS, or another .NET-compatible host.

Production requirements:
- HTTPS/TLS enabled.
- `/api/health` monitored.
- Secrets supplied by the hosting platform/secret manager.
- Production exception details disabled for clients.
- Application and infrastructure logs monitored.
- Automatic restart/health checks enabled where supported.

### 4. Admin dashboard
The Vite/React dashboard supports either same-origin `/api` routing or a separate API origin.

For a separate API:
```text
VITE_API_BASE_URL=https://api.<your-domain>
```

Build:
```bash
cd frontend
npm ci
npm run lint
npm run build
```

Deploy the generated `dist/` directory to your static host/CDN.

### 5. Public website
The Next.js public website remains separate from the admin dashboard.

For a separate API:
```text
NEXT_PUBLIC_API_URL=https://api.<your-domain>
```

Build:
```bash
cd public-web
npm ci
npm run lint
npm run build
```

Deploy to Vercel or another Next.js-compatible host.

### 6. Security hardening
- [ ] HTTPS everywhere.
- [ ] Restrict CORS to known browser origins.
- [ ] Add rate limiting at the API/edge layer before exposing login publicly.
- [ ] Keep database credentials out of source control.
- [ ] Rotate JWT secrets according to the operational policy.
- [ ] Use a dedicated production database account.
- [ ] Monitor failed authentication attempts without logging passwords or tokens.
- [ ] Keep .NET, Node, PostgreSQL, and dependencies patched.

### 7. Smoke tests after deployment
```text
GET /api/health                         -> 200
POST /api/auth/login (valid config)    -> 200
POST /api/auth/login (bad password)    -> 401
Protected endpoint without JWT         -> 401/403
Public catalog endpoint                -> expected catalog response
```

Do not put real production credentials in smoke-test commands or documentation.

### 8. CI/CD
GitHub Actions validates:
- .NET restore/build/test
- Admin frontend install/lint/build
- Public website install/lint/build

A release should only be promoted after the workflow is green.

### 9. Backups and recovery
- [ ] Daily database backups at minimum.
- [ ] Provider-supported point-in-time recovery where appropriate.
- [ ] Monthly restore test.
- [ ] Production release tags.
- [ ] Document rollback procedure.
- [ ] Keep uploaded gemstone media backed up separately from the database if object storage is used.

### 10. Performance
Start with the simplest reliable deployment. Add Redis, read replicas, CDN caching, pagination, or horizontal API scaling only when measured traffic requires them.

Recommended monitoring targets:
- API error rate
- p95 response time
- database connection health
- CPU/memory usage
- authentication failures
- storage usage

## Same-domain architecture

A reverse proxy can serve:
- `/` → frontend/public website
- `/api/*` → ASP.NET Core API

This avoids browser CORS for same-origin requests.

## Separate-domain architecture

Example:
- Admin: `https://admin.<your-domain>`
- Public: `https://www.<your-domain>`
- API: `https://api.<your-domain>`

Configure the API CORS allow-list with only the actual admin/public origins and set the corresponding frontend environment variables.

## Production authentication note

The authentication endpoint reads configured users instead of embedding credentials in source code. Production credentials must be supplied through a secret manager or environment configuration. For a larger deployment, replace this lightweight configuration-backed authentication with a dedicated identity provider/user store and password hashing.

---

**Deployment guide status:** production-oriented and credential-free.
**Last reviewed:** September 2026
