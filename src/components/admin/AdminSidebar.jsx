import { LayoutDashboard, Users, Briefcase, FileText, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
    { to: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/admin/users", icon: <Users size={18} />, label: "Manage Users" },
    { to: "/admin/jobs", icon: <Briefcase size={18} />, label: "Manage Jobs" },
    { to: "/admin/applications", icon: <FileText size={18} />, label: "Applications" },
];

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-5 fixed left-0 top-0 flex flex-col shadow-xl">
            <div className="mb-8 px-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <LayoutDashboard size={16} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white leading-tight">JobPortal</h1>
                        <p className="text-sm text-slate-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                                isActive
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-slate-800 mt-4">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
