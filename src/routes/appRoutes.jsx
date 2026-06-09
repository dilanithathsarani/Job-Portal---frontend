import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Home from "../pages/home.jsx";
import Jobs from "../pages/jobs/jobs.jsx";
import Profile from "../pages/profile/profile.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";
import AppliedJobs from "../pages/jobs/appliedJobs.jsx";
import JobDetails from "../pages/jobs/jobDetails.jsx";

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

                <Route
                    path="/applied-jobs"
                    element={
                        <ProtectedRoute>
                            <AppliedJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;