# Teman Mood — Backend API Documentation

Backend API untuk aplikasi TemanMood menggunakan Node.js, Express, Prisma ORM, dan Supabase PostgreSQL.

---

## Dependencies

- Node.js
- Express.js
- Prisma ORM
- Supabase PostgreSQL
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

DATABASE_URL="your_supabase_pooler_database_url"
DIRECT_URL="your_supabase_direct_database_url"

ACCESS_TOKEN_KEY=your_secret_key
REFRESH_TOKEN_KEY=your_secret_key
```
---
## Prisma Setup

### Generate Prisma Client
```
npx prisma generate
```
### Jalankan migration saat development
```
npx prisma migrate dev
```
### Cek status migration
```
npx prisma migrate status
```
### Buka Prisma Studio
```
npx prisma studio
```
---

# Enpoint
### Authentications
---
#### Login
```
POST /authentications
```
Request Body:
```
{
  "email": " ",
  "password": " "
}
```
Response:
```
{
    "status": "success",
    "data": {
        "accessToken": " ",
        "refreshToken": " ",
        "user": {
            "id": " ",
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
----
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
        "id": " ",
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
    "status": "success",
    "data": {
        "id": " ",
        "username": " ",
        "email": " ",
        "created_at": " "
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
            "created_at": " ",
            "user": {
                "username": " "
            }
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
            "created_at": " ",
            "user": {
                "username": " "
            }
        }
    ]
}
```
---
### Delete Story
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
# Important Notes

- Password disimpan dalam bentuk hash menggunakan bcrypt.
- Login menghasilkan ```accessToken``` dan ```refreshToken```.
- Refresh token disimpan di tabel ```authentications```.
- Story menggunakan ID angka dari ```nanoid```.
- User ID menggunakan UUID.
- Jika user dihapus, story tetap ada karena relasi menggunakan ```ON DELETE SET NULL```.
- Gunakan header ```Authorization: Bearer <accessToken>``` untuk endpoint yang - membutuhkan login.
- Gunakan ```Content-Type: application/json```.
- RLS diaktifkan pada tabel aplikasi.
- Tabel ```_prisma_migrations``` tidak perlu diaktifkan RLS karena itu tabel internal Prisma.
- Prisma Client digunakan melalui ```@prisma/client```.

---
