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
- nanoid
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
Request Body:
```
{
  "email": "user@gmail.com",
  "password": "123456"
}
```
Response:
```
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
Request Body:
```
{
  "refreshToken": " "
}
```
Response:
```
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
Request Body:
```
{
  "refreshToken": " "
}
```
Response:
```
{
    "status": "success",
}
```
---
### User

#### Registration
```
POST /users
```
Request Body:
```
{
  "username": " ",
  "email": " ",
  "password": " "
}
```
Response:
```
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
Response:
```
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
### Story

#### Create Story
```
POST /story
```
Request Body:
```
{
  "title": " ",
  "content": " ",
  "mood": " ",
  "is_anonymous": true or false
}
```
Response
```
{
    "message": "Story created successfully",
    "data": [
        {
            "id": ,
            "user_id": " ",
            "title": " ",
            "content": " ",
            "mood": " ",
            "is_anonymous": true or false,
            "created_at": " "
        }
    ]
}
```
---
#### Get All Story
```
GET /story
```
Response: 
```
{
    "data": [
        {
            "id": 1,
            "user_id": " ",
            "title": " ",
            "content": " ",
            "mood": " ",
            "is_anonymous": false,
            "created_at": " ",
            "users": {
                "username": " "
            }
        }
    ]
},
{
    "data": [
        {
            "id": 2,
            "user_id": " ",
            "title": " ",
            "content": " ",
            "mood": " ",
            "is_anonymous": false,
            "created_at": " ",
            "users": {
                "username": " "
            }
        }
    ]
}
```
---
### Get Story by ID
```
GET /story/:id
```
Response:
```
{
    "data": [
        {
            "id": ,
            "user_id": " ",
            "title": " ",
            "content": " ",
            "mood": " ",
            "is_anonymous": true or false,
            "created_at": " "
        }
    ]
}
```
---
### Delet Story
```
DELETE /story/:id
```
Response:
```
{
    "message": "Story deleted successfully"
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