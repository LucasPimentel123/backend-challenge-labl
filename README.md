# Express TypeScript Docker Application

A simple Express.js application written in TypeScript and containerized with Docker.

## Features

- Express.js server with TypeScript
- Docker containerization
- Docker Compose for easy deployment
- Health check endpoint
- Hello World functionality

## Quick Start

### Using Docker Compose (Recommended)

1. Build and start the application:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at `http://localhost:3000`

3. To stop the application:
   ```bash
   docker-compose down
   ```

### Using Docker directly

1. Build the Docker image:
   ```bash
   docker build -t express-typescript-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 express-typescript-app
   ```

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

- `GET /` - Returns "Hello World!" message
- `GET /health` - Health check endpoint

## Docker Commands

- Build image: `docker build -t express-typescript-app .`
- Run container: `docker run -p 3000:3000 express-typescript-app`
- View logs: `docker logs <container_id>`
- Stop container: `docker stop <container_id>`
