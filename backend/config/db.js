import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export const testConnection = async () => {
  try {
    // Test connection by making a simple query to the auth schema
    const { data, error } = await supabase
      .from("auth.users")
      .select("id")
      .limit(1);

    // If we get an error about the table not existing, that's fine - it means connection works
    if (
      error &&
      (error.message.includes("does not exist") ||
        error.message.includes("permission"))
    ) {
      console.log("Supabase connected successfully! (Connection test passed)");
      return true;
    } else if (error) {
      console.log("Supabase connection test:", error.message);
      return false;
    }

    console.log("Supabase connected successfully!");
    return true;
  } catch (error) {
    console.error("Supabase connection error:", error.message);
    return false;
  }
};

export default supabase;
