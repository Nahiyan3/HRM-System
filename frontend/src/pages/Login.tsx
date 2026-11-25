
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginInput } from "../types/auth";
import "../pages/Login.css";

const Login = () => {
    const [formData, setFormData] = useState<LoginInput>({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(formData);

            const storedUser = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            if (storedUser.role === "ADMIN") {
                navigate("/dashboard");
            } else {
                navigate("/employee-dashboard");
            }
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
                    <h2>Welcome Back</h2>
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
                            required
                        />
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="login-footer">
                    HRM System &copy; 2026
                </div>

            </div>
        </div>
    );

};

export default Login;
