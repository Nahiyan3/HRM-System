
import { useEffect, useState } from "react";

import {
    createUser,
    getAllEmployeeUsers,
    resetUserPassword
} from "../services/userService";

import type {
    CreateUserInput,
    EmployeeUser
} from "../types/auth";

import {
    getEmployeesWithoutAccounts
} from "../services/employeeService";

import type {
    EmployeeWithoutAccount
} from "../types/employee";

import "./UserManagement.css";

const UserManagement = () => {
    const [formData, setFormData] = useState<CreateUserInput>({
        email: "",
        password: "",
        employee_id: 0
    });

    const [users, setUsers] = useState<EmployeeUser[]>([]);
    const [availableEmployees, setAvailableEmployees] = useState<EmployeeWithoutAccount[]>([]);
    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newPassword, setNewPassword] = useState("");

    const fetchUsers = async () => {
        try {
            const data = await getAllEmployeeUsers();
            setUsers(data);

            const employees = await getEmployeesWithoutAccounts();
            setAvailableEmployees(employees);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load employee accounts."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEmployeeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const employeeId = Number(e.target.value);

        setFormData({
            ...formData,
            employee_id: employeeId
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (formData.employee_id === 0) {
            setError("Please select an employee.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            await createUser({
                ...formData,
                employee_id: Number(formData.employee_id)
            });

            setMessage("Employee account created successfully!");

            setFormData({
                email: "",
                password: "",
                employee_id: 0
            });

            await fetchUsers();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        }
    };

    const handleResetPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (selectedUserId === null) return;

        setMessage("");
        setError("");

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            await resetUserPassword(selectedUserId, newPassword);

            setMessage("Employee password reset successfully!");
            setSelectedUserId(null);
            setNewPassword("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        }
    };

    const filteredUsers = users
        .filter((user) => {
            const search = searchTerm.toLowerCase();

            const fullName =
                `${user.first_name} ${user.last_name}`.toLowerCase();

            return (
                fullName.includes(search) ||
                user.email.toLowerCase().includes(search) ||
                user.employee_code.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "employee_code":
                    return a.employee_code.localeCompare(b.employee_code);

                case "section":
                    return (a.section_name || "").localeCompare(
                        b.section_name || ""
                    );

                default:
                    return `${a.first_name} ${a.last_name}`.localeCompare(
                        `${b.first_name} ${b.last_name}`
                    );
            }
        });

    return (
        <div className="user-management-page">
            <h1>Employee Account Management</h1>

            {/* Create Employee Account */}
            <div className="user-management-card">
                <h2>Create Employee Account</h2>

                <form onSubmit={handleSubmit} className="user-form">

                    <div className="user-form-group">
                        <label htmlFor="employee_id">
                            Select Employee
                        </label>

                        <select
                            id="employee_id"
                            value={formData.employee_id || ""}
                            onChange={handleEmployeeChange}
                            required
                        >
                            <option value="">
                                Select an employee
                            </option>

                            {availableEmployees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.first_name} {employee.last_name}
                                    {" - "}
                                    {employee.employee_code}
                                </option>
                            ))}
                        </select>

                        {availableEmployees.length === 0 && !loading && (
                            <small>
                                All employees already have accounts.
                            </small>
                        )}
                    </div>

                    <div className="user-form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>

                    <button
                        type="submit"
                        className="user-primary-button"
                        disabled={availableEmployees.length === 0}
                    >
                        Create Account
                    </button>
                </form>
            </div>

            {message && (
                <p className="user-message-success">{message}</p>
            )}

            {error && (
                <p className="user-message-error">{error}</p>
            )}

            <h2>Employee Accounts</h2>

            <div className="user-summary">
                <h3>Total Accounts</h3>
                <p>{users.length}</p>
            </div>

            <div className="user-filters">
                <input
                    type="text"
                    placeholder="Search by name, email or employee code"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="employee_code">
                        Sort by Employee Code
                    </option>
                    <option value="section">
                        Sort by Section
                    </option>
                </select>
            </div>

            {loading ? (
                <p>Loading employee accounts...</p>
            ) : filteredUsers.length === 0 ? (
                <p>No employee accounts found.</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Section</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.employee_code}</td>

                                <td>
                                    {user.first_name} {user.last_name}
                                </td>

                                <td>{user.email}</td>
                                <td>{user.position || "-"}</td>
                                <td>{user.section_name || "-"}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="reset-password-button"
                                        onClick={() => {
                                            setSelectedUserId(user.id);
                                            setNewPassword("");
                                            setMessage("");
                                            setError("");
                                        }}
                                    >
                                        Reset Password
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedUserId !== null && (
                <div className="reset-password-section">
                    <h2>Reset Employee Password</h2>

                    <form
                        onSubmit={handleResetPassword}
                        className="user-form"
                    >
                        <div className="user-form-group">
                            <label htmlFor="newPassword">
                                New Password
                            </label>

                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                                minLength={8}
                            />
                        </div>

                        <button
                            type="submit"
                            className="user-primary-button"
                        >
                            Update Password
                        </button>

                        <button
                            type="button"
                            className="user-secondary-button"
                            onClick={() => {
                                setSelectedUserId(null);
                                setNewPassword("");
                                setError("");
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
