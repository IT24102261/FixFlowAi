# FixFlow

AI-assisted repair and workflow platform with a .NET API, React web client, and Flutter mobile app.

## Repository layout

```
FixFlow/
├── backend/
│   ├── FixFlow.Api/            # HTTP API, middleware, configuration
│   ├── FixFlow.Application/    # DTOs, services, validators, agents
│   ├── FixFlow.Domain/         # Entities, enums, constants, rules
│   ├── FixFlow.Infrastructure/ # Persistence, auth, storage, integrations
│   └── FixFlow.Tests/          # Unit, integration, security, agent tests
├── web/                        # React + TypeScript (Vite)
├── mobile/                     # Flutter client
├── docs/                       # Requirements, architecture, ADRs, API notes
├── .github/workflows/ci.yml
├── docker-compose.yml
├── .env.example
└── FixFlow.sln
```

## Prerequisites

- .NET 8 SDK
- Node.js 22+
- Flutter 3.x
- Docker (optional, for local Postgres and containers)

## Getting started

1. Copy environment values:

```bash
cp .env.example .env
```

2. Run the API:

```bash
dotnet run --project backend/FixFlow.Api
```

3. Run the web client:

```bash
cd web
npm install
npm run dev
```

4. Run the mobile app:

```bash
cd mobile
flutter run
```

5. Or start backing services with Docker:

```bash
docker compose up postgres
```

## Health check

`GET /api/health` returns API status once the backend is running.

## Documentation

Product and engineering notes live under `docs/`:

- `docs/requirements/`
- `docs/architecture/`
- `docs/adr/`
- `docs/api/`
- `docs/testing/`
- `docs/ai-usage/`
