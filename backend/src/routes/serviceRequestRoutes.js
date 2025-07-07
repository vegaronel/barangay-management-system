import express from "express";
import ServiceRequestController from "../controllers/serviceRequestController.js";

const router = express.Router();
const serviceRequestController = new ServiceRequestController();

// Public routes (authentication required)
router.post(
  "/",
  serviceRequestController.createRequest.bind(serviceRequestController)
);
router.get(
  "/stats",
  serviceRequestController.getRequestStats.bind(serviceRequestController)
);
router.get(
  "/user/:userId",
  serviceRequestController.getUserRequests.bind(serviceRequestController)
);
router.get(
  "/status/:status",
  serviceRequestController.getRequestsByStatus.bind(serviceRequestController)
);

// Admin routes (admin authentication required)
router.get(
  "/",
  serviceRequestController.getAllRequests.bind(serviceRequestController)
);
router.get(
  "/:id",
  serviceRequestController.getRequestById.bind(serviceRequestController)
);
router.put(
  "/:id/status",
  serviceRequestController.updateRequestStatus.bind(serviceRequestController)
);
router.delete(
  "/:id",
  serviceRequestController.deleteRequest.bind(serviceRequestController)
);

export default router;
