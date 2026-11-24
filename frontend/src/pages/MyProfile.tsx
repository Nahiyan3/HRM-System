
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getEmployeeById } from "../services/employeeService";

import type { Employee } from "../types/employee";

const MyProfile = () => {
    const { user } = useAuth();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.employee_id) {
                setError("Employee information not found.");
                setLoading(false);
                return;
            }

            try {
                const result = await getEmployeeById(user.employee_id);
                setEmployee(result);
            } catch {
                setError("Failed to load your profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!employee) {
        return <p>Employee information not found.</p>;
    }

    return (
        <div>
            <h1>My Profile</h1>

            <h2>Personal Information</h2>
            <p><strong>First Name:</strong> {employee.first_name}</p>
            <p><strong>Last Name:</strong> {employee.last_name}</p>
            <p><strong>Date of Birth:</strong> {employee.date_of_birth || "Not provided"}</p>
            <p><strong>Gender:</strong> {employee.gender || "Not provided"}</p>
            <p><strong>Phone:</strong> {employee.phone || "Not provided"}</p>
            <p><strong>Address:</strong> {employee.address || "Not provided"}</p>
            <p><strong>Email:</strong> {employee.email}</p>

            <h2>Employment Information</h2>
            <p><strong>Employee ID:</strong> {employee.employee_code}</p>
            <p><strong>Section:</strong> {employee.section_name || "Not assigned"}</p>
            <p><strong>Position:</strong> {employee.position || "Not assigned"}</p>
            <p><strong>Employment Type:</strong> {employee.employee_type || "Not provided"}</p>
            <p><strong>Date Joined:</strong> {employee.date_joined}</p>
        </div>
    );
};

export default MyProfile;
