import { supabase } from "../../config/db.js";

export class UserService {
  constructor() {
    this.supabase = supabase;
  }

  async registerUser(userData) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        barangay,
        city,
        postalCode,
      } = userData;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        throw new Error(
          "First name, last name, email, and password are required"
        );
      }

      // Check if user already exists
      const { data: existingUser } = await this.supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } =
        await this.supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
            },
          },
        });

      if (authError) {
        throw new Error(authError.message);
      }

      // Store additional user data in users table
      const { data: createdUser, error: userError } = await this.supabase
        .from("users")
        .insert([
          {
            id: authData.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            phone_number: phoneNumber || null,
            address: address || null,
            barangay: barangay || null,
            city: city || null,
            postal_code: postalCode || null,
            role: "resident",
            status: "active",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (userError) {
        // If user data insertion fails, we should clean up the auth user
        // For now, we'll just throw an error
        console.error("User profile creation error:", userError);
        throw new Error(`Error creating user profile: ${userError.message}`);
      }

      return {
        success: true,
        message:
          "User registered successfully. Please check your email to verify your account.",
        data: {
          id: createdUser.id,
          email: createdUser.email,
          full_name: createdUser.full_name,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async loginUser(email, password) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Get user profile data
      const { data: userProfile } = await this.supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      return {
        success: true,
        data: {
          user: data.user,
          profile: userProfile,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser();

      if (error || !user) {
        throw new Error("User not authenticated");
      }

      // Get user profile data
      const { data: userProfile } = await this.supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      return {
        success: true,
        data: {
          user,
          profile: userProfile,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await this.supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getAllUsers() {
    try {
      const { data, error } = await this.supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getUserById(userId) {
    try {
      const { data, error } = await this.supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteUser(userId) {
    try {
      const { error } = await this.supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "User deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default UserService;
