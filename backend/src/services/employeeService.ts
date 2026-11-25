import pool from "../config/db.js";
import { CREATE_EMPLOYEE_QUERY } from "../queries/employeeQueries.js";
import { CreateEmployeeInput, Employee, UpdateEmployeeInput } from "../types/employeeTypes.js";
import { GET_ALL_EMPLOYEES_QUERY, GET_EMPLOYEE_BY_ID_QUERY, UPDATE_EMPLOYEE_QUERY, DELETE_EMPLOYEE_QUERY, UPDATE_OWN_PROFILE_QUERY, GET_EMPLOYEE_COUNT_BY_SECTION_QUERY, GET_TOTAL_EMPLOYEE_COUNT_QUERY, GET_EMPLOYEES_WITHOUT_ACCOUNTS_QUERY } from "../queries/employeeQueries.js";

export const createEmployee = async (employeeData: CreateEmployeeInput) => {
    const values = [
        employeeData.employee_code,
        employeeData.first_name,
        employeeData.last_name,
        employeeData.date_of_birth ?? null,
        employeeData.gender ?? null,
        employeeData.phone ?? null,
        employeeData.address ?? null,
        employeeData.email,
        employeeData.profile_picture ?? null,
        employeeData.section_id ?? null,
        employeeData.position ?? null,
        employeeData.employee_type ?? null,
        employeeData.date_joined
    ];

    const result = await pool.query(CREATE_EMPLOYEE_QUERY, values);

    return result.rows[0];
};


export const getAllEmployees = async (): Promise<Employee[]> => {
    const result = await pool.query<Employee>(GET_ALL_EMPLOYEES_QUERY);

    return result.rows;
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    const result = await pool.query<Employee>(
        GET_EMPLOYEE_BY_ID_QUERY,
        [id]
    );

    return result.rows[0] ?? null;
};

export const updateEmployee = async (
    id: number,
    employeeData: UpdateEmployeeInput
): Promise<Employee | null> => {
    const values = [
        employeeData.first_name ?? null,
        employeeData.last_name ?? null,
        employeeData.date_of_birth ?? null,
        employeeData.gender ?? null,
        employeeData.phone ?? null,
        employeeData.address ?? null,
        employeeData.email ?? null,
        employeeData.profile_picture ?? null,
        employeeData.section_id ?? null,
        employeeData.position ?? null,
        employeeData.employee_type ?? null,
        employeeData.date_joined ?? null,
        id
    ];

    const result = await pool.query<Employee>(
        UPDATE_EMPLOYEE_QUERY,
        values
    );

    return result.rows[0] ?? null;
};

export const deleteEmployee = async (id: number): Promise<Employee | null> => {
    const result = await pool.query<Employee>(
        DELETE_EMPLOYEE_QUERY,
        [id]
    );

    return result.rows[0] ?? null;
};

export const updateOwnProfile = async (
    id: number,
    profileData: {
        phone: string | null;
        address: string | null;
        profile_picture: string | null;
    }
): Promise<Employee | null> => {
    const values = [
        profileData.phone,
        profileData.address,
        profileData.profile_picture,
        id
    ];

    const result = await pool.query<Employee>(
        UPDATE_OWN_PROFILE_QUERY,
        values
    );

    return result.rows[0] ?? null;
};
export const getTotalEmployeeCount = async (): Promise<number> => {
    const result = await pool.query(
        GET_TOTAL_EMPLOYEE_COUNT_QUERY
    );

    return Number(result.rows[0].total_employees);
};

export const getEmployeeCountBySection = async () => {
    const result = await pool.query(
        GET_EMPLOYEE_COUNT_BY_SECTION_QUERY
    );

    return result.rows;
};

export const getEmployeesWithoutAccounts = async () => {
    const result = await pool.query(
        GET_EMPLOYEES_WITHOUT_ACCOUNTS_QUERY
    );

    return result.rows;
};