#  TaskFlow – Task Management Web Application

A full-stack Task Management application built with **React**, **Node.js**, **Express**, and **MongoDB**.

## Screenshots

<img width="1918" height="821" alt="Screenshot 2026-02-19 002517" src="https://github.com/user-attachments/assets/28da081b-5ec6-419b-bb55-8f5e5603706e" />
<img width="1576" height="827" alt="Screenshot 2026-02-19 002555" src="https://github.com/user-attachments/assets/fde043a7-86d5-4608-8505-a67657ae8873" />
<img width="1911" height="817" alt="Screenshot 2026-02-19 002608" src="https://github.com/user-attachments/assets/11440f4e-9000-423d-b6cf-b2a6a9a96f2a" />
<img width="1175" height="837" alt="Screenshot 2026-02-19 002635" src="https://github.com/user-attachments/assets/79cc540a-e7c4-4a3f-aec9-7f816d7af976" />


> The app features a dark, elegant UI with:
> - Stats dashboard (total / pending / completed + progress bar)
> - Create / Edit / Delete tasks
> - Toggle task status (pending ↔ completed)
> - Search and filter tasks
> - Form validation on both frontend and backend
> - Toast notifications for all actions

---

##  Project Structure
Backend (Node.js + Express)

##  Main Entry->
backend/server.js – Express app entry point
backend/package.json
backend/.env.example

## Configuration->
backend/config/db.js – MongoDB connection

## Architecture Layers->
backend/models/Task.js – Mongoose Task schema
backend/services/taskService.js – Business logic & DB operations
backend/controllers/taskController.js – Handles request/response
backend/routes/tasks.js – API routes & validation
backend/middleware/errorHandler.js – Global error handler

## Frontend (React + Vite)

## Main Entry->
frontend/src/main.jsx – React entry point
frontend/src/App.jsx – Root component
frontend/index.html
frontend/vite.config.js
frontend/package.json

## API Layer->
frontend/src/api/axios.js – Axios instance
frontend/src/api/tasks.js – Task API functions

## Components->
FilterBar.jsx – Search + status filter
Modal.jsx – Edit task modal
StatsBar.jsx – Stats + progress bar
TaskCard.jsx – Task display card
TaskForm.jsx – Create/Edit form

## Custom Hooks->
useTasks.js – Task state management

## Styles->
global.css – CSS variables & global styles

## Root Files
package.json
README.md

##  Features

- **Create** tasks with title (required) and description (optional)
- **View** all tasks in a sorted list (newest first)
- **Edit** task title, description, and status via modal
- **Delete** tasks with a two-click confirmation
- **Toggle** status between `pending` and `completed`
- **Search** tasks by title or description
- **Filter** tasks by status (All / Pending / Completed)
- **Stats dashboard** showing counts and progress percentage
- **Form validation** on both client and server side
- **Error handling** with user-friendly toast notifications

##  Setup & Run Instructions

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

### 2. Set up Backend environment

cd backend
cp .env.example .env

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development

> Using MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string:
> `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager`

. Install all dependencies
From the root directory:
npm install
cd backend && npm install
cd ../frontend && npm install

### 5. Run the application

Terminal 1 (backend):
cd backend
npm start

Terminal 2 (frontend):
cd frontend
npm run dev


### 6. Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:5005

##  API Endpoints

GET     /api/tasks                - Get all tasks
GET     /api/tasks/:id            - Get single task
POST    /api/tasks                - Create a task
PUT     /api/tasks/:id            - Update a task
PATCH   /api/tasks/:id/toggle     - Toggle task status
DELETE  /api/tasks/:id            - Delete a task


##  Tech Stack

Frontend  - React 18, Vite, react-hot-toast, Axios
Backend   - Node.js, Express 4, express-validator
Database  - MongoDB + Mongoose ODM
Styling   - Pure CSS with CSS Variables (no framework needed)

##  Notes

- No Tailwind CSS was used — the UI is built with pure CSS and CSS custom properties for full control and zero build complexity.
- All API responses follow a consistent `{ success, data, error }` format.
