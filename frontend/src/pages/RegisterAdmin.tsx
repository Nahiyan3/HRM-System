import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterAdminInput } from "../types/auth";
import { registerAdmin } from "../services/authService";
import "../pages/Login.css";

const RegisterAdmin = () => {
    const [formData, setFormData] = useState<RegisterAdminInput>({
        email: "",
        password: "",
        registrationKey: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await registerAdmin(formData);

            setSuccess(result.message);

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>HRM System</h1>
                    <h2>Admin Registration</h2>
                    <p>Create your administrator account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="registrationKey">
                            Registration Key
                        </label>
                        <input
                            id="registrationKey"
                            name="registrationKey"
                            type="password"
                            placeholder="Enter registration key"
                            value={formData.registrationKey}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    {success && (
                        <p className="login-success">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <div className="login-register-link">
                    Already have an account?{" "}
                    <Link to="/">Login here</Link>
                </div>

                <div className="login-footer">
                    HRM System &copy; 2026
                </div>

            </div>
        </div>
    );
};

export default RegisterAdmin;