
import type { Request, Response } from "express";

import {
    createUser,
    getEmployeeById,
    getUserByEmployeeId,
    getAllEmployeeUsers,
    updateUserPassword,
    verifyUserPassword
} from "../services/userService.js";

import type { CreateUserInput } from "../types/userTypes.js";

export const createUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employeeId = Number(req.body.employee_id);

        // Check whether the employee exists.
        const employeeExists = await getEmployeeById(employeeId);

        if (!employeeExists) {
            res.status(404).json({
                message: "Employee not found."
            });
            return;
        }

        // Check whether the employee already has an account.
        const existingUser = await getUserByEmployeeId(employeeId);

        if (existingUser) {
            res.status(409).json({
                message: "This employee already has an account."
            });
            return;
        }

        // Always create an EMPLOYEE account.
        const user = await createUser({
            ...req.body,
            role: "EMPLOYEE"
        } as CreateUserInput);

        res.status(201).json({
            message: "User account created successfully!",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                employee_id: user.employee_id
            }
        });
    } catch (error) {
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === "23505"
        ) {
            res.status(409).json({
                message: "An account with this email already exists."
            });
            return;
        }

        console.error("Error creating user:", error);

        res.status(500).json({
            message: "Failed to create user account."
        });
    }
};

export const getAllEmployeeUsersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await getAllEmployeeUsers();

        res.status(200).json({
            message: "Employee accounts retrieved successfully!",
            data: users
        });
    } catch (error) {
        console.error("Error retrieving employee accounts:", error);

        res.status(500).json({
            message: "Failed to retrieve employee accounts."
        });
    }
};


export const resetUserPasswordController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = Number(req.params.id);
        const { newPassword } = req.body;

        const updated = await updateUserPassword(
            userId,
            newPassword
        );

        if (!updated) {
            res.status(404).json({
                message: "User account not found."
            });
            return;
        }

        res.status(200).json({
            message: "Employee password reset successfully!"
        });
    } catch (error) {
        console.error("Error resetting password:", error);

        res.status(500).json({
            message: "Failed to reset employee password."
        });
    }
};

export const changeOwnPasswordController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                message: "Authentication required."
            });
            return;
        }

        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({
                message: "Current password and new password are required."
            });
            return;
        }

        if (newPassword.length < 8) {
            res.status(400).json({
                message: "New password must be at least 8 characters long."
            });
            return;
        }

        const passwordIsCorrect = await verifyUserPassword(
            userId,
            currentPassword
        );

        if (!passwordIsCorrect) {
            res.status(400).json({
                message: "Current password is incorrect."
            });
            return;
        }

        if (currentPassword === newPassword) {
            res.status(400).json({
                message: "New password must be different from the current password."
            });
            return;
        }

        await updateUserPassword(userId, newPassword);

        res.status(200).json({
            message: "Password changed successfully!"
        });

    } catch (error) {
        console.error("Error changing password:", error);

        res.status(500).json({
            message: "Failed to change password."
        });
    }
};