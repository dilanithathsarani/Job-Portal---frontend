import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Home from "../pages/home.jsx";
import Jobs from "../pages/jobs/jobs.jsx";
import Profile from "../pages/profile/profile.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;