
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeeService";
import "./EmployeeDetails.css";

function EmployeeDetails() {
    const { id } = useParams<{ id: string }>();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(Number(id));
                setEmployee(data);
            } catch (error) {
                setError("Failed to load employee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return (
            <p className="employee-details-message">
                Loading employee details...
            </p>
        );
    }

    if (error || !employee) {
        return (
            <p className="employee-details-error">
                {error || "Employee not found."}
            </p>
        );
    }

    return (
        <div className="employee-details-page">

            <div className="employee-details-header">
                <h1>Employee Details</h1>
            </div>

            <div className="employee-details-card">

                <div className="employee-details-grid">

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Employee Code
                        </span>
                        <span className="employee-detail-value employee-code">
                            {employee.employee_code}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            First Name
                        </span>
                        <span className="employee-detail-value">
                            {employee.first_name}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Last Name
                        </span>
                        <span className="employee-detail-value">
                            {employee.last_name}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Email
                        </span>
                        <span className="employee-detail-value">
                            {employee.email}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Date of Birth
                        </span>
                        <span className="employee-detail-value">
                            {employee.date_of_birth
                                ? employee.date_of_birth.slice(0, 10)
                                : "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Gender
                        </span>
                        <span className="employee-detail-value">
                            {employee.gender || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Phone
                        </span>
                        <span className="employee-detail-value">
                            {employee.phone || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Address
                        </span>
                        <span className="employee-detail-value">
                            {employee.address || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Section
                        </span>
                        <span className="employee-detail-value">
                            {employee.section_name || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Position
                        </span>
                        <span className="employee-detail-value">
                            {employee.position || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Employee Type
                        </span>
                        <span className="employee-detail-value">
                            {employee.employee_type || "N/A"}
                        </span>
                    </div>

                    <div className="employee-detail-item">
                        <span className="employee-detail-label">
                            Date Joined
                        </span>
                        <span className="employee-detail-value">
                            {employee.date_joined.slice(0, 10)}
                        </span>
                    </div>

                </div>

                <div className="employee-details-actions">
                    <Link
                        to="/employees"
                        className="employee-back-button"
                    >
                        Back to Employees
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default EmployeeDetails;

