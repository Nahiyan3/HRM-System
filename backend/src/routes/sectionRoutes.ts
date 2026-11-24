import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
    createSectionController,
    getAllSectionsController,
    getSectionByIdController,
    updateSectionController,
    deleteSectionController
} from "../controllers/sectionController.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("ADMIN"));

router.post("/", createSectionController);
router.get("/", getAllSectionsController);
router.get("/:id", getSectionByIdController);
router.put("/:id", updateSectionController);
router.delete("/:id", deleteSectionController);

export default router;