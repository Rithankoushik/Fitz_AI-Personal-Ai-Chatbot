# Docker Setup Guide

Run the entire FitAI stack with Docker Compose.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed
- Google Gemini API key

## Quick Start

1. **Create environment file:**

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-super-secret-jwt-key-change-this
GEMINI_API_KEY=your-gemini-api-key-here
```

2. **Start all services:**

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 8000
- Frontend on port 5173

3. **View logs:**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

4. **Access the application:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

5. **Stop all services:**

```bash
docker-compose down
```

6. **Stop and remove volumes (database data):**

```bash
docker-compose down -v
```

## Development Workflow

### Backend Changes

The backend code is mounted as a volume and will auto-reload on changes.

### Frontend Changes

The frontend also has hot module replacement enabled.

### Rebuild Images

If you change dependencies:

```bash
docker-compose build
docker-compose up -d
```

## Production Deployment

For production, use optimized Dockerfiles:

**server/Dockerfile.prod:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

**client/Dockerfile.prod:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Port Already in Use

Change ports in `docker-compose.yml`:

```yaml
ports:
  - "8001:8000"  # Change host port
```

### MongoDB Connection Issues

Ensure MongoDB is healthy:

```bash
docker-compose ps
docker-compose logs mongodb
```

### Clear Everything and Restart

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build -d
```

## Useful Commands

```bash
# Enter backend container
docker exec -it fitai-backend bash

# Enter frontend container
docker exec -it fitai-frontend sh

# Enter MongoDB shell
docker exec -it fitai-mongodb mongosh

# View resource usage
docker stats

# Check service health
docker-compose ps
```

