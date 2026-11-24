
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton";

const AdminLayout = () => {
    const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
        display: "block",
        padding: "12px 15px",
        marginBottom: "8px",
        borderRadius: "6px",
        textDecoration: "none",
        color: isActive ? "#ffffff" : "#d1d5db",
        backgroundColor: isActive ? "#2563eb" : "transparent"
    });

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            {/* Sidebar */}
            <aside style={{
                width: "240px",
                backgroundColor: "#1f2937",
                padding: "25px 15px",
                color: "white",
                flexShrink: 0
            }}>
                <h2 style={{ marginBottom: "30px" }}>
                    HRM System
                </h2>

                <p style={{ color: "#9ca3af", marginBottom: "15px" }}>
                    ADMIN MENU
                </p>

                <nav>
                    <NavLink to="/dashboard" style={navLinkStyle}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/employees" style={navLinkStyle}>
                        Employee Management
                    </NavLink>

                    <NavLink to="/sections" style={navLinkStyle}>
                        Section Management
                    </NavLink>

                    <NavLink to="/users" style={navLinkStyle}>
                        User Management
                    </NavLink>
                </nav>

                <div style={{ marginTop: "40px" }}>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: "30px",
                backgroundColor: "#f3f4f6",
                minWidth: 0
            }}>
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;
