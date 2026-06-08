import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Home from "../pages/home.jsx";
import Jobs from "../pages/jobs/jobs.jsx";

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

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;