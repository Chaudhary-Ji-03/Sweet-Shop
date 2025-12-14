# 🍬 Sweet Shop

Sweet Shop ek full-stack web application hai jisme users aur admins sweets purchase, restock aur delete kar sakte hain.

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js + Prisma + SQLite/PostgreSQL/MySQL (configurable)
- **Authentication:** JWT Token
- **Role-based Access:** Admin & User

---

## Features

### User

- Register/Login
- View sweets with price, stock & image
- Purchase sweets (quantity input)
- Stock updated in real-time after purchase

### Admin

- All User features
- Restock sweets
- Delete sweets
- Add new sweets (via API)

---

## Installation

### Backend

```bash
cd backend
npm install
```

Configure database in config/db.js (SQLite/PostgreSQL/MySQL)

Run migrations (Prisma)

npx prisma migrate dev --name init

Start server

npm run dev

Frontend
cd frontend
npm install
npm start

Open browser: http://localhost:3000

API Endpoints
Auth
Method Endpoint Description
POST /auth/register Register new user/admin
POST /auth/login Login user/admin
Sweets
Method Endpoint Role Description
GET /sweets User/Admin Get all sweets
POST /sweets Admin Create new sweet
POST /sweets/:id/purchase User/Admin Purchase sweet with quantity
POST /sweets/:id/restock Admin Restock sweet
DELETE /sweets/:id Admin Delete sweet
PUT /sweets/:id Admin Update sweet
Frontend Usage

Register/Login from landing page

Users can:

View sweets

Purchase quantity

Admin can:

Restock sweets

Delete sweets

Add new sweets (via API)

Environment Variables

Create .env file in backend:

DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_secret_key"
PORT=3001

Tech Stack

Frontend: React.js, Tailwind CSS, React Router DOM, Axios

Backend: Node.js, Express.js, Prisma ORM, JWT Authentication

Database: SQLite/PostgreSQL

Author

Ritik Choudary
