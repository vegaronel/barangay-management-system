import ServiceRequestService from "../services/serviceRequestService.js";

export class ServiceRequestController {
  constructor() {
    this.serviceRequestService = new ServiceRequestService();
  }

  async createRequest(req, res) {
    try {
      const result = await this.serviceRequestService.createRequest(req.body);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Create request error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getUserRequests(req, res) {
    try {
      const { userId } = req.params;

      const result = await this.serviceRequestService.getUserRequests(userId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get user requests error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAllRequests(req, res) {
    try {
      const result = await this.serviceRequestService.getAllRequests();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get all requests error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getRequestById(req, res) {
    try {
      const { id } = req.params;

      const result = await this.serviceRequestService.getRequestById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Get request by ID error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateRequestStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const result = await this.serviceRequestService.updateRequestStatus(
        id,
        status,
        notes
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Update request status error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getRequestsByStatus(req, res) {
    try {
      const { status } = req.params;

      const result = await this.serviceRequestService.getRequestsByStatus(
        status
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get requests by status error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async deleteRequest(req, res) {
    try {
      const { id } = req.params;

      const result = await this.serviceRequestService.deleteRequest(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Delete request error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getRequestStats(req, res) {
    try {
      const result = await this.serviceRequestService.getRequestStats();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get request stats error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default ServiceRequestController;
