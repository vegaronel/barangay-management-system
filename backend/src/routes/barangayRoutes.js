import express from "express";
import BarangayController from "../controllers/barangayController.js";

const router = express.Router();
const barangayController = new BarangayController();

// Public routes (no authentication required)
router.get("/", barangayController.getAllServices.bind(barangayController));
router.get(
  "/category/:category",
  barangayController.getServicesByCategory.bind(barangayController)
);

// Admin routes (authentication required)
router.post("/", barangayController.createService.bind(barangayController));
router.get("/:id", barangayController.getServiceById.bind(barangayController));
router.put("/:id", barangayController.updateService.bind(barangayController));
router.delete(
  "/:id",
  barangayController.deleteService.bind(barangayController)
);
router.patch(
  "/:id/toggle",
  barangayController.toggleServiceStatus.bind(barangayController)
);

export default router;
