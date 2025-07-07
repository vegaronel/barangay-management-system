# BRGY Management System - Backend API

A clean, scalable backend API for the Barangay Management System built with Node.js, Express, and Supabase.

## 🏗️ Architecture

This backend follows a clean architecture pattern with the following structure:

```
backend/
├── config/
│   └── db.js                 # Database configuration
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   └── userController.js
│   ├── services/            # Business logic layer
│   │   └── userService.js
│   ├── routes/              # API route definitions
│   │   └── userRoutes.js
│   ├── database/            # Database migrations
│   │   └── migrations.js
│   ├── scripts/             # Utility scripts
│   │   └── migrate.js
│   └── app.js               # Main application file
├── .env                     # Environment variables
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
NODE_ENV=development
```

### 3. Run Database Migrations

```bash
npm run migrate
```

### 4. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📊 API Endpoints

### Health Check

- `GET /` - Health check and API status
- `GET /test-db` - Database connection test
- `POST /migrate` - Run database migrations

### User Management

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Legacy Endpoints (for backward compatibility)

- `POST /register` - Redirects to `/api/users/register`
- `POST /login` - Redirects to `/api/users/login`

## 🗄️ Database Schema

The system automatically creates the following tables:

### Users Table

- `id` (UUID, Primary Key) - References auth.users
- `email` (VARCHAR) - User email
- `first_name` (VARCHAR) - First name
- `last_name` (VARCHAR) - Last name
- `full_name` (VARCHAR) - Full name
- `phone_number` (VARCHAR) - Phone number
- `address` (TEXT) - Street address
- `barangay` (VARCHAR) - Barangay name
- `city` (VARCHAR) - City name
- `postal_code` (VARCHAR) - Postal code
- `role` (VARCHAR) - User role (admin, staff, resident)
- `status` (VARCHAR) - User status (active, inactive, suspended)
- `profile_image_url` (TEXT) - Profile image URL
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Barangay Services Table

- `id` (UUID, Primary Key) - Service ID
- `name` (VARCHAR) - Service name
- `description` (TEXT) - Service description
- `category` (VARCHAR) - Service category
- `requirements` (TEXT[]) - Required documents
- `processing_time` (VARCHAR) - Processing time
- `fee` (DECIMAL) - Service fee
- `is_active` (BOOLEAN) - Service availability
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Service Requests Table

- `id` (UUID, Primary Key) - Request ID
- `user_id` (UUID) - User ID (foreign key)
- `service_id` (UUID) - Service ID (foreign key)
- `status` (VARCHAR) - Request status
- `request_date` (TIMESTAMP) - Request date
- `completed_date` (TIMESTAMP) - Completion date
- `notes` (TEXT) - Additional notes
- `documents` (TEXT[]) - Submitted documents
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Announcements Table

- `id` (UUID, Primary Key) - Announcement ID
- `title` (VARCHAR) - Announcement title
- `content` (TEXT) - Announcement content
- `author_id` (UUID) - Author ID (foreign key)
- `priority` (VARCHAR) - Priority level
- `is_published` (BOOLEAN) - Publication status
- `published_at` (TIMESTAMP) - Publication date
- `expires_at` (TIMESTAMP) - Expiration date
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## 🔐 Security Features

- **Row Level Security (RLS)** - Enabled on all tables
- **Authentication** - Supabase Auth integration
- **Authorization** - Role-based access control
- **Input Validation** - Request validation in controllers
- **Error Handling** - Comprehensive error handling

## 🛠️ Development

### Running Migrations

```bash
# Run all migrations
npm run migrate

# Or via API endpoint
curl -X POST http://localhost:3000/migrate
```

### Adding New Features

1. **Create Service** - Add business logic in `src/services/`
2. **Create Controller** - Add HTTP handlers in `src/controllers/`
3. **Create Routes** - Add API routes in `src/routes/`
4. **Update App** - Register new routes in `src/app.js`

### Code Style

- Use ES6+ features
- Follow async/await pattern
- Implement proper error handling
- Add JSDoc comments for complex functions

## 🚀 Deployment

### Environment Variables

Make sure to set the following environment variables in production:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `PORT`
- `NODE_ENV=production`

### Vercel Deployment

The project includes `vercel.json` for easy deployment to Vercel.

## 📝 License

ISC License
