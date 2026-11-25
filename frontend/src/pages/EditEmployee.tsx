
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import type { Employee, UpdateEmployeeInput } from "../types/employee";
import {
    getEmployeeById,
    updateEmployee
} from "../services/employeeService";
import type { Section } from "../types/section";
import { getAllSections } from "../services/sectionService";
import "./EditEmployee.css";
function EditEmployee() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState<Section[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeeData, sectionData] = await Promise.all([
                    getEmployeeById(Number(id)),
                    getAllSections()
                ]);

                setFormData(employeeData);
                setSections(sectionData);
            } catch (error) {
                alert("Failed to load employee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setFormData((previousData) => {
            if (!previousData) return null;

            return {
                ...previousData,
                [name]: value
            };
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData || !id) return;

        const employeeData: UpdateEmployeeInput = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            date_joined: formData.date_joined.slice(0, 10),
            section_id: formData.section_id,
            position: formData.position,
            employee_type: formData.employee_type
        };

        try {
            await updateEmployee(Number(id), employeeData);

            alert("Employee updated successfully!");
            navigate(`/employees/${id}`);
        } catch (error) {
            alert("Failed to update employee.");
        }
    };

    if (loading) {
        return <p>Loading employee...</p>;
    }

    if (!formData) {
        return <p>Employee not found.</p>;
    }


    return (
        <div className="edit-employee-page">

            <div className="edit-employee-header">
                <h1>Edit Employee</h1>
            </div>

            <div className="edit-employee-card">

                <form onSubmit={handleSubmit}>

                    <div className="edit-employee-form">

                        <div className="edit-employee-form-group">
                            <label>Employee Code</label>
                            <input
                                type="text"
                                name="employee_code"
                                value={formData.employee_code}
                                readOnly
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Section</label>
                            <select
                                name="section_id"
                                value={formData.section_id ?? ""}
                                onChange={(event) =>
                                    setFormData((previousData) => {
                                        if (!previousData) return null;

                                        return {
                                            ...previousData,
                                            section_id: event.target.value
                                                ? Number(event.target.value)
                                                : null
                                        };
                                    })
                                }
                            >
                                <option value="">Select a Section</option>

                                {sections.map((section) => (
                                    <option
                                        key={section.id}
                                        value={section.id}
                                    >
                                        {section.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Position</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position ?? ""}
                                onChange={handleChange}
                                placeholder="Enter employee position"
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Employee Type</label>
                            <input
                                type="text"
                                name="employee_type"
                                value={formData.employee_type ?? ""}
                                onChange={handleChange}
                                placeholder="e.g. Full-time, Part-time"
                            />
                        </div>

                        <div className="edit-employee-form-group">
                            <label>Date Joined</label>
                            <input
                                type="date"
                                name="date_joined"
                                value={formData.date_joined.slice(0, 10)}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="edit-employee-actions">
                        <button
                            type="submit"
                            className="edit-employee-submit"
                        >
                            Update Employee
                        </button>

                        <a
                            href={`/employees/${id}`}
                            className="edit-employee-cancel"
                        >
                            Cancel
                        </a>
                    </div>

                </form>

            </div>
        </div>
    );

}

export default EditEmployee;
