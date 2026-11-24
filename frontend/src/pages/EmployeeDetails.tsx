
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeeService";

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
        return <p>Loading employee details...</p>;
    }

    if (error || !employee) {
        return <p>{error || "Employee not found."}</p>;
    }

    return (
        <div>
            <h1>Employee Details</h1>

            <p><strong>Employee Code:</strong> {employee.employee_code}</p>
            <p><strong>First Name:</strong> {employee.first_name}</p>
            <p><strong>Last Name:</strong> {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Date of Birth:</strong> {employee.date_of_birth || "N/A"}</p>
            <p><strong>Gender:</strong> {employee.gender || "N/A"}</p>
            <p><strong>Phone:</strong> {employee.phone || "N/A"}</p>
            <p><strong>Address:</strong> {employee.address || "N/A"}</p>
            <p><strong>Section:</strong> {employee.section_name || "N/A"}</p>
            <p><strong>Position:</strong> {employee.position || "N/A"}</p>
            <p><strong>Employee Type:</strong> {employee.employee_type || "N/A"}</p>
            <p><strong>Date Joined:</strong> {employee.date_joined}</p>

            <Link to="/employees">Back to Employees</Link>
        </div>
    );
}

export default EmployeeDetails;
