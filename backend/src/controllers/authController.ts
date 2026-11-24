
import type { Request, Response } from "express";
import { loginUser } from "../services/authService.js";

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
