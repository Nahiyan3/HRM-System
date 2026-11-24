
import { useEffect, useState } from "react";


import { useAuth } from "../context/AuthContext";
import { getEmployeeById } from "../services/employeeService";

import type { Employee } from "../types/employee";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
    const { user } = useAuth();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!user?.employee_id) {
                setError("Employee information not found.");
                setLoading(false);
                return;
            }

            try {
                const result = await getEmployeeById(user.employee_id);
                setEmployee(result);
            } catch {
                setError("Failed to load employee information.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [user]);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!employee) {
        return <p>Employee information not found.</p>;
    }

    return (
        <div className="employee-dashboard">
            <div className="dashboard-welcome">
                <h1>Employee Dashboard</h1>
                <p>
                    Welcome back, {employee.first_name} {employee.last_name}!
                    Here's your employee overview.
                </p>
            </div>

            <div className="employee-info-grid">
                <div className="employee-info-card">
                    <h3>Employee ID</h3>
                    <p>{employee.employee_code}</p>
                </div>

                <div className="employee-info-card">
                    <h3>Full Name</h3>
                    <p>{employee.first_name} {employee.last_name}</p>
                </div>

                <div className="employee-info-card">
                    <h3>Section</h3>
                    <p>{employee.section_name || "Not assigned"}</p>
                </div>

                <div className="employee-info-card">
                    <h3>Position</h3>
                    <p>{employee.position || "Not assigned"}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
