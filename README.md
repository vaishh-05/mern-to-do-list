# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB and managed through a REST API; the React UI supports
adding, viewing, completing/un-completing, editing and deleting tasks without page reloads.

Course: 23CSB40B Web Technology - Assignment 2

## Project structure

```
MERN_ToDoList/
├── backend/
│   ├── models/Task.js        # Mongoose schema
│   ├── routes/tasks.js       # REST API routes
│   ├── server.js             # Express app, CORS, MongoDB connection
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # TaskForm, TaskList, TaskItem
│   │   ├── api.js            # fetch calls to the backend
│   │   ├── App.jsx           # state + useEffect
│   │   └── index.css
│   └── package.json
└── screenshots/
```

## Prerequisites

- Node.js 18 or later
- A MongoDB database: local MongoDB (`mongodb://127.0.0.1:27017/todo-app`) or a free MongoDB Atlas cluster

## Running the project

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
# edit .env and fill in the values (see below)
npm start
```

The API runs on http://localhost:5000.

### 2. Frontend (in a second terminal)

```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000.

## Environment variables

`backend/.env` (never committed):

| Variable | Example | Purpose |
|---|---|---|
| `MONGO_URI` | `mongodb://127.0.0.1:27017/todo-app` | MongoDB connection string (required) |
| `PORT` | `5000` | Port for the API (defaults to 5000) |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | The only origin allowed by CORS |

`frontend/.env` (optional): `VITE_API_URL=http://localhost:5000`

## API reference

| Method | Endpoint | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/api/tasks` | - | 200, array of tasks | 500 |
| POST | `/api/tasks` | `{ "title": "..." }` | 201, created task | 400 empty title |
| PUT | `/api/tasks/:id` | `{ "title"?, "completed"? }` | 200, updated task | 400 invalid body, 404 not found |
| DELETE | `/api/tasks/:id` | - | 200, `{ message, id }` | 404 not found |

Task fields: `title` (String, required), `completed` (Boolean, default `false`), `createdAt` (Date, default now).

## Screenshots

Add your screenshots to the `screenshots/` folder and reference them here:

- `screenshots/01-add-task.png`
- `screenshots/02-complete-task.png`
- `screenshots/03-delete-task.png`
- `screenshots/04-merged-pull-requests.png`

## Git workflow

- `feature/backend` and `feature/frontend` branches were each merged into `main` through a pull request.
- `.env` and `node_modules` are excluded via `.gitignore`; `.env.example` lists the required variables.
