import { supabase, testConnection } from "./config/db.js";

console.log("Testing Supabase connection...");

testConnection()
  .then((isConnected) => {
    if (isConnected) {
      console.log("✅ Supabase connection successful!");
      process.exit(0);
    } else {
      console.log("❌ Supabase connection failed!");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("❌ Connection test error:", error);
    process.exit(1);
  });
