
import { useEffect, useState } from "react";
import type { Section } from "../types/section";
import {
    getAllSections,
    deleteSection
} from "../services/sectionService";
import { Link } from "react-router-dom";

function SectionList() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const data = await getAllSections();
                setSections(data);
            } catch (error) {
                setError("Failed to load sections.");
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this section?"
        );

        if (!confirmed) return;

        try {
            await deleteSection(id);

            setSections((previousSections) =>
                previousSections.filter(
                    (section) => section.id !== id
                )
            );

            alert("Section deleted successfully!");
        } catch (error) {
            alert("Failed to delete section.");
        }
    };

    if (loading) {
        return <p>Loading sections...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const filteredSections = sections
        .filter((section) =>
            section.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);

            return sortOrder === "asc"
                ? comparison
                : -comparison;
        });

    return (
        <div className="section-page">
            <h1>Section Management</h1>

            <Link to="/sections/new">
                Add Section
            </Link>

            <h3>Total Sections: {sections.length}</h3>

            <div className="section-filters">
                <input
                    type="text"
                    placeholder="Search sections by name"
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <select
                    value={sortOrder}
                    onChange={(event) =>
                        setSortOrder(event.target.value)
                    }
                >
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
            </div>

            <p>
                Showing {filteredSections.length} of {sections.length} sections
            </p>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Section Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section) => (
                            <tr key={section.id}>
                                <td>{section.id}</td>
                                <td>{section.name}</td>
                                <td>
                                    <Link
                                        to={`/sections/${section.id}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(section.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                No sections found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SectionList;
