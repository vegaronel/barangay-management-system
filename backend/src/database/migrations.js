import { supabase } from "../../config/db.js";

export class DatabaseMigration {
  constructor() {
    this.supabase = supabase;
  }

  async createUsersTable() {
    try {
      // Check if table already exists by trying to select from it
      const { data, error: checkError } = await this.supabase
        .from("users")
        .select("id")
        .limit(1);

      if (checkError && checkError.code === "42P01") {
        // Table doesn't exist, we need to create it
        console.log("📋 Users table doesn't exist, creating...");

        // For now, let's just log that we need to create the table manually
        // since Supabase client doesn't support DDL operations directly
        console.log(
          "⚠️  Please create the users table manually in your Supabase dashboard:"
        );
        console.log(`
          CREATE TABLE public.users (
            id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            full_name VARCHAR(200) NOT NULL,
            phone_number VARCHAR(20),
            address TEXT,
            barangay VARCHAR(100),
            city VARCHAR(100),
            postal_code VARCHAR(10),
            role VARCHAR(50) DEFAULT 'resident' CHECK (role IN ('admin', 'staff', 'resident')),
            status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
            profile_image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `);
        return false;
      } else if (checkError) {
        console.error("Error checking users table:", checkError);
        return false;
      }

      console.log("✅ Users table already exists");
      return true;
    } catch (error) {
      console.error("Error in createUsersTable:", error);
      return false;
    }
  }

  async createBarangayServicesTable() {
    try {
      const { error } = await this.supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS public.barangay_services (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            description TEXT,
            category VARCHAR(100),
            requirements TEXT[],
            processing_time VARCHAR(100),
            fee DECIMAL(10,2) DEFAULT 0,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      });

      if (error) {
        console.error("Error creating barangay_services table:", error);
        return false;
      }

      console.log("✅ Barangay services table created successfully");
      return true;
    } catch (error) {
      console.error("Error in createBarangayServicesTable:", error);
      return false;
    }
  }

  async createServiceRequestsTable() {
    try {
      const { error } = await this.supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS public.service_requests (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
            service_id UUID REFERENCES public.barangay_services(id) ON DELETE CASCADE,
            status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
            request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            completed_date TIMESTAMP WITH TIME ZONE,
            notes TEXT,
            documents TEXT[],
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      });

      if (error) {
        console.error("Error creating service_requests table:", error);
        return false;
      }

      console.log("✅ Service requests table created successfully");
      return true;
    } catch (error) {
      console.error("Error in createServiceRequestsTable:", error);
      return false;
    }
  }

  async createAnnouncementsTable() {
    try {
      const { error } = await this.supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS public.announcements (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            content TEXT NOT NULL,
            author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
            priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
            is_published BOOLEAN DEFAULT false,
            published_at TIMESTAMP WITH TIME ZONE,
            expires_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      });

      if (error) {
        console.error("Error creating announcements table:", error);
        return false;
      }

      console.log("✅ Announcements table created successfully");
      return true;
    } catch (error) {
      console.error("Error in createAnnouncementsTable:", error);
      return false;
    }
  }

  async createTriggers() {
    try {
      // Create function to update updated_at timestamp
      const { error: functionError } = await this.supabase.rpc("exec_sql", {
        sql: `
          CREATE OR REPLACE FUNCTION update_updated_at_column()
          RETURNS TRIGGER AS $$
          BEGIN
              NEW.updated_at = NOW();
              RETURN NEW;
          END;
          $$ language 'plpgsql';
        `,
      });

      if (functionError) {
        console.error("Error creating update function:", functionError);
        return false;
      }

      // Create triggers for all tables
      const tables = [
        "users",
        "barangay_services",
        "service_requests",
        "announcements",
      ];

      for (const table of tables) {
        const { error: triggerError } = await this.supabase.rpc("exec_sql", {
          sql: `
            DROP TRIGGER IF EXISTS update_${table}_updated_at ON public.${table};
            CREATE TRIGGER update_${table}_updated_at 
              BEFORE UPDATE ON public.${table} 
              FOR EACH ROW 
              EXECUTE FUNCTION update_updated_at_column();
          `,
        });

        if (triggerError) {
          console.error(`Error creating trigger for ${table}:`, triggerError);
        } else {
          console.log(`✅ Trigger created for ${table} table`);
        }
      }

      return true;
    } catch (error) {
      console.error("Error in createTriggers:", error);
      return false;
    }
  }

  async enableRLS() {
    try {
      const tables = [
        "users",
        "barangay_services",
        "service_requests",
        "announcements",
      ];

      for (const table of tables) {
        const { error } = await this.supabase.rpc("exec_sql", {
          sql: `ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`,
        });

        if (error) {
          console.error(`Error enabling RLS for ${table}:`, error);
        } else {
          console.log(`✅ RLS enabled for ${table} table`);
        }
      }

      return true;
    } catch (error) {
      console.error("Error in enableRLS:", error);
      return false;
    }
  }

  async createPolicies() {
    try {
      // Users table policies
      const userPolicies = [
        {
          name: "Users can view own data",
          table: "users",
          sql: "FOR SELECT USING (auth.uid() = id)",
        },
        {
          name: "Users can update own data",
          table: "users",
          sql: "FOR UPDATE USING (auth.uid() = id)",
        },
        {
          name: "Admins can view all users",
          table: "users",
          sql: "FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))",
        },
        {
          name: "Admins can update all users",
          table: "users",
          sql: "FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))",
        },
        {
          name: "Allow user registration",
          table: "users",
          sql: "FOR INSERT WITH CHECK (auth.uid() = id)",
        },
      ];

      for (const policy of userPolicies) {
        const { error } = await this.supabase.rpc("exec_sql", {
          sql: `
            DROP POLICY IF EXISTS "${policy.name}" ON public.${policy.table};
            CREATE POLICY "${policy.name}" ON public.${policy.table} ${policy.sql};
          `,
        });

        if (error) {
          console.error(`Error creating policy ${policy.name}:`, error);
        } else {
          console.log(`✅ Policy created: ${policy.name}`);
        }
      }

      return true;
    } catch (error) {
      console.error("Error in createPolicies:", error);
      return false;
    }
  }

  async seedSampleData() {
    try {
      // Insert sample barangay services
      const { error } = await this.supabase.rpc("exec_sql", {
        sql: `
          INSERT INTO public.barangay_services (name, description, category, requirements, processing_time, fee) 
          VALUES
            ('Barangay Clearance', 'Official clearance from the barangay for various purposes', 'Documentation', ARRAY['Valid ID', 'Proof of Residency'], '3-5 business days', 50.00),
            ('Indigency Certificate', 'Certificate for indigent residents', 'Documentation', ARRAY['Valid ID', 'Proof of Income'], '2-3 business days', 25.00),
            ('Business Permit', 'Permit to operate business in the barangay', 'Business', ARRAY['Business Registration', 'Valid ID', 'Proof of Address'], '5-7 business days', 200.00),
            ('Community Service', 'Volunteer for community activities', 'Community', ARRAY['Valid ID'], 'Immediate', 0.00),
            ('Health Services', 'Basic health checkup and consultation', 'Health', ARRAY['Valid ID'], '1-2 business days', 0.00)
          ON CONFLICT DO NOTHING;
        `,
      });

      if (error) {
        console.error("Error seeding sample data:", error);
        return false;
      }

      console.log("✅ Sample data seeded successfully");
      return true;
    } catch (error) {
      console.error("Error in seedSampleData:", error);
      return false;
    }
  }

  async runAllMigrations() {
    console.log("🚀 Starting database migrations...");

    const migrations = [
      { name: "Users Table", fn: () => this.createUsersTable() },
      {
        name: "Barangay Services Table",
        fn: () => this.createBarangayServicesTable(),
      },
      {
        name: "Service Requests Table",
        fn: () => this.createServiceRequestsTable(),
      },
      {
        name: "Announcements Table",
        fn: () => this.createAnnouncementsTable(),
      },
      { name: "Triggers", fn: () => this.createTriggers() },
      { name: "RLS", fn: () => this.enableRLS() },
      { name: "Policies", fn: () => this.createPolicies() },
      { name: "Sample Data", fn: () => this.seedSampleData() },
    ];

    for (const migration of migrations) {
      console.log(`\n📋 Running migration: ${migration.name}`);
      const success = await migration.fn();
      if (!success) {
        console.error(`❌ Migration failed: ${migration.name}`);
        return false;
      }
    }

    console.log("\n🎉 All migrations completed successfully!");
    return true;
  }
}

export default DatabaseMigration;
