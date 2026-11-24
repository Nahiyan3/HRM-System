
import type { CreateUserInput, EmployeeUser } from "../types/auth";

const API_URL = "http://localhost:5000/api/users";

export const createUser = async (
    userData: CreateUserInput
) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create user account.");
    }

    return result;
};


export const getAllEmployeeUsers = async (): Promise<EmployeeUser[]> => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to retrieve employee accounts.");
    }

    return result.data;
};

export const resetUserPassword = async (
    userId: number,
    newPassword: string
): Promise<void> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${userId}/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to reset password.");
    }
};

export const changeOwnPassword = async (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            currentPassword,
            newPassword
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to change password");
    }
};