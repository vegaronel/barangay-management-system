# BRGY Management System API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Include the Supabase JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 👥 User Management

### Register User

```http
POST /api/users/register
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+63 912 345 6789",
  "address": "123 Main Street",
  "barangay": "Barangay 1",
  "city": "Manila",
  "postalCode": "1234"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

### Login User

```http
POST /api/users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com"
    },
    "profile": {
      "id": "uuid",
      "full_name": "John Doe",
      "role": "resident"
    }
  }
}
```

### Get Current User

```http
GET /api/users/me
```

### Get All Users (Admin Only)

```http
GET /api/users
```

### Get User by ID

```http
GET /api/users/:id
```

### Update User Profile

```http
PUT /api/users/:id
```

### Delete User

```http
DELETE /api/users/:id
```

---

## 🏢 Barangay Services

### Get All Services

```http
GET /api/services
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Barangay Clearance",
      "description": "Official clearance from the barangay",
      "category": "Documentation",
      "requirements": ["Valid ID", "Proof of Residency"],
      "processing_time": "3-5 business days",
      "fee": 50.0,
      "is_active": true
    }
  ]
}
```

### Get Service by ID

```http
GET /api/services/:id
```

### Get Services by Category

```http
GET /api/services/category/:category
```

### Create Service (Admin Only)

```http
POST /api/services
```

**Request Body:**

```json
{
  "name": "New Service",
  "description": "Service description",
  "category": "Documentation",
  "requirements": ["Valid ID"],
  "processing_time": "2-3 business days",
  "fee": 25.0
}
```

### Update Service (Admin Only)

```http
PUT /api/services/:id
```

### Delete Service (Admin Only)

```http
DELETE /api/services/:id
```

### Toggle Service Status (Admin Only)

```http
PATCH /api/services/:id/toggle
```

---

## 📝 Service Requests

### Create Service Request

```http
POST /api/requests
```

**Request Body:**

```json
{
  "user_id": "uuid",
  "service_id": "uuid",
  "notes": "Additional notes",
  "documents": ["document1.pdf", "document2.pdf"]
}
```

### Get User Requests

```http
GET /api/requests/user/:userId
```

### Get All Requests (Admin Only)

```http
GET /api/requests
```

### Get Request by ID

```http
GET /api/requests/:id
```

### Update Request Status (Admin Only)

```http
PUT /api/requests/:id/status
```

**Request Body:**

```json
{
  "status": "processing",
  "notes": "Status update notes"
}
```

**Available Statuses:**

- `pending`
- `processing`
- `completed`
- `rejected`

### Get Requests by Status

```http
GET /api/requests/status/:status
```

### Delete Request

```http
DELETE /api/requests/:id
```

### Get Request Statistics

```http
GET /api/requests/stats
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 100,
    "pending": 25,
    "processing": 30,
    "completed": 40,
    "rejected": 5
  }
}
```

---

## 📢 Announcements

### Get Published Announcements (Public)

```http
GET /api/announcements/published
```

### Get All Announcements (Admin Only)

```http
GET /api/announcements
```

### Get Announcement by ID

```http
GET /api/announcements/:id
```

### Create Announcement (Admin Only)

```http
POST /api/announcements
```

**Request Body:**

```json
{
  "title": "Important Announcement",
  "content": "This is the announcement content",
  "author_id": "uuid",
  "priority": "high",
  "expires_at": "2024-12-31T23:59:59Z"
}
```

**Available Priorities:**

- `low`
- `normal`
- `high`
- `urgent`

### Update Announcement (Admin Only)

```http
PUT /api/announcements/:id
```

### Publish Announcement (Admin Only)

```http
PATCH /api/announcements/:id/publish
```

### Unpublish Announcement (Admin Only)

```http
PATCH /api/announcements/:id/unpublish
```

### Delete Announcement (Admin Only)

```http
DELETE /api/announcements/:id
```

### Get Announcements by Priority

```http
GET /api/announcements/priority/:priority
```

### Get Announcement Statistics

```http
GET /api/announcements/stats/overview
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 50,
    "published": 30,
    "draft": 20,
    "urgent": 5,
    "high": 10,
    "normal": 25,
    "low": 10
  }
}
```

---

## 🔧 System Endpoints

### Health Check

```http
GET /
```

### Database Connection Test

```http
GET /test-db
```

### Run Database Migrations

```http
POST /migrate
```

---

## 📊 Error Responses

All endpoints return consistent error responses:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (development only)"
}
```

---

## 🔐 Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. **Authentication** is handled by Supabase Auth
3. **Authorization** is role-based (admin, staff, resident)
4. **Input validation** is performed on all endpoints
5. **Error handling** is comprehensive and secure

---

## 🚀 Getting Started

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Run migrations:**

   ```bash
   npm run migrate
   ```

3. **Test the API:**

   ```bash
   curl http://localhost:3000/
   ```

4. **Register a user:**
   ```bash
   curl -X POST http://localhost:3000/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'
   ```
