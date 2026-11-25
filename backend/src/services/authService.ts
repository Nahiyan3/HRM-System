import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginInput } from "../types/userTypes.js";
import { getUserByEmail, createUser } from "./userService.js";

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

export const registerAdmin = async (
    email: string,
    password: string,
    registrationKey: string
) => {
    if (
        !process.env.ADMIN_REGISTRATION_KEY ||
        registrationKey !== process.env.ADMIN_REGISTRATION_KEY
    ) {
        throw new Error("Invalid registration key.");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        throw new Error("Email is already registered.");
    }

    const user = await createUser({
        email,
        password,
        role: "ADMIN",
        employee_id: null
    });

    return {
        id: user.id,
        email: user.email,
        role: user.role
    };
};