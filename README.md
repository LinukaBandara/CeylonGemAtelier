# Ceylon Gem Atelier

A full-stack gemstone atelier platform built around a premium public gem experience and an authenticated management system.

## Overview

Ceylon Gem Atelier combines a customer-facing gemstone website with an internal dashboard and a layered .NET API. The system is designed around real gemstone inventory workflows, reservations, sales, certificates, reference data, and role-based administration.

## Architecture

- **Public website:** Next.js + React + TypeScript — `public-web/`
- **Management dashboard:** React + Vite — `frontend/`
- **Backend API:** ASP.NET Core / .NET 10 — `src/`
- **Database:** PostgreSQL + Entity Framework Core
- **Authentication:** JWT-based authentication and role-based authorization
- **Testing:** Unit and integration test projects — `tests/`

## Core capabilities

- Gemstone product and individual-item management
- Inventory status workflows
- Customer reservations
- Sales and payment-status workflows
- Gemstone certificates and verification
- Gemstone media management
- Reference data management for types, shapes, treatments, origins, and laboratories
- Protected management operations with role-based authorization
- Public catalog endpoints for the website
- Layered architecture separating domain, application, infrastructure, and API concerns

## Repository structure

```text
CeylonGemAtelier/
├── public-web/                 # Public-facing Next.js website
├── frontend/                   # Internal React/Vite dashboard
├── src/                        # .NET API, application, domain and infrastructure
├── tests/                      # Unit and integration tests
├── .github/workflows/          # CI workflows
├── API_DOCUMENTATION.md        # API reference
├── DEPLOYMENT.md               # Deployment and environment guide
└── CeylonGemAtelier.slnx      # .NET solution
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

### API and tests

```bash
dotnet restore
dotnet build
dotnet test
```

Configure secrets and environment-specific settings locally. **Never commit credentials, JWT secrets, database passwords, or production environment files.**

## Documentation

- [API Documentation](API_DOCUMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)

## Production configuration

Production configuration is supplied through the deployment environment rather than source control. Database connection strings, JWT secrets, authentication configuration, CORS origins, and other sensitive values should be managed through the hosting platform's environment variables or secret store.

## Project focus

Ceylon Gem Atelier is intended as a portfolio-quality full-stack system demonstrating modern web development across frontend applications, backend APIs, relational data modeling, authentication, business workflows, testing, and deployment practices.
