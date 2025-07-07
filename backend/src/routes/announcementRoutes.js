import express from "express";
import AnnouncementController from "../controllers/announcementController.js";

const router = express.Router();
const announcementController = new AnnouncementController();

// Public routes (no authentication required)
router.get(
  "/published",
  announcementController.getPublishedAnnouncements.bind(announcementController)
);
router.get(
  "/priority/:priority",
  announcementController.getAnnouncementsByPriority.bind(announcementController)
);
router.get(
  "/stats/overview",
  announcementController.getAnnouncementStats.bind(announcementController)
);

// Admin routes (authentication required)
router.get(
  "/",
  announcementController.getAllAnnouncements.bind(announcementController)
);
router.post(
  "/",
  announcementController.createAnnouncement.bind(announcementController)
);
router.get(
  "/:id",
  announcementController.getAnnouncementById.bind(announcementController)
);
router.put(
  "/:id",
  announcementController.updateAnnouncement.bind(announcementController)
);
router.patch(
  "/:id/publish",
  announcementController.publishAnnouncement.bind(announcementController)
);
router.patch(
  "/:id/unpublish",
  announcementController.unpublishAnnouncement.bind(announcementController)
);
router.delete(
  "/:id",
  announcementController.deleteAnnouncement.bind(announcementController)
);

export default router;
