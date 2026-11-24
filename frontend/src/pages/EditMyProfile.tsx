
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
    getEmployeeById,
    updateOwnProfile
} from "../services/employeeService";

const EditMyProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        profile_picture: ""
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.employee_id) {
                setError("Employee information not found.");
                setLoading(false);
                return;
            }

            try {
                const employee = await getEmployeeById(user.employee_id);

                setFormData({
                    phone: employee.phone || "",
                    address: employee.address || "",
                    profile_picture: employee.profile_picture || ""
                });
            } catch {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            await updateOwnProfile({
                phone: formData.phone || null,
                address: formData.address || null,
                profile_picture: formData.profile_picture || null
            });

            setMessage("Profile updated successfully!");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile."
            );
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error && !user?.employee_id) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Edit My Profile</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Profile Picture URL</label>
                    <input
                        type="text"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save Changes</button>

                <button
                    type="button"
                    onClick={() => navigate("/my-profile")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditMyProfile;
