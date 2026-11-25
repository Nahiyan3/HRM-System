import express from "express";

import {
    loginController,
    logoutController,
    registerAdminController
} from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);
router.post("/register-admin", registerAdminController);

export default router;