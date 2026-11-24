import type { LoginInput, LoginResponse } from "../types/auth";

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