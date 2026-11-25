
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getEmployeeById } from "../services/employeeService";

import type { Employee } from "../types/employee";
import "./MyProfile.css"
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
        <div className="my-profile-page">
            <div className="my-profile-header">
                <h1>My Profile</h1>
            </div>

            <div className="my-profile-card">
                <h2>Personal Information</h2>

                <div className="my-profile-grid">
                    <div className="my-profile-item">
                        <span className="my-profile-label">First Name</span>
                        <span className="my-profile-value">{employee.first_name}</span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Last Name</span>
                        <span className="my-profile-value">{employee.last_name}</span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Date of Birth</span>
                        <span className="my-profile-value">
                            {employee.date_of_birth || "Not provided"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Gender</span>
                        <span className="my-profile-value">
                            {employee.gender || "Not provided"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Phone</span>
                        <span className="my-profile-value">
                            {employee.phone || "Not provided"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Email</span>
                        <span className="my-profile-value">{employee.email}</span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Address</span>
                        <span className="my-profile-value">
                            {employee.address || "Not provided"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="my-profile-card">
                <h2>Employment Information</h2>

                <div className="my-profile-grid">
                    <div className="my-profile-item">
                        <span className="my-profile-label">Employee ID</span>
                        <span className="my-profile-value">{employee.employee_code}</span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Section</span>
                        <span className="my-profile-value">
                            {employee.section_name || "Not assigned"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Position</span>
                        <span className="my-profile-value">
                            {employee.position || "Not assigned"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Employment Type</span>
                        <span className="my-profile-value">
                            {employee.employee_type || "Not provided"}
                        </span>
                    </div>

                    <div className="my-profile-item">
                        <span className="my-profile-label">Date Joined</span>
                        <span className="my-profile-value">{employee.date_joined}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
