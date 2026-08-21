# DevFlow

DevFlow is a full-stack developer workspace for managing projects, tasks, issues, team activity, notifications, analytics, and AI-assisted code reviews.

## Features

- JWT access/refresh authentication, account verification, password reset, and protected routes
- Project, task, and issue REST APIs with status, priority, assignment, and filters
- Dashboard analytics, activity logging, notifications, team-role controls, profile management, and light/dark mode
- AI code review and bug analysis endpoints with provider-ready backend boundaries
- Responsive React/Vite application with a DevFlow splash experience and developer-focused design system

## Stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, Recharts, Lucide.

Backend: Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs, express-validator, Helmet, CORS, and rate limiting.

## Structure

```text
frontend/src/     React pages, components, context, routes, services
backend/src/      Express config, controllers, middleware, models, routes, services, utils
```

## Setup

1. Copy `backend/.env.example` to `backend/.env` and set secure secrets plus `MONGODB_URI`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Install and run each app:

```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Frontend: `http://localhost:4002`

Backend: `http://localhost:6002`
Health: `GET /api/health`

### Registration troubleshooting

The client and server are configured to use ports `4002` and `6002` respectively. If account creation still fails:

1. Run the backend first with `cd backend && npm run dev`.
2. In development, DevFlow uses `DEV_MONGODB_URI=mongodb://127.0.0.1:27017/devflow` when present. Otherwise, set `MONGODB_URI` to a working MongoDB URI. Do not include angle brackets around an Atlas password, and URL-encode special password characters.
3. For MongoDB Atlas, allow your current IP address in Network Access and confirm the cluster is running.
4. Open `http://localhost:6002/api/health`; its `data.database` value must be `connected` before registration can persist users.

## API groups

- `/api/auth` — register, login, logout, verification, refresh, password reset
- `/api/users/me` — current profile and password updates
- `/api/projects`, `/api/tasks`, `/api/issues` — protected CRUD
- `/api/analytics`, `/api/team`, `/api/notifications`, `/api/ai`

## Security notes

Never commit `.env` files or client-side secrets. Use strong, distinct JWT access and refresh secrets in production, enable a real SMTP provider for email delivery, and connect an AI provider only through backend environment variables.

## Validation

```bash
cd backend && npm test
cd frontend && npm run lint && npm run build
```
