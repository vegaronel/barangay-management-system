import AnnouncementService from "../services/announcementService.js";

export class AnnouncementController {
  constructor() {
    this.announcementService = new AnnouncementService();
  }

  async createAnnouncement(req, res) {
    try {
      const result = await this.announcementService.createAnnouncement(
        req.body
      );

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAllAnnouncements(req, res) {
    try {
      const result = await this.announcementService.getAllAnnouncements();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get all announcements error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getPublishedAnnouncements(req, res) {
    try {
      const result = await this.announcementService.getPublishedAnnouncements();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get published announcements error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAnnouncementById(req, res) {
    try {
      const { id } = req.params;

      const result = await this.announcementService.getAnnouncementById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Get announcement by ID error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateAnnouncement(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const result = await this.announcementService.updateAnnouncement(
        id,
        updates
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async publishAnnouncement(req, res) {
    try {
      const { id } = req.params;

      const result = await this.announcementService.publishAnnouncement(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Publish announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async unpublishAnnouncement(req, res) {
    try {
      const { id } = req.params;

      const result = await this.announcementService.unpublishAnnouncement(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Unpublish announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async deleteAnnouncement(req, res) {
    try {
      const { id } = req.params;

      const result = await this.announcementService.deleteAnnouncement(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAnnouncementsByPriority(req, res) {
    try {
      const { priority } = req.params;

      const result = await this.announcementService.getAnnouncementsByPriority(
        priority
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get announcements by priority error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAnnouncementStats(req, res) {
    try {
      const result = await this.announcementService.getAnnouncementStats();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Get announcement stats error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default AnnouncementController;
