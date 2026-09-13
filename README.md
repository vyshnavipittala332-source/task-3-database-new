# Task 3 - Persistent Data Layer

## 📌 Project Overview

This project is Task 3 of the Innovation Hacks Full Stack Development Internship.

The objective is to integrate a real MongoDB database with a REST API so that users, projects, and tasks can be stored and managed persistently.

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Thunder Client
- Git & GitHub

## ✨ Features

### User Management
- Create user
- Get all users
- Get user by ID
- Update user
- Delete user

### Project Management
- Create project
- Get all projects
- Get project by ID
- Update project
- Delete project

### Task Management
- Create task
- Get all tasks
- Get task by ID
- Update task
- Delete task

### Database Relationships

- A Project is connected to a User.
- A Task is connected to a Project.
- A Task is also connected to a User.
- MongoDB ObjectId references are used for relationships.
- Mongoose `populate()` is used to display related data.

## 📁 Project Structure

```text
task-3-database-new/
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js