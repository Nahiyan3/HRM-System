import { Request, Response } from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, updateOwnProfile, getEmployeeCountBySection, getTotalEmployeeCount, getEmployeesWithoutAccounts } from "../services/employeeService.js";

export const createEmployeeController = async (
    req: Request,
    res: Response
) => {
    try {
        const employee = await createEmployee(req.body);

        res.status(201).json({
            message: "Employee created successfully!",
            data: employee
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create employee"
        });
    }
};


export const getAllEmployeesController = async (
    req: Request,
    res: Response
) => {
    try {
        const employees = await getAllEmployees();

        res.status(200).json(employees);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve employees"
        });
    }
};

export const getEmployeeByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        const employee = await getEmployeeById(id);

        if (!employee) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee retrieved successfully!",
            data: employee
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve employee"
        });
    }
};

export const updateEmployeeController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        const employee = await updateEmployee(id, req.body);

        if (!employee) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee updated successfully!",
            data: employee
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update employee"
        });
    }
};

export const deleteEmployeeController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        const employee = await deleteEmployee(id);

        if (!employee) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee deleted successfully!",
            data: employee
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete employee"
        });
    }
};

export const updateOwnProfileController = async (
    req: Request,
    res: Response
) => {
    try {
        const employeeId = req.user?.employeeId;

        if (!employeeId) {
            res.status(403).json({
                message: "Employee account required."
            });
            return;
        }

        const { phone, address, profile_picture } = req.body;

        const employee = await updateOwnProfile(employeeId, {
            phone: phone ?? null,
            address: address ?? null,
            profile_picture: profile_picture ?? null
        });

        if (!employee) {
            res.status(404).json({
                message: "Employee not found."
            });
            return;
        }

        res.status(200).json({
            message: "Profile updated successfully!",
            data: employee
        });

    } catch (error) {
        console.error("Error updating employee profile:", error);

        res.status(500).json({
            message: "Failed to update profile."
        });
    }
};

export const getEmployeeStatisticsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const totalEmployees = await getTotalEmployeeCount();
        const employeesBySection = await getEmployeeCountBySection();

        res.status(200).json({
            message: "Employee statistics retrieved successfully!",
            data: {
                totalEmployees,
                employeesBySection
            }
        });

    } catch (error) {
        console.error("Error retrieving employee statistics:", error);

        res.status(500).json({
            message: "Failed to retrieve employee statistics."
        });
    }
};

export const getEmployeesWithoutAccountsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employees = await getEmployeesWithoutAccounts();

        res.status(200).json({
            message: "Employees without accounts retrieved successfully.",
            data: employees
        });
    } catch (error) {
        console.error("Error retrieving employees without accounts:", error);

        res.status(500).json({
            message: "Failed to retrieve employees without accounts."
        });
    }
};