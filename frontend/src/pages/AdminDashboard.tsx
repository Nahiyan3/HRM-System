import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import {
    getEmployeeStatistics,
    type EmployeeStatistics
} from "../services/employeeService";

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState<EmployeeStatistics | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const result = await getEmployeeStatistics();
                setStatistics(result);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load statistics."
                );
            }
        };

        fetchStatistics();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!statistics) {
        return <p>Loading dashboard...</p>;
    }
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="dashboard-card">
                <h2>Total Employees</h2>
                <p className="total-count">{statistics.totalEmployees}</p>
            </div>

            <div className="dashboard-card">
                <h2>Employees by Section</h2>

                <div className="section-list">
                    {statistics.employeesBySection.map((section) => (
                        <div className="section-item" key={section.section_id}>
                            <p>{section.section_name}</p>
                            <strong>{section.employee_count}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;