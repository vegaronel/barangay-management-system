import { supabase } from "../../config/db.js";

export class ServiceRequestService {
  constructor() {
    this.supabase = supabase;
  }

  async createRequest(requestData) {
    try {
      const { user_id, service_id, notes, documents } = requestData;

      if (!user_id || !service_id) {
        throw new Error("User ID and Service ID are required");
      }

      // Verify service exists and is active
      const { data: service } = await this.supabase
        .from("barangay_services")
        .select("id, name, fee")
        .eq("id", service_id)
        .eq("is_active", true)
        .single();

      if (!service) {
        throw new Error("Service not found or inactive");
      }

      const { data, error } = await this.supabase
        .from("service_requests")
        .insert([
          {
            user_id,
            service_id,
            status: "pending",
            notes: notes || null,
            documents: documents || [],
            request_date: new Date().toISOString(),
          },
        ])
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          ),
          users (
            id,
            full_name,
            email
          )
        `
        )
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Service request created successfully",
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getUserRequests(userId) {
    try {
      const { data, error } = await this.supabase
        .from("service_requests")
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          )
        `
        )
        .eq("user_id", userId)
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

  async getAllRequests() {
    try {
      const { data, error } = await this.supabase
        .from("service_requests")
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          ),
          users (
            id,
            full_name,
            email,
            phone_number
          )
        `
        )
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

  async getRequestById(requestId) {
    try {
      const { data, error } = await this.supabase
        .from("service_requests")
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          ),
          users (
            id,
            full_name,
            email,
            phone_number,
            address,
            barangay,
            city
          )
        `
        )
        .eq("id", requestId)
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

  async updateRequestStatus(requestId, status, notes = null) {
    try {
      const validStatuses = ["pending", "processing", "completed", "rejected"];

      if (!validStatuses.includes(status)) {
        throw new Error(
          "Invalid status. Must be one of: pending, processing, completed, rejected"
        );
      }

      const updates = {
        status,
        notes: notes || null,
      };

      // Set completed_date if status is completed
      if (status === "completed") {
        updates.completed_date = new Date().toISOString();
      }

      const { data, error } = await this.supabase
        .from("service_requests")
        .update(updates)
        .eq("id", requestId)
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          ),
          users (
            id,
            full_name,
            email,
            phone_number
          )
        `
        )
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: `Request status updated to ${status}`,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getRequestsByStatus(status) {
    try {
      const { data, error } = await this.supabase
        .from("service_requests")
        .select(
          `
          *,
          barangay_services (
            id,
            name,
            description,
            category,
            requirements,
            processing_time,
            fee
          ),
          users (
            id,
            full_name,
            email,
            phone_number
          )
        `
        )
        .eq("status", status)
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

  async deleteRequest(requestId) {
    try {
      const { error } = await this.supabase
        .from("service_requests")
        .delete()
        .eq("id", requestId);

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Service request deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getRequestStats() {
    try {
      const { data, error } = await this.supabase
        .from("service_requests")
        .select("status");

      if (error) {
        throw new Error(error.message);
      }

      const stats = {
        total: data.length,
        pending: data.filter((req) => req.status === "pending").length,
        processing: data.filter((req) => req.status === "processing").length,
        completed: data.filter((req) => req.status === "completed").length,
        rejected: data.filter((req) => req.status === "rejected").length,
      };

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default ServiceRequestService;
