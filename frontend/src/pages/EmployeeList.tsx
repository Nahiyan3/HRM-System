import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";
import {
    getAllEmployees,
    deleteEmployee
} from "../services/employeeService";
import { Link } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [sectionFilter, setSectionFilter] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [currentPage, setCurrentPage] = useState(1);

    const employeesPerPage = 5;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployees();
                setEmployees(data);
            } catch (error) {
                setError("Failed to load employees");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;

        try {
            await deleteEmployee(id);

            setEmployees((previousEmployees) =>
                previousEmployees.filter(
                    (employee) => employee.id !== id
                )
            );
            setCurrentPage(1);

            alert("Employee deleted successfully!");
        } catch (error) {
            alert("Failed to delete employee.");
        }
    };

    const sections = Array.from(
        new Set(
            employees
                .map((employee) => employee.section_name)
                .filter((section): section is string => section !== null)
        )
    ).sort();

    const filteredEmployees = employees.filter((employee) => {
        const search = searchTerm.toLowerCase();

        const fullName =
            `${employee.first_name} ${employee.last_name}`.toLowerCase();

        const employeeCode =
            employee.employee_code.toLowerCase();

        const matchesSearch =
            fullName.includes(search) ||
            employeeCode.includes(search);

        const matchesSection =
            sectionFilter === "" ||
            employee.section_name === sectionFilter;

        return matchesSearch && matchesSection;
    });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        switch (sortBy) {
            case "employee_code":
                return a.employee_code.localeCompare(b.employee_code);

            case "name":
                return `${a.first_name} ${a.last_name}`.localeCompare(
                    `${b.first_name} ${b.last_name}`
                );

            case "position":
                return (a.position || "").localeCompare(
                    b.position || ""
                );

            case "section":
                return (a.section_name || "").localeCompare(
                    b.section_name || ""
                );

            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(
        sortedEmployees.length / employeesPerPage
    );

    const startIndex =
        (currentPage - 1) * employeesPerPage;

    const paginatedEmployees = sortedEmployees.slice(
        startIndex,
        startIndex + employeesPerPage
    );

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSectionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSectionFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSortBy(event.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <p>Loading employees...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="employee-page">
            <h1>Employee Management</h1>

            <Link
                to="/employees/new"
                className="add-employee-btn"
            >
                Add Employee
            </Link>

            <div className="employee-filters">

                <input
                    type="text"
                    placeholder="Search by name or employee code"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <select
                    value={sectionFilter}
                    onChange={handleSectionChange}
                >
                    <option value="">All Sections</option>

                    {sections.map((section) => (
                        <option key={section} value={section}>
                            {section}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="name">Sort by Name</option>
                    <option value="employee_code">
                        Sort by Employee Code
                    </option>
                    <option value="position">
                        Sort by Position
                    </option>
                    <option value="section">
                        Sort by Section
                    </option>
                </select>

            </div>

            <p>
                Showing {paginatedEmployees.length} of{" "}
                {sortedEmployees.length} employees
            </p>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Employee Code</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Section</th>
                        <th>Employee Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedEmployees.length > 0 ? (
                        paginatedEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    {employee.employee_code}
                                </td>

                                <td>
                                    {employee.first_name}{" "}
                                    {employee.last_name}
                                </td>

                                <td>{employee.email}</td>

                                <td>
                                    {employee.position || "N/A"}
                                </td>

                                <td>
                                    {employee.section_name || "N/A"}
                                </td>

                                <td>
                                    {employee.employee_type || "N/A"}
                                </td>

                                <td>
                                    <Link
                                        to={`/employees/${employee.id}`}
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/employees/${employee.id}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((page) => page - 1)
                        }
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((page) => page + 1)
                        }
                    >
                        Next
                    </button>

                </div>
            )}
        </div>
    );
}

export default EmployeeList;