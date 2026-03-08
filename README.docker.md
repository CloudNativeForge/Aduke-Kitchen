# Aduke's Kitchen - Docker Setup

This guide will help you run Aduke's Kitchen locally using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Quick Start

### 1. Clone or navigate to the project directory

```bash
cd /path/to/adukes-kitchen
```

### 2. Start all services

```bash
docker-compose up --build
```

This command will:
- Build the frontend and backend Docker images
- Start MongoDB database
- Start the backend API server
- Start the frontend development server

### 3. Access the application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **MongoDB**: localhost:27017

### 4. Stop all services

```bash
docker-compose down
```

## Individual Service Commands

### Start services in detached mode (background)

```bash
docker-compose up -d
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Restart a specific service

```bash
docker-compose restart frontend
docker-compose restart backend
```

### Rebuild a specific service

```bash
docker-compose up -d --build frontend
docker-compose up -d --build backend
```

### Stop and remove all containers, networks, and volumes

```bash
docker-compose down -v
```

## Development Workflow

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to React files will automatically reload the browser
- **Backend**: Changes to Python files will automatically restart the server

### Installing New Dependencies

#### Frontend (React/Node)

```bash
# Enter the frontend container
docker-compose exec frontend sh

# Install package
yarn add package-name

# Exit container
exit

# Rebuild frontend
docker-compose up -d --build frontend
```

#### Backend (Python)

```bash
# Enter the backend container
docker-compose exec backend bash

# Install package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt

# Exit container
exit

# Rebuild backend
docker-compose up -d --build backend
```

## Troubleshooting

### Port already in use

If you get an error that a port is already in use:

```bash
# Find and kill the process using the port
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
lsof -ti:8001 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB connection issues

```bash
# Check if MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Clear everything and start fresh

```bash
# Stop all containers
docker-compose down -v

# Remove all Docker images
docker system prune -a

# Rebuild and start
docker-compose up --build
```

### Frontend not loading

```bash
# Clear node_modules and rebuild
docker-compose down
rm -rf frontend/node_modules
docker-compose up --build frontend
```

## Production Build

For production deployment, you'll want to create optimized builds:

### Frontend Production Build

```bash
docker-compose exec frontend yarn build
```

The production-ready files will be in `frontend/build/`

### Backend Production

For production, update the backend Dockerfile to use:

```dockerfile
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "4"]
```

## Environment Variables

### Frontend (.env)

```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Backend (.env)

```bash
MONGO_URL=mongodb://mongodb:27017/adukes_kitchen_db
DB_NAME=adukes_kitchen_db
```

## Database Management

### Access MongoDB Shell

```bash
docker-compose exec mongodb mongosh
```

### Backup Database

```bash
docker-compose exec mongodb mongodump --out=/data/backup
```

### Restore Database

```bash
docker-compose exec mongodb mongorestore /data/backup
```

## Health Checks

### Check Backend Health

```bash
curl http://localhost:8001/api/
```

### Check Frontend

```bash
curl http://localhost:3000
```

## Support

For issues or questions:
- Email: akinsolaolufunmilola@gmail.com
- Phone: +1 (437) 410-5630

---

**Happy Cooking! 🍲**