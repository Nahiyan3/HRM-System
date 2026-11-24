
import { Router } from "express";

import {
    createUserController,
    getAllEmployeeUsersController,
    resetUserPasswordController,
    changeOwnPasswordController
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// All routes require authentication.
router.use(authMiddleware);

// Employee changes their own password.
router.put(
    "/change-password",
    roleMiddleware("EMPLOYEE"),
    changeOwnPasswordController
);

// Admin-only account management.
router.post(
    "/",
    roleMiddleware("ADMIN"),
    createUserController
);

router.get(
    "/",
    roleMiddleware("ADMIN"),
    getAllEmployeeUsersController
);

router.put(
    "/:id/password",
    roleMiddleware("ADMIN"),
    resetUserPasswordController
);

export default router;
