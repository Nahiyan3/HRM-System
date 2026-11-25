
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import EditEmployee from "./pages/EditEmployee";

import SectionList from "./pages/SectionList";
import AddSection from "./pages/AddSection";
import EditSection from "./pages/EditSection";

import UserManagement from "./pages/UserManagement";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyProfile from "./pages/MyProfile";
import EditMyProfile from "./pages/EditMyProfile";
import ChangePassword from "./pages/ChangePassword";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import EmployeeLayout from "./components/layouts/EmployeeLayout";
import RegisterAdmin from "./pages/RegisterAdmin";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register-admin" element={<RegisterAdmin />} />

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<AdminDashboard />} />

                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employees/new" element={<AddEmployee />} />
                        <Route path="/employees/:id/edit" element={<EditEmployee />} />
                        <Route path="/employees/:id" element={<EmployeeDetails />} />

                        <Route path="/sections" element={<SectionList />} />
                        <Route path="/sections/new" element={<AddSection />} />
                        <Route path="/sections/:id/edit" element={<EditSection />} />

                        <Route path="/users" element={<UserManagement />} />
                    </Route>
                </Route>

                {/* Employee Routes */}
                <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
                    <Route element={<EmployeeLayout />}>
                        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/edit-my-profile" element={<EditMyProfile />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                    </Route>
                </Route>

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
