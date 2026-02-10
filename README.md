# Autoflex Inventory Control System

This project is a full-stack application for managing products and raw materials, including production suggestion logic.

## Project Structure
- `/backend`: Quarkus (Java) API
- `/frontend`: React + Vite + Tailwind CSS + Redux

## Requirements
- Docker and Docker Compose
- Java 17+
- Node.js 18+

## How to Run

### 1. Database
In the root directory, run:
```bash
docker-compose up -d
```

### 2. Backend
Navigate to `/backend`:
```bash
./mvnw quarkus:dev
```
The API will be available at `http://localhost:8080`.

### 3. Frontend
Navigate to `/frontend`:
```bash
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## Features
- CRUD for Products and Raw Materials.
- Association of Materials to Products.
- Production Suggestion: Calculates the maximum quantity of products that can be manufactured based on current stock, prioritizing products with higher market value.
