import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gztffxozneefcboctbsd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dGZmeG96bmVlZmNib2N0YnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDg2ODMsImV4cCI6MjA2NzQ4NDY4M30.IYOYPTpTNsKRcyMlcNeCao1_ix2Zi4lT8L7uW10JzUc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const auth = {
  // Sign up with email and password
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database operations
export const db = {
  // Get all records from a table
  getAll: async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    return { data, error };
  },

  // Get a single record by ID
  getById: async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  },

  // Insert a new record
  insert: async (table, record) => {
    const { data, error } = await supabase
      .from(table)
      .insert([record])
      .select();
    return { data, error };
  },

  // Update a record
  update: async (table, id, updates) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq("id", id)
      .select();
    return { data, error };
  },

  // Delete a record
  delete: async (table, id) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    return { error };
  },
};

export default supabase;
