
import { useState } from "react";

import { changeOwnPassword } from "../services/userService";
import "./ChangePassword.css"

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await changeOwnPassword(
                formData.currentPassword,
                formData.newPassword
            );

            setMessage("Password changed successfully!");

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to change password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-password-page">
            <div className="change-password-header">
                <h1>Change Password</h1>
            </div>

            <div className="change-password-card">
                {message && (
                    <p className="change-password-message change-password-success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="change-password-message change-password-error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="change-password-form">
                    <div className="change-password-form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            required
                        />
                    </div>

                    <div className="change-password-form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="change-password-form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="change-password-submit"
                        disabled={loading}
                    >
                        {loading ? "Changing Password..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
