export interface User {
    id: number;
    email: string;
    password_hash: string;
    role: "ADMIN" | "EMPLOYEE";
    employee_id: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserInput {
    email: string;
    password: string;
    role: "ADMIN" | "EMPLOYEE";
    employee_id?: number | null;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface EmployeeUser {
    id: number;
    email: string;
    role: "EMPLOYEE";
    employee_id: number;
    employee_code: string;
    first_name: string;
    last_name: string;
    position: string | null;
    section_name: string | null;
}