import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Section, UpdateSectionInput } from "../types/section";
import {
    getSectionById,
    updateSection
} from "../services/sectionService";

import "./EditSection.css"

function EditSection() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [section, setSection] = useState<Section | null>(null);
    const [formData, setFormData] = useState<UpdateSectionInput>({
        name: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const data = await getSectionById(Number(id));
                setSection(data);
                setFormData({ name: data.name });
            } catch (error) {
                alert("Failed to load section.");
            } finally {
                setLoading(false);
            }
        };

        fetchSection();
    }, [id]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ name: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await updateSection(Number(id), formData);
            alert("Section updated successfully!");
            navigate("/sections");
        } catch (error) {
            alert("Failed to update section.");
        }
    };

    if (loading) return <p>Loading section...</p>;
    if (!section) return <p>Section not found.</p>;

    return (
        <div className="edit-section-page">
            <div className="edit-section-header">
                <h1>Edit Section</h1>
            </div>

            <div className="edit-section-card">
                <form onSubmit={handleSubmit} className="edit-section-form">
                    <div className="edit-section-form-group">
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

                    <div className="edit-section-actions">
                        <button
                            type="submit"
                            className="edit-section-submit"
                        >
                            Update Section
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSection;