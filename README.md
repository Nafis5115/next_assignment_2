# DevPulse – Issue & Feature Tracker

A backend API for managing software bugs and feature requests.

## ✨ Features

* JWT authentication
* Role-based authorization
* Create, read, update and delete issues
* Bug & feature request management
* Issue filtering and sorting
* PostgreSQL database
* Password hashing with bcrypt

## 🛠️ Tech Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* JWT
* bcrypt

## 🔗 Links

**Live URL:** https://assignment-2-hazel-three.vercel.app/

**GitHub:** https://github.com/Nafis5115/next_assignment_2

## ⚙️ Setup

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm start
```

Create a `.env` file:

```env
CONNECTION_STRING = "postgresql://neondb_owner:npg_b5HRet9flQEO@ep-super-flower-axzdki13-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"
PORT = 3000
JWT_SECRET = ksdakjsdakljsd91283123ij129312ejid190908123jhdsf
```

## 📌 API Endpoints

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/auth/signup` | Register         |
| POST   | `/api/auth/login`  | Login            |
| POST   | `/api/issues`      | Create issue     |
| GET    | `/api/issues`      | Get all issues   |
| GET    | `/api/issues/:id`  | Get single issue |
| PATCH  | `/api/issues/:id`  | Update issue     |
| DELETE | `/api/issues/:id`  | Delete issue     |

## 👥 Roles

**Contributor:** Create and manage own issues.

**Maintainer:** Manage all issues and delete issues.

## 🗄️ Database

Main tables:

* `users`
* `issues`

PostgreSQL is used with raw SQL queries through `pg`.

