export interface Employee {
    id: number;
    employee_code: string;
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    gender: string | null;
    phone: string | null;
    address: string | null;
    email: string;
    profile_picture: string | null;
    section_id: number | null;
    position: string | null;
    employee_type: string | null;
    date_joined: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateEmployeeInput {
    employee_code: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string | null;
    gender?: string | null;
    phone?: string | null;
    address?: string | null;
    email: string;
    profile_picture?: string | null;
    section_id?: number | null;
    position?: string | null;
    employee_type?: string | null;
    date_joined: string;
}

export interface UpdateEmployeeInput {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string | null;
    gender?: string | null;
    phone?: string | null;
    address?: string | null;
    email?: string;
    profile_picture?: string | null;
    section_id?: number | null;
    position?: string | null;
    employee_type?: string | null;
    date_joined?: string;
}
