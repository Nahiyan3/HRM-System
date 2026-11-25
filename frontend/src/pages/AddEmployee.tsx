
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { CreateEmployeeInput } from "../types/employee";
import { createEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Section } from "../types/section";
import { getAllSections } from "../services/sectionService";
import "./AddEmployee.css"


function AddEmployee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateEmployeeInput>({
        employee_code: "",
        first_name: "",
        last_name: "",
        email: "",
        date_joined: ""
    });
    const [sections, setSections] = useState<Section[]>([]);
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const data = await getAllSections();
                setSections(data);
            } catch (error) {
                alert("Failed to load sections.");
            }
        };

        fetchSections();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createEmployee(formData);

            alert("Employee created successfully!");
            navigate("/employees");
        } catch (error) {
            alert("Failed to create employee.");
        }
    };


    return (
        <div className="add-employee-page">
            <div className="add-employee-header">
                <h1>Add New Employee</h1>
            </div>

            <div className="add-employee-card">
                <form onSubmit={handleSubmit} className="add-employee-form">
                    <div className="add-employee-form-group">
                        <label>Employee Code</label>
                        <input
                            type="text"
                            name="employee_code"
                            value={formData.employee_code}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>Section</label>
                        <select
                            name="section_id"
                            value={formData.section_id ?? ""}
                            onChange={(event) =>
                                setFormData((previousData) => ({
                                    ...previousData,
                                    section_id: event.target.value
                                        ? Number(event.target.value)
                                        : null
                                }))
                            }
                        >
                            <option value="">Select a Section</option>

                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="add-employee-form-group">
                        <label>Position</label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position ?? ""}
                            onChange={handleChange}
                            placeholder="Enter employee position"
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>Employee Type</label>
                        <input
                            type="text"
                            name="employee_type"
                            value={formData.employee_type ?? ""}
                            onChange={handleChange}
                            placeholder="e.g. Full-time, Part-time, Contract"
                        />
                    </div>

                    <div className="add-employee-form-group">
                        <label>Date Joined</label>
                        <input
                            type="date"
                            name="date_joined"
                            value={formData.date_joined}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-employee-actions">
                        <button
                            type="submit"
                            className="add-employee-submit"
                        >
                            Create Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
