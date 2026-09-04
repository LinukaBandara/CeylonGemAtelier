# Ceylon Gem Atelier

A full-stack gemstone atelier platform combining a public-facing luxury gem experience with an authenticated management dashboard and ASP.NET Core API.

## Architecture

- **Public website:** Next.js + React + TypeScript (`public-web/`)
- **Management dashboard:** React + Vite (`frontend/`)
- **Backend:** ASP.NET Core / .NET 10 (`src/`)
- **Database:** PostgreSQL with Entity Framework Core migrations
- **Authentication:** JWT-based API authentication with configured users
- **Testing:** Unit and integration test projects under `tests/`

## Repository Structure

```text
CeylonGemAtelier/
├── public-web/                 # Public CGA website
├── frontend/                   # Admin / management dashboard
├── src/                        # API, application, domain and infrastructure
├── tests/                      # Unit and integration tests
├── .github/workflows/          # CI
├── API_DOCUMENTATION.md       # API reference
├── DEPLOYMENT.md               # Deployment guide
├── PRODUCTION_READINESS_REPORT.md
├── PROJECT_COMPLETION_SUMMARY.md
└── CeylonGemAtelier.slnx
```

## Development

### Public website

```bash
cd public-web
npm install
npm run dev
```

### Management dashboard

```bash
cd frontend
npm install
npm run dev
```

### API

```bash
dotnet restore
 dotnet build
 dotnet test
```

Configure secrets and environment-specific settings locally; do not commit credentials or production secrets.

## Documentation

- [API Documentation](API_DOCUMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Production Readiness Report](PRODUCTION_READINESS_REPORT.md)
- [Project Completion Summary](PROJECT_COMPLETION_SUMMARY.md)

## Production

The repository contains separate applications for the public website and internal dashboard. Deploy each application using its respective environment configuration and keep database credentials, JWT secrets and other sensitive values outside source control.
