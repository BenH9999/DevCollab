# DevCollab

A real-time collaborative editor for developers to code together in the same document simultaneously, supporting live editing, conflict resolution, and team communication.

## Features

- Multi-user live editing with real-time updates
- Version history and conflict resolution
- User presence indicators and role-based permissions
- In-document chat for team communication

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Next.js
- **Backend**: Go, WebSockets, PostgreSQL

## Quick Start

### Backend

#### Using Docker (Recommended)

The easiest way to run the backend and database is using Docker:

```bash
# Start the backend and database with Docker Compose
docker-compose up -d

# To stop the services
docker-compose down
```

This will start both the PostgreSQL database and the backend API server.
Backend API will be available at http://localhost:8080

#### Manual Backend Setup

```bash
# Navigate to backend directory
cd backend

# Run the Go server
go run cmd/server/main.go
```

### Frontend

The frontend needs to be run separately:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at http://localhost:3000

## Environment Variables

Create a `.env` file in the root directory to customize the backend configuration:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=DevCollab
DB_PORT=5432
API_PORT=8080
```

## Requirements

- Docker & Docker Compose (for containerized backend)
- Go 1.19+ (for manual backend setup)
- PostgreSQL 14+ (if not using Docker)
- Node.js 18+ (for frontend)

## License

MIT
