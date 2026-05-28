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

Headers:

```
Content-Type: application/json
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

Headers:

```
Content-Type: application/json
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

Headers:

```
Authorization: Bearer accessToken
Content-Type: application/json
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

---

#### Create User

```
POST /users
```

Headers:

```
Content-Type: application/json
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

#### Get User by Id

```
GET /users/:id
```

Headers:

```
Authorization: Bearer accessToken
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

Headers:

```
Authorization: Bearer accessToken
Content-Type: application/json
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
    "status": "success",
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
    "status": "success",
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
        },
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
},
```

---

#### Get Story by User Id

```
GET /story/user/:userId
```
Headers:

```
Authorization: Bearer accessToken
```
Response:

```
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "userId": " ",
            "title": " ",
            "mood": " ",
            "isAnonymous": true or false,
            "createdAt": " ",
            "user": {
                "username": " "
            }
        },
        {
            "id": 2,
            "userId": " ",
            "title": " ",
            "content": " ",
            "mood": " ",
            "isAnonymous": true or false,,
            "createdAt": " ",
            "user": null
        },
        {
            "id": 3,
            "userId": " ",
            "title": " ",
            "mood": " ",
            "isAnonymous": true or false,
            "createdAt": " ",
            "user": {
                "username": " "
            }
        },
    ]
}
```

---

#### Get Story by Id

```
GET /story/:id
```

Response:

```
{
    "status": "success",
    "data": {
        "id": 1,
        "userId": " ",
        "title": " ",
        "isAnonymous": true or false,
        "createdAt": " ",
        "user": {
            "username": " "
        }
    }
}
```

---

#### Delete Story

```
DELETE /story/:id
```

Headers:

```
Authorization: Bearer accessToken
```

Response:

```
{
    "status": "success",
    "message": "Story deleted successfully"
}
```
---

### Story Bookmark

---

#### Add Story Bookmark

```
POST /story-bookmarks/:storyId
```

Headers:

```
Authorization: Bearer accessToken
```

Response:

```
{
    "status": "success",
    "message": "Story bookmarked successfully",
    "data": {
        "id": 1,
        "userId": " ",
        "storyId": ,
        "createdAt": " "
    }
}
```
---
#### Get Story Bookmark

```
GET /story-bookmarks
```

Headers:

```
Authorization: Bearer accessToken
```

Response:

```
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "userId": " ",
            "title": " ",
            "mood": " ",
            "isAnonymous": true or false,
            "createdAt": " ",
            "user": {
                "username": " "
            },
            "bookmarkedAt": " "
        },
        {
            "id": 2,
            "userId": " ",
            "title": " ",
            "mood": " ",
            "isAnonymous": true or false,
            "createdAt": " ",
            "user": {
                "username": " "
            },
            "bookmarkedAt": " "
        }
    ]
}
```
---
#### Delete Story Bookmark By Story Id

```
DELETE /story-bookmarks/:storyId
```

Headers:

```
Authorization: Bearer accessToken
```
Response:

```
{
    "status": "success",
    "message": "Story bookmark removed successfully"
}
```
---
### Notes

---

#### Create Notes

```
POST /notes
```

Headers:

```
Authorization: Bearer accessToken
Content-Type: application/json
```
Request Body:
```
{
  "title": " ",
  "content": " ",
  "color": " ",
  "isPinned": true or false
}
```

Response:

```
{
    "status": "success",
    "message": "Notes created successfully",
    "data": {
        "id": 1,
        "userId": " ",
        "title": " ",
        "content": " ",
        "color": " ",
        "isPinned": true or false,
        "createdAt": " ",
        "updatedAt": " "
    }
}
```
---
#### Get All Notes

```
GET /notes
```

Headers:

```
Authorization: Bearer accessToken
```
Response:

```
{
    "status": "success"
    "data": [
        {
            "id": 1,
            "userId": " ",
            "title": " ",
            "content": " ",
            "color": " ",
            "isPinned": true or false,
            "createdAt": " ",
            "updatedAt": " "
        },
        {
            "id": 2,
            "userId": " ",
            "title": " ",
            "content": " ",
            "color": " ",
            "isPinned": true or false,
            "createdAt": " ",
            "updatedAt": " "
        }
    ]
}
```
---
#### Update Notes

```
PATCH /notes/:id
```

Headers:

```
Authorization: Bearer accessToken
```
Request Body:
```
{
  "title": " ",
  "content": " ",
  "color": " ",
  "isPinned": true or false
}
```

Response:

```
{
    "status": "success",
    "message": "Notes updated successfully",
    "data": {
        "id": 1,
        "userId": " ",
        "title": " ",
        "content": " ",
        "color": " ",
        "isPinned": true or false,
        "createdAt": " ",
        "updatedAt": " "
    }
}
```
---
#### Delete Notes

```
DELETE /notes/:id
```

Headers:

```
Authorization: Bearer accessToken
```
Response:

```
{
    "status": "success",
    "message": "Notes deleted successfully"
}
```
---

# Important Notes

- Password disimpan dalam bentuk hash menggunakan bcrypt.
- Login menghasilkan `accessToken` dan `refreshToken`.
- Refresh token disimpan di tabel `authentications`.
- Story menggunakan ID angka dari `nanoid`.
- User ID menggunakan UUID.
- Jika user dihapus, story tetap ada karena relasi menggunakan `ON DELETE SET NULL`.
- Gunakan header `Authorization: Bearer <accessToken>` untuk endpoint yang - membutuhkan login.
- Gunakan `Content-Type: application/json`.
- RLS diaktifkan pada tabel aplikasi.
- Tabel `_prisma_migrations` tidak perlu diaktifkan RLS karena itu tabel internal Prisma.
- Prisma Client digunakan melalui `@prisma/client`.

---
