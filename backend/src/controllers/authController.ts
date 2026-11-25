
import type { Request, Response } from "express";
import { loginUser, registerAdmin } from "../services/authService.js";

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            message: "Login successful!",
            data: result
        });
    } catch (error) {
        res.status(401).json({
            message: "Invalid email or password."
        });
    }
};

export const logoutController = (
    req: Request,
    res: Response
): void => {
    res.status(200).json({
        message: "Logout successful!"
    });
};

export const registerAdminController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password, registrationKey } = req.body;

        if (!email || !password || !registrationKey) {
            res.status(400).json({
                message: "All fields are required."
            });
            return;
        }

        if (password.length < 8) {
            res.status(400).json({
                message: "Password must be at least 8 characters."
            });
            return;
        }

        const result = await registerAdmin(
            email,
            password,
            registrationKey
        );

        res.status(201).json({
            message: "Admin account created successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Admin registration failed."
        });
    }
};
