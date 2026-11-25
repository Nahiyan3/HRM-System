import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateSectionInput } from "../types/section";
import { createSection } from "../services/sectionService";
import "./AddSection.css"

function AddSection() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateSectionInput>({
        name: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createSection(formData);

            alert("Section created successfully!");
            navigate("/sections");
        } catch (error) {
            alert("Failed to create section.");
        }
    };

    return (
        <div className="add-section-page">
            <div className="add-section-header">
                <h1>Add New Section</h1>
            </div>

            <div className="add-section-card">
                <form onSubmit={handleSubmit} className="add-section-form">
                    <div className="add-section-form-group">
                        <label>Section Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter section name"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-section-submit"
                    >
                        Create Section
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddSection;