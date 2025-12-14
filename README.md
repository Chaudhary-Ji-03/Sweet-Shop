# Sweet-Shop

Sweet-Shop is a full-stack web application that allows users to browse and purchase sweets online. Admins have special privileges to manage inventory, including adding, restocking, and deleting sweets. The project is built using **React** for frontend, **Node.js + Express** for backend, and **Prisma** with a database for persistent storage.

---

## Features

### User Features
- Register and login with role-based access (user/admin).
- Browse available sweets with images, prices, and stock.
- Purchase sweets and update stock accordingly.

### Admin Features
- All user features plus:
  - Add new sweets to inventory.
  - Restock existing sweets.
  - Delete sweets from inventory.

### Other Features
- Role-based authentication with JWT.
- Responsive design for desktop and mobile.
- Axios API integration for frontend-backend communication.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** Prisma ORM (PostgreSQL / MySQL / SQLite)
- **Authentication:** JWT (JSON Web Tokens)

---

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
Install dependencies:

npm install


Setup environment variables (.env):

DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
PORT=5000


Run database migrations (if using Prisma):

npx prisma migrate dev --name init


Start the backend server:

npm run dev


Backend will run at http://localhost:5000.

Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend development server:

npm start


Frontend will run at http://localhost:3000.

Folder Structure
Frontend
frontend/
├─ src/
│  ├─ api/axios.js           # Axios instance for API calls
│  ├─ pages/
│  │  ├─ Register.jsx
│  │  ├─ Login.jsx
│  │  ├─ Dashboard.jsx
│  │  └─ __tests__/          # Test files
│  ├─ App.js
│  └─ index.js
├─ package.json
└─ tailwind.config.js

Backend
backend/
├─ src/
│  ├─ api/
│  │  └─ sweets/
│  │     ├─ sweets.controller.js
│  │     └─ sweets.service.js
│  ├─ middleware/
│  │  ├─ auth.middleware.js
│  │  └─ role.middleware.js
│  ├─ config/db.js           # Prisma DB config
│  └─ routes.js
├─ package.json
└─ .env

API Endpoints
Auth

POST /auth/register - Register new user/admin

POST /auth/login - Login user/admin

Sweets

GET /sweets - Get all sweets

POST /sweets - Add new sweet (Admin only)

POST /sweets/:id/purchase - Purchase sweet

POST /sweets/:id/restock - Restock sweet (Admin only)

DELETE /sweets/:id - Delete sweet (Admin only)

Screenshots
Register / Login


<img width="567" height="407" alt="image" src="https://github.com/user-attachments/assets/081def2d-addf-4c02-8f5c-7bb5597d8a0e" />
<img width="561" height="378" alt="image" src="https://github.com/user-attachments/assets/80d9f686-7141-4c03-80b6-2a65e8a4265a" />


Dashboard (User)

Dashboard (Admin)
<img width="1858" height="1031" alt="image" src="https://github.com/user-attachments/assets/f9ff53da-4f66-4371-8080-f913a30074fa" />


Notes

Admin and user roles are stored in localStorage.

Make sure backend is running before using the frontend.

You can customize sweet images and categories in the backend database

