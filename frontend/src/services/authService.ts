import type { LoginInput, LoginResponse, RegisterAdminInput } from "../types/auth";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (
    loginData: LoginInput
): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    const result: LoginResponse = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Login failed.");
    }

    return result;
};

export const registerAdmin = async (
    registrationData: RegisterAdminInput
): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/register-admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Admin registration failed.");
    }

    return result;
};

export const logout = async (): Promise<void> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to logout");
    }
};