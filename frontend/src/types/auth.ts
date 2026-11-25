export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthUser {
    id: number;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
    employee_id: number | null;
}

export interface LoginResponse {
    message: string;
    data: {
        token: string;
        user: AuthUser;
    };
}

export interface CreateUserInput {
    email: string;
    password: string;
    employee_id: number;
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

export interface RegisterAdminInput {
    email: string;
    password: string;
    registrationKey: string;
}