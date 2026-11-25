
import type {
    Employee,
    CreateEmployeeInput,
    UpdateEmployeeInput,
    EmployeeWithoutAccount
} from "../types/employee";

const API_URL = "http://localhost:5000/api/employees";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return response.json();
};

export const createEmployee = async (
    employeeData: CreateEmployeeInput
): Promise<void> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
        throw new Error("Failed to create employee");
    }
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }

    const result: { message: string; data: Employee } =
        await response.json();

    return result.data;
};

export const updateEmployee = async (
    id: number,
    employeeData: UpdateEmployeeInput
): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
        throw new Error("Failed to update employee");
    }
};

export const deleteEmployee = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
};

export const updateOwnProfile = async (
    profileData: {
        phone: string | null;
        address: string | null;
        profile_picture: string | null;
    }
): Promise<void> => {
    const response = await fetch(`${API_URL}/my-profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update profile");
    }
};

export interface EmployeeStatistics {
    totalEmployees: number;
    employeesBySection: {
        section_id: number;
        section_name: string;
        employee_count: string;
    }[];
}

export const getEmployeeStatistics = async (): Promise<EmployeeStatistics> => {
    const response = await fetch(`${API_URL}/statistics`, {
        method: "GET",
        headers: getAuthHeaders()
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch employee statistics");
    }

    return result.data;
};

export const getEmployeesWithoutAccounts = async (): Promise<EmployeeWithoutAccount[]> => {
    const response = await fetch(`${API_URL}/without-accounts`, {
        method: "GET",
        headers: getAuthHeaders()
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch employees without accounts"
        );
    }

    return result.data;
};