import {
    FaHome,
    FaBuilding,
    FaBriefcase,
    FaUsers,
    FaChartBar,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function RecruiterSidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (

        <div className="w-64 bg-slate-900 text-white min-h-screen">

            <div className="text-center py-6">

                <h2 className="text-2xl font-bold">

                    Recruiter

                </h2>

            </div>

            <nav className="flex flex-col">

                <Link
                    to="/recruiter/dashboard"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    to="/recruiter/company"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaBuilding />
                    Company
                </Link>

                <Link
                    to="/recruiter/create-job"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaBriefcase />
                    Create Job
                </Link>

                <Link
                    to="/recruiter/jobs"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaBriefcase />
                    My Jobs
                </Link>

                <Link
                    to="/recruiter/applicants"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaUsers />
                    Applicants
                </Link>

                <Link
                    to="/recruiter/analytics"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaChartBar />
                    Analytics
                </Link>

                <Link
                    to="/recruiter/profile"
                    className="px-6 py-4 hover:bg-slate-700 flex items-center gap-3"
                >
                    <FaUser />
                    Profile
                </Link>

                <button
                    onClick={logout}
                    className="w-full px-6 py-4 hover:bg-red-600 flex items-center gap-3 text-left"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </nav>

        </div>

    );

}

export default RecruiterSidebar;