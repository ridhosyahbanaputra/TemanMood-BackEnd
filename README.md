# Teman Mood — Backend API Documentation

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

ACCESS_TOKEN_KEY=your_secret_key
REFRESH_TOKEN_KEY=your_secret_key
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
POST /authentications
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
  "data": {
      "accessToken": " ",
      "refreshToken": " ",
      "user": {
          "username": " "
        }
    }
}
```
---
#### Refresh Token
```
PUT /authentications
```
Request
```
Request Body:
{
  "refreshToken": " "
}
```
Response
```
Response:
{
    "status": "success",
    "data": {
        "accessToken": " "
    }
}
```
---
#### Logout
```
DELETE /authentications
```
Request
```
Request Body:
{
  "refreshToken": " "
}
```
Response
```
Response:
{
    "status": "success",
}
```
---
### User

#### Registration
```
POST /users/
```
Request
```
Request Body:
{
  "username": " ",
  "email": " ",
  "password": " "
}
```
Response
```
Response:
{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "username": " ",
        "email": " "
    }
}
```
---
### Get User by ID
```
GET /users/:id
```
Response
```
Response:
{
  "message": "success",
  "data": {
    "id": " ",
    "username": "user",
    "email": "user@gmail.com"
  }
}
```
---

# IMPORTANT NOTES

- Password disimpan dalam bentuk hash (bcrypt)
- Login menghasilkan access token dan refresh token
- Pastikan CORS aktif untuk frontend React
- Gunakan Content-Type: application/json

---

# FLOW SYSTEM

Register → Login → Save Token → Get User → Home Page

---