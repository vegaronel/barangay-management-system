import { supabase } from "../../config/db.js";

export class BarangayService {
  constructor() {
    this.supabase = supabase;
  }

  async getAllServices() {
    try {
      const { data, error } = await this.supabase
        .from("barangay_services")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });

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

  async getServiceById(serviceId) {
    try {
      const { data, error } = await this.supabase
        .from("barangay_services")
        .select("*")
        .eq("id", serviceId)
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

  async createService(serviceData) {
    try {
      const {
        name,
        description,
        category,
        requirements,
        processing_time,
        fee,
      } = serviceData;

      if (!name || !description) {
        throw new Error("Service name and description are required");
      }

      const { data, error } = await this.supabase
        .from("barangay_services")
        .insert([
          {
            name,
            description,
            category: category || "General",
            requirements: requirements || [],
            processing_time: processing_time || "3-5 business days",
            fee: fee || 0,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Service created successfully",
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateService(serviceId, updates) {
    try {
      const { data, error } = await this.supabase
        .from("barangay_services")
        .update(updates)
        .eq("id", serviceId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Service updated successfully",
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteService(serviceId) {
    try {
      const { error } = await this.supabase
        .from("barangay_services")
        .delete()
        .eq("id", serviceId);

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Service deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getServicesByCategory(category) {
    try {
      const { data, error } = await this.supabase
        .from("barangay_services")
        .select("*")
        .eq("category", category)
        .eq("is_active", true)
        .order("name", { ascending: true });

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

  async toggleServiceStatus(serviceId) {
    try {
      // Get current status
      const { data: currentService } = await this.supabase
        .from("barangay_services")
        .select("is_active")
        .eq("id", serviceId)
        .single();

      if (!currentService) {
        throw new Error("Service not found");
      }

      // Toggle status
      const { data, error } = await this.supabase
        .from("barangay_services")
        .update({ is_active: !currentService.is_active })
        .eq("id", serviceId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: `Service ${
          data.is_active ? "activated" : "deactivated"
        } successfully`,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default BarangayService;
