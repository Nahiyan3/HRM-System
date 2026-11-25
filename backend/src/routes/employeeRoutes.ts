
import { Router } from "express";

import {
    createEmployeeController,
    getAllEmployeesController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeController,
    updateOwnProfileController,
    getEmployeeStatisticsController,
    getEmployeesWithoutAccountsController
} from "../controllers/employeeController.js";

import { validateRequest } from "../middleware/validateRequest.js";
import { createEmployeeValidation } from "../middleware/employeeValidation.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { employeeAccessMiddleware } from "../middleware/employeeAccessMiddleware.js";

const router = Router();

// All employee routes require authentication.
router.use(authMiddleware);

// Admin-only routes.
router.post(
    "/",
    roleMiddleware("ADMIN"),
    createEmployeeValidation,
    validateRequest,
    createEmployeeController
);

router.get(
    "/",
    roleMiddleware("ADMIN"),
    getAllEmployeesController
);

router.put(
    "/my-profile",
    roleMiddleware("EMPLOYEE"),
    updateOwnProfileController
);

router.get(
    "/statistics",
    roleMiddleware("ADMIN"),
    getEmployeeStatisticsController
);

router.put(
    "/:id",
    roleMiddleware("ADMIN"),
    updateEmployeeController
);


router.delete(
    "/:id",
    roleMiddleware("ADMIN"),
    deleteEmployeeController
);

router.get(
    "/without-accounts",
    roleMiddleware("ADMIN"),
    getEmployeesWithoutAccountsController
);


// Admins can view any profile.
// Employees can only view their own profile.
router.get(
    "/:id",
    employeeAccessMiddleware,
    getEmployeeByIdController
);



export default router;
