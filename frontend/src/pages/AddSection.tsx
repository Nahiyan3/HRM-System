import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateSectionInput } from "../types/section";
import { createSection } from "../services/sectionService";

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
        <div>
            <h1>Add New Section</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Section Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Create Section</button>
            </form>
        </div>
    );
}

export default AddSection;