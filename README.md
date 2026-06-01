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

### Daily Check-Ins

---

#### Create Daily Check-In

```
POST /daily-check-ins
```

Headers:

```
Authorization: Bearer accessToken
Content-Type: application/json
```

Request Body:

```
{
  "weekday": "Senin",
  "time": "23:50",
  "sub_mood": "sedih",
  "activities": [
    "kurang tidur",
    "kerja",
    "deadline",
    "stres",
    "lelah"
  ],
  "journal": "Hari ini rasanya berat banget dan aku merasa sangat lelah.",
  "use_insight": true,
  "timezone": "Asia/Jakarta"
}
```

Response:

```
{
    "status": "success",
    "message": "Daily check-in created successfully",
    "data": {
        "id": 1,
        "userId": " ",
        "checkInDate": " ",
        "weekday": "Senin",
        "time": "23:50",
        "subMood": "sedih",
        "activities": [
            "kurang tidur",
            "kerja",
            "deadline",
            "stres",
            "lelah"
        ],
        "journal": "Hari ini rasanya berat banget dan aku merasa sangat lelah.",
        "analysis": {
            "predictedMood": "Bad",
            "rawMood": "Negatif",
            "confidence": 0.9519,
            "probabilities": {
                "Bad": 0.9519,
                "Normal": 0.0318,
                "Good": 0.0163
            },
            "moodScore": 22.09
        },
        "recommendations": [
            "YouTube",
            "Streaming",
            "Makan Enak",
            "Walk",
            "Reddit"
        ],
        "insight": null,
        "insightStatus": "unavailable",
        "insightMessage": "AI insight is currently unavailable",
        "createdAt": " ",
        "updatedAt": " "
    }
}
```

Notes:

- Endpoint ini digunakan untuk membuat daily check-in harian user.
- Endpoint ini akan memanggil TemanMood-AI untuk mendapatkan prediksi mood, rekomendasi aktivitas, dan insight opsional.
- User hanya bisa melakukan daily check-in satu kali dalam satu hari.
- Jika user sudah check-in hari ini, endpoint akan mengembalikan response `409 Conflict`.
- Field `journal` bersifat optional.
- Field `use_insight` hanya akan dianggap aktif jika `journal` memiliki minimal 5 kata valid.
- Field `timezone` digunakan untuk menentukan tanggal daily check-in berdasarkan zona waktu user.
- Jika `timezone` tidak dikirim, backend akan menggunakan default `Asia/Jakarta`.
- Timezone yang didukung:
  - `Asia/Jakarta`
  - `Asia/Makassar`
  - `Asia/Jayapura`

- Jika insight tidak tersedia karena limit atau error dari AI insight service, daily check-in tetap berhasil dibuat dan field `insight` akan bernilai `null`.
- Field `analysis.moodScore` digunakan frontend untuk menampilkan bar level mood.
- Field `aiMetadata` tetap disimpan di database, tetapi tidak dikirim ke frontend.

---

#### Get All Daily Check-Ins

```
GET /daily-check-ins
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
            "checkInDate": " ",
            "weekday": "Senin",
            "time": "23:50",
            "subMood": "sedih",
            "activities": [
                "kurang tidur",
                "kerja",
                "deadline"
            ],
            "journal": "Hari ini rasanya berat banget.",
            "analysis": {
                "predictedMood": "Bad",
                "rawMood": "Negatif",
                "confidence": 0.9519,
                "probabilities": {
                    "Bad": 0.9519,
                    "Normal": 0.0318,
                    "Good": 0.0163
                },
                "moodScore": 22.09
            },
            "recommendations": [
                "YouTube",
                "Walk"
            ],
            "insight": null,
            "insightStatus": "unavailable",
            "insightMessage": "AI insight is currently unavailable",
            "createdAt": " ",
            "updatedAt": " "
        }
    ]
}
```

Notes:

- Endpoint ini mengambil semua daily check-in milik user yang sedang login.
- Data diurutkan dari yang terbaru berdasarkan `createdAt`.
- Response tidak mengirim `aiMetadata`.
- Data hasil analisis mood berada di dalam object `analysis`.
- Field `insightStatus` tetap dikirim agar frontend dapat menjaga tampilan insight setelah halaman di-refresh.

---

#### Get Today Daily Check-In

```
GET /daily-check-ins/today
```

Headers:

```
Authorization: Bearer accessToken
```

Query Params:

```
timezone=Asia/Jakarta
```

Contoh Request:

```
GET /daily-check-ins/today?timezone=Asia/Jakarta
```

Response jika user sudah check-in hari ini:

```
{
    "status": "success",
    "data": {
        "id": 1,
        "userId": " ",
        "checkInDate": " ",
        "weekday": "Senin",
        "time": "23:50",
        "subMood": "sedih",
        "activities": [
            "kurang tidur",
            "kerja",
            "deadline"
        ],
        "journal": "Hari ini rasanya berat banget.",
        "analysis": {
            "predictedMood": "Bad",
            "rawMood": "Negatif",
            "confidence": 0.9519,
            "probabilities": {
                "Bad": 0.9519,
                "Normal": 0.0318,
                "Good": 0.0163
            },
            "moodScore": 22.09
        },
        "recommendations": [
            "YouTube",
            "Walk"
        ],
        "insight": null,
        "insightStatus": "not_requested",
        "insightMessage": null,
        "createdAt": " ",
        "updatedAt": " "
    }
}
```

Response jika user belum check-in hari ini:

```
{
    "status": "success",
    "data": null
}
```

Notes:

- Endpoint ini digunakan frontend untuk mengecek apakah user sudah melakukan daily check-in hari ini.
- Jika `data` bernilai `null`, berarti user belum check-in hari ini.
- Jika `data` berisi object, berarti user sudah check-in hari ini.
- Query `timezone` digunakan agar pengecekan hari ini mengikuti zona waktu user.
- Jika `timezone` tidak dikirim, backend akan menggunakan default `Asia/Jakarta`.

---

#### Get Daily Check-In by Id

```
GET /daily-check-ins/:id
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
        "id": 1,
        "userId": " ",
        "checkInDate": " ",
        "weekday": "Senin",
        "time": "23:50",
        "subMood": "sedih",
        "activities": [
            "kurang tidur",
            "kerja",
            "deadline"
        ],
        "journal": "Hari ini rasanya berat banget.",
        "analysis": {
            "predictedMood": "Bad",
            "rawMood": "Negatif",
            "confidence": 0.9519,
            "probabilities": {
                "Bad": 0.9519,
                "Normal": 0.0318,
                "Good": 0.0163
            },
            "moodScore": 22.09
        },
        "recommendations": [
            "YouTube",
            "Walk"
        ],
        "insight": null,
        "insightStatus": "not_requested",
        "insightMessage": null,
        "createdAt": " ",
        "updatedAt": " "
    }
}
```

Notes:

- Endpoint ini mengambil detail daily check-in berdasarkan `id`.
- User hanya bisa mengambil detail daily check-in miliknya sendiri.
- Response menggunakan struktur yang sama dengan `GET /daily-check-ins/today`.
- Field `aiMetadata` tidak dikirim ke frontend.

---

### Daily Check-In Insight Status

Field `insightStatus` digunakan frontend untuk menentukan tampilan insight.

Kemungkinan nilai:

```
available
```

Artinya insight tersedia dan field `insight` berisi object insight.

```
unavailable
```

Artinya insight diminta, tetapi AI insight sedang limit/error. Daily check-in tetap berhasil dibuat, tetapi `insight` bernilai `null`.

```
not_requested
```

Artinya insight tidak diminta. Biasanya karena `journal` kosong, kurang dari 5 kata valid, atau `use_insight` bernilai `false`.

Contoh insight tersedia:

```
{
    "insight": {
        "summary": " ",
        "suggestion": " ",
        "encouragement": " "
    },
    "insightStatus": "available",
    "insightMessage": null
}
```

Contoh insight tidak tersedia karena limit/error:

```
{
    "insight": null,
    "insightStatus": "unavailable",
    "insightMessage": "AI insight is currently unavailable"
}
```

Contoh insight tidak diminta:

```
{
    "insight": null,
    "insightStatus": "not_requested",
    "insightMessage": null
}
```

---

### Daily Check-In Mood Score

Field `moodScore` berada di:

```
data.analysis.moodScore
```

Field ini digunakan frontend untuk menampilkan bar level mood.

Range yang disarankan:

```
0 - 33    = Bad
34 - 66   = Normal
67 - 100  = Good
```

Contoh penggunaan frontend:

```
const moodScore = dailyCheckIn.analysis.moodScore;
```

---

### Daily Check-In Important Notes

- Daily check-in tidak memiliki endpoint delete.
- Daily check-in merupakan data riwayat harian user.
- Satu user hanya bisa melakukan satu daily check-in dalam satu hari.
- Pengecekan satu check-in per hari menggunakan `checkInDate` berdasarkan timezone user.
- Frontend disarankan mengirim timezone dari browser menggunakan:

```
Intl.DateTimeFormat().resolvedOptions().timeZone
```

- Prediksi mood utama berasal dari TemanMood-AI.
- Insight bersifat opsional.
- Jika insight terkena limit atau tidak tersedia, data daily check-in tetap berhasil disimpan.
- Jika insight tidak tersedia, field `insight` bernilai `null`.
- Field `insightStatus` muncul di semua response Daily Check-In agar insight tidak hilang setelah refresh halaman.
- Field `moodScore` digunakan frontend untuk menampilkan bar level mood.
- Field `aiMetadata` tetap disimpan di database, tetapi tidak dikirim ke frontend.

### Endpoint Summary

```
// Authentications
POST   /authentications              → Login
PUT    /authentications              → Refresh access token
DELETE /authentications              → Logout

// User
POST   /users                        → Register user
GET    /users/:id                    → Get user by ID

// Story
POST   /story                        → Create story
GET    /story                        → Get all stories
GET    /story/:id                    → Get story by story ID
GET    /story/user/:userId           → Get all stories by user ID
DELETE /story/:id                    → Delete story

// Story Bookmark
POST   /story-bookmarks/:storyId     → Add story bookmark
GET    /story-bookmarks              → Get user story bookmarks
DELETE /story-bookmarks/:storyId     → Remove story bookmark

// Notes
POST   /notes                        → Create notes
GET    /notes                        → Get user notes
PATCH  /notes/:id                    → Update notes
DELETE /notes/:id                    → Delete notes

// Daily Check-in
POST   /daily-check-ins              → Create daily check-in
GET    /daily-check-ins              → Get user daily check-ins
GET    /daily-check-ins/today        → Get today daily check-in
GET    /daily-check-ins/:id          → Get daily check-in by ID
```

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
- Daily check-in tidak memiliki endpoint delete.
- Daily check-in merupakan data riwayat harian user.
- Satu user hanya bisa melakukan satu daily check-in dalam satu hari.
- Prediksi mood utama berasal dari TemanMood-AI.
- Insight bersifat opsional.
- Jika insight terkena limit atau tidak tersedia, data daily check-in tetap berhasil disimpan.
- Jika insight tidak tersedia, field `insight` bernilai `null`.
- Field `insightStatus` hanya muncul pada response create untuk membantu frontend menampilkan status insight.
- Field `moodScore` digunakan frontend untuk menampilkan bar level mood.
- Range mood score yang disarankan:
  - `0 - 33` = Bad
  - `34 - 66` = Normal
  - `67 - 100` = Good

---
