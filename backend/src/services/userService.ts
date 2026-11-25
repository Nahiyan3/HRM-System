import bcrypt from "bcrypt";
import pool from "../config/db.js";
import type {
    User,
    CreateUserInput,
    EmployeeUser
} from "../types/userTypes.js";

import {
    CREATE_USER_QUERY,
    GET_USER_BY_EMAIL_QUERY,
    GET_USER_BY_ID_QUERY,
    GET_EMPLOYEE_BY_ID_QUERY,
    GET_USER_BY_EMPLOYEE_ID_QUERY,
    GET_ALL_EMPLOYEE_USERS_QUERY,
    UPDATE_USER_PASSWORD_QUERY
} from "../queries/userQueries.js";

export const createUser = async (
    userData: CreateUserInput
): Promise<User> => {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const result = await pool.query<User>(
        CREATE_USER_QUERY,
        [
            userData.email,
            passwordHash,
            userData.role,
            userData.employee_id ?? null
        ]
    );

    return result.rows[0];
};

export const getUserByEmail = async (
    email: string
): Promise<User | null> => {
    const result = await pool.query<User>(
        GET_USER_BY_EMAIL_QUERY,
        [email]
    );

    return result.rows[0] ?? null;
};

export const getUserById = async (
    id: number
): Promise<User | null> => {
    const result = await pool.query<User>(
        GET_USER_BY_ID_QUERY,
        [id]
    );

    return result.rows[0] ?? null;
};

export const getEmployeeById = async (
    employeeId: number
): Promise<boolean> => {
    const result = await pool.query(
        GET_EMPLOYEE_BY_ID_QUERY,
        [employeeId]
    );

    return result.rows.length > 0;
};

export const getUserByEmployeeId = async (
    employeeId: number
): Promise<User | null> => {
    const result = await pool.query<User>(
        GET_USER_BY_EMPLOYEE_ID_QUERY,
        [employeeId]
    );

    return result.rows[0] ?? null;
};

export const getAllEmployeeUsers = async (): Promise<EmployeeUser[]> => {
    const result = await pool.query<EmployeeUser>(
        GET_ALL_EMPLOYEE_USERS_QUERY
    );

    return result.rows;
};

export const updateUserPassword = async (
    userId: number,
    newPassword: string
): Promise<boolean> => {
    const passwordHash = await bcrypt.hash(newPassword, 10);

    const result = await pool.query(
        UPDATE_USER_PASSWORD_QUERY,
        [passwordHash, userId]
    );

    return result.rows.length > 0;
};

export const verifyUserPassword = async (
    userId: number,
    currentPassword: string
): Promise<boolean> => {
    const user = await getUserById(userId);

    if (!user) {
        return false;
    }

    return bcrypt.compare(currentPassword, user.password_hash);
};

export const changeOwnPassword = async (
    userId: number,
    currentPassword: string,
    newPassword: string
): Promise<string> => {
    const passwordIsCorrect = await verifyUserPassword(
        userId,
        currentPassword
    );

    if (!passwordIsCorrect) {
        throw new Error("Current password is incorrect.");
    }

    if (currentPassword === newPassword) {
        throw new Error(
            "New password must be different from the current password."
        );
    }

    await updateUserPassword(userId, newPassword);

    return "Password changed successfully!";
};