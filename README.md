# TemanMood Backend API

Backend API untuk aplikasi TemanMood menggunakan Node.js, Express, dan Supabase.

---

## Dependencies

- Express
- Supabase JS Client
- bcrypt 
- JSON Web Token (JWT)
- Joi 
- dotenv 
- cors 
- nodemon

---

## Installation
```
git clone <repo-url>
cd TemanMood-Backend
npm install
```
---

## Environment Setup

Buat file `.env` di root project:

```env
PORT=your_port
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret_key
```
---

## Run Project
```
npm run dev
```
---

# Enpoint
### Login
---
Endpoint
```
POST /auth/login
```
Request
```
Request Body:
{
  "email": "user@gmail.com",
  "password": "123456"
}
```
Response
```
Response:
{
  "message": "success",
  "token": "jwt_token_here"
}
```

### Create User
---
Endpoint
```
POST /users/
```
Request
```
Request Body:
{
  "username": "user",
  "email": "user@gmail.com",
  "password": " "
}
```
Response
```
Response:
{
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "username": "user",
    "email": "user@gmail.com"
  }
}
```

### Get User by ID
---
Endpoint
```
GET /users/:id
```
Response
```
Response:
{
  "message": "success",
  "data": {
    "id": "uuid",
    "username": "user",
    "email": "user@gmail.com"
  }
}
```
---

# IMPORTANT NOTES

- Password disimpan dalam bentuk hash (bcrypt)
- Login menghasilkan JWT token
- Register tidak membutuhkan token (public route)
- Pastikan CORS aktif untuk frontend React
- Gunakan Content-Type: application/json

---

# FLOW SYSTEM

Register → Login → Save Token → Get User → Home Page

---