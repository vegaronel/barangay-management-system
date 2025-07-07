import express from "express";
import cors from "cors";
import { testConnection } from "../config/db.js";
import userRoutes from "./routes/userRoutes.js";
import barangayRoutes from "./routes/barangayRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import DatabaseMigration from "./database/migrations.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Health check endpoint
app.get("/", async (req, res) => {
  // Check if this is an email verification request with query parameters
  const { access_token, refresh_token, type } = req.query;

  if (type === "signup" && access_token) {
    // Redirect to frontend email verification page
    const frontendUrl = "http://localhost:5173"; // Hardcoded for now
    const redirectUrl = `${frontendUrl}/auth/verify?access_token=${access_token}&refresh_token=${refresh_token}&type=${type}`;
    return res.redirect(redirectUrl);
  }

  // For hash fragment verification (most common), serve the HTML page
  res.sendFile("verify.html", { root: "./public" });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  const isConnected = await testConnection();
  res.json({
    message: "BRGY Management System API",
    status: "running",
    version: "1.0.0",
    supabase: isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    endpoints: {
      users: "/api/users",
      services: "/api/services",
      requests: "/api/requests",
      announcements: "/api/announcements",
    },
  });
});

// Database connection test
app.get("/test-db", async (req, res) => {
  try {
    const isConnected = await testConnection();
    res.json({
      success: isConnected,
      message: isConnected
        ? "Database connected successfully"
        : "Database connection failed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection error",
      error: error.message,
    });
  }
});

// Database migration endpoint (for development)
app.post("/migrate", async (req, res) => {
  try {
    console.log("🚀 Starting database migration via API...");
    const migration = new DatabaseMigration();
    const success = await migration.runAllMigrations();

    if (success) {
      res.json({
        success: true,
        message: "Database migration completed successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Database migration failed",
      });
    }
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({
      success: false,
      message: "Migration error",
      error: error.message,
    });
  }
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/services", barangayRoutes);
app.use("/api/requests", serviceRequestRoutes);
app.use("/api/announcements", announcementRoutes);

// Legacy endpoints removed to fix routing issues
// Use /api/users/register and /api/users/login instead

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
    availableEndpoints: {
      users: "/api/users",
      services: "/api/services",
      requests: "/api/requests",
      announcements: "/api/announcements",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(
    `🗄️  Database migration: http://localhost:${PORT}/migrate (POST)`
  );
  console.log(`\n📋 Available API Endpoints:`);
  console.log(`   👥 Users: http://localhost:${PORT}/api/users`);
  console.log(`   🏢 Services: http://localhost:${PORT}/api/services`);
  console.log(`   📝 Requests: http://localhost:${PORT}/api/requests`);
  console.log(
    `   📢 Announcements: http://localhost:${PORT}/api/announcements`
  );
});

export default app;
