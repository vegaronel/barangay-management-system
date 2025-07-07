import BarangayService from "../services/barangayService.js";

export class BarangayController {
  constructor() {
    this.barangayService = new BarangayService();
  }

  async getAllServices(req, res) {
    try {
      const result = await this.barangayService.getAllServices();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get all services error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getServiceById(req, res) {
    try {
      const { id } = req.params;

      const result = await this.barangayService.getServiceById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Get service by ID error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async createService(req, res) {
    try {
      const result = await this.barangayService.createService(req.body);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Create service error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateService(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const result = await this.barangayService.updateService(id, updates);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Update service error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async deleteService(req, res) {
    try {
      const { id } = req.params;

      const result = await this.barangayService.deleteService(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Delete service error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getServicesByCategory(req, res) {
    try {
      const { category } = req.params;

      const result = await this.barangayService.getServicesByCategory(category);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get services by category error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async toggleServiceStatus(req, res) {
    try {
      const { id } = req.params;

      const result = await this.barangayService.toggleServiceStatus(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Toggle service status error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default BarangayController;
