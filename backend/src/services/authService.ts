import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginInput } from "../types/userTypes.js";
import { getUserByEmail } from "./userService.js";

export const loginUser = async (loginData: LoginInput) => {
    const user = await getUserByEmail(loginData.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
            employeeId: user.employee_id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            employee_id: user.employee_id
        }
    };
};