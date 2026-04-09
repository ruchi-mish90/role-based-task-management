# Role-Based Task Management System

A full-stack task management application with JWT authentication and role-based access control. Built with React, Node.js, Express, and MongoDB.

---

## Tech Stack

**Frontend**
- React 18
- React Router v6
- Recharts
- Vite

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs

---

## Features

- JWT-based authentication with register and login
- Role-based access control across three roles: admin, manager, and user
- Users can create and manage only their own tasks
- Managers can view and update tasks belonging to their assigned users
- Admins have full access to all tasks and users
- Task fields: title, description, and status (pending, in-progress, completed)
- Search tasks by title or description
- Filter tasks by status
- Server-side pagination
- Analytics page with status breakdown, daily activity chart, and user leaderboard ranked by completed tasks

---

## Roles and Permissions

| Action                        | User | Manager | Admin |
|-------------------------------|------|---------|-------|
| Manage own tasks              | Yes  | Yes     | Yes   |
| View/update assigned users' tasks | No | Yes   | Yes   |
| Manage all tasks              | No   | No      | Yes   |
| Access user management panel  | No   | No      | Yes   |
| Assign managers to users      | No   | No      | Yes   |

---

## Project Structure

```
role-based-task-management-rbac/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Route handlers (auth, tasks, users)
│   ├── middleware/      # JWT auth, role guard, ownership checks
│   ├── models/          # Mongoose schemas (User, Task)
│   ├── routes/          # Express routers
│   ├── utils/           # Pagination helper
│   └── server.js
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # Auth context
│   ├── pages/           # Dashboard, Tasks, Users, Analytics, Auth
│   ├── services/        # API service functions
│   └── App.jsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally on port 27017

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rbac_tasks
JWT_SECRET=your_jwt_secret_here
```

Start the backend:

```bash
npx nodemon server.js
```

### Frontend

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## API Endpoints

### Auth
| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | /api/auth/register   | Register a user    |
| POST   | /api/auth/login      | Login and get token|

### Tasks
| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/tasks            | Get tasks (scoped by role)         |
| POST   | /api/tasks            | Create a task                      |
| PUT    | /api/tasks/:id        | Update a task                      |
| DELETE | /api/tasks/:id        | Delete a task                      |
| GET    | /api/tasks/analytics  | Get analytics data                 |

Query parameters for GET /api/tasks: `search`, `status`, `page`, `limit`

### Users (Admin only)
| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | /api/users                | List all users           |
| PATCH  | /api/users/:id/manager    | Assign a manager to user |

---

## Environment Variables

| Variable    | Description                        |
|-------------|------------------------------------|
| PORT        | Port for the Express server        |
| MONGO_URI   | MongoDB connection string          |
| JWT_SECRET  | Secret key for signing JWT tokens  |
