import {
    FaHome,
    FaBuilding,
    FaBriefcase,
    FaUsers,
    FaChartBar,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";

function RecruiterSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: "/recruiter/dashboard", icon: FaHome, label: "Dashboard" },
        { path: "/recruiter/company", icon: FaBuilding, label: "Company" },
        { path: "/recruiter/create-job", icon: FaBriefcase, label: "Create Job" },
        { path: "/recruiter/jobs", icon: FaBriefcase, label: "My Jobs" },
        { path: "/recruiter/manage-jobs", icon: FaBriefcase, label: "Manage Jobs" },
        { path: "/recruiter/applicants", icon: FaUsers, label: "Applicants" },
        { path: "/recruiter/analytics", icon: FaChartBar, label: "Analytics" },
        { path: "/recruiter/profile", icon: FaUser, label: "Profile" },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white h-screen sticky top-0 flex flex-col shadow-2xl z-10">
            <div className="text-center py-8 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Recruiter Panel
                </h2>
            </div>

            <nav className="flex flex-col flex-1 py-6 px-3 gap-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-3 rounded-xl flex items-center gap-4 transition-all duration-300 font-medium ${
                                isActive(link.path)
                                    ? "bg-indigo-600/10 text-indigo-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                            }`}
                        >
                            <Icon className={`text-xl ${isActive(link.path) ? "text-indigo-400" : ""}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-700/50">
                <button
                    onClick={logout}
                    className="w-full px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center gap-4 transition-all duration-300 font-medium text-left"
                >
                    <FaSignOutAlt className="text-xl" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default RecruiterSidebar;