# College Shodh Admin Panel

Welcome to the College Shodh Admin Panel project! This documentation will guide you through the setup and usage of the admin panel.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
  - [Routes](#backend-routes)
  - [Modules](#backend-modules)
- [Frontend](#frontend)
  - [Components](#frontend-components)
  - [Pages](#frontend-pages)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The College Shodh Admin Panel is a web-based application designed to manage and oversee various administrative tasks for colleges. It provides a user-friendly interface for administrators to handle data efficiently.

## Features
- User management
- Course management
- Department management
- Reporting and analytics
- Secure authentication

## Project Structure
```
.vscode/
backend/
  .env
  .gitignore
  controllers/
    authController.js
    userController.js
  index.js
  middleware.js
  models/
    courseSchema.js
    User.js
  package.json
  routes/
    authRoutes.js
    userRoutes.js
frontend/
  .eslintrc.cjs
  .gitignore
  index.html
  package.json
  postcss.config.js
  public/
    icons/
    images/
  README.md
  src/
    components/
    pages/
  tailwind.config.js
  vite.config.js
Readme.md
```

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed on your machine
- npm (Node Package Manager) installed
- A web browser (e.g., Chrome, Firefox)

## Installation
To install the College Shodh Admin Panel, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/college-shodh-admin.git
    ```
2. Navigate to the project directory:
    ```bash
    cd college-shodh-admin
    ```
3. Install the dependencies for both backend and frontend:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

## Usage
To start the development server, run:

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
2. Start the frontend server:
    ```bash
    cd frontend
    npm run dev
    ```

Open your web browser and go to `http://localhost:3000` to view the admin panel.

## Backend

### Routes
- **Auth Routes**: [backend/routes/authRoutes.js](backend/routes/authRoutes.js)
  - `POST /auth/signup`: User signup
  - `POST /auth/login`: User login
  - `GET /auth/logout`: User logout

- **User Routes**: [backend/routes/userRoutes.js](backend/routes/userRoutes.js)
  - `GET /dashboard/college`: Fetch all colleges
  - `POST /dashboard/create`: Create a new college
  - `GET /dashboard/edit/:id`: Edit a college by ID
  - `PUT /dashboard/update/:id`: Update a college by ID
  - `DELETE /dashboard/delete/:id`: Delete a college by ID
  - `POST /dashboard/uploadBulk`: Upload bulk data

### Modules
- **User Model**: [backend/models/User.js](backend/models/User.js)
- **Course Schema**: [backend/models/courseSchema.js](backend/models/courseSchema.js)
- **Auth Controller**: [backend/controllers/authController.js](backend/controllers/authController.js)
- **User Controller**: [backend/controllers/userController.js](backend/controllers/userController.js)

## Frontend

### Components
- **Navbar**: [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)
- **Sidebar**: [frontend/src/components/Sidebar.jsx](frontend/src/components/Sidebar.jsx)
- **Create Form**: [frontend/src/components/Create_form/Add.jsx](frontend/src/components/Create_form/Add.jsx)
- **Error**: [frontend/src/components/Error.jsx](frontend/src/components/Error.jsx)
- **Protected Route**: [frontend/src/components/ProtectedRoute.jsx](frontend/src/components/ProtectedRoute.jsx)

### Pages
- **Home**: [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)
- **Signup**: [frontend/src/pages/Signup.jsx](frontend/src/pages/Signup.jsx)
- **Login**: [frontend/src/pages/Login.jsx](frontend/src/pages/Login.jsx)
- **Dashboard**: [frontend/src/pages/AdminPage.jsx](frontend/src/pages/AdminPage.jsx)
- **Create Page**: [frontend/src/pages/CreatePage.jsx](frontend/src/pages/CreatePage.jsx)
- **Edit Page**: [frontend/src/pages/Edit.jsx](frontend/src/pages/Edit.jsx)
- **Blog Page**: [frontend/src/pages/BlogPage.jsx](frontend/src/pages/BlogPage.jsx)

## Contributing
Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.
