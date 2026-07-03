import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Navbar() {

    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    let role = null;
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        role = user?.role;
    } catch (e) {
        console.error("Error parsing user from localStorage:", e);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link
                    to="/"
                    className="font-bold text-xl tracking-wide hover:text-gray-100 transition"
                >
                    Job Portal
                </Link>

                <div className="flex items-center space-x-5">

                    <Link
                        to="/"
                        className="hover:text-gray-200 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/jobs"
                        className="hover:text-gray-200 transition"
                    >
                        Jobs
                    </Link>

                    <Link to="/ai/interview">
    AI Interview
</Link>

                    {token ? (
                        <>
                            <NotificationBell />
                            <div
                                className="relative"
                            ref={dropdownRef}
                        >
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition cursor-pointer"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                My Account
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">

                                    {/* Job Seeker Links */}
                                    {role === "jobseeker" && (
                                        <>
                                            <div className="px-4 py-1 border-b border-gray-100">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Job Seeker
                                                </p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile
                                            </Link>

                                            <Link
                                                to="/applied-jobs"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                </svg>
                                                Applied Jobs
                                            </Link>
                                        </>
                                    )}

                                    {/* Recruiter Links */}
                                    {role === "recruiter" && (
                                        <>
                                            <div className="px-4 py-1 border-b border-gray-100">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Recruiter
                                                </p>
                                            </div>

                                            <Link
                                                to="/recruiter/dashboard"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                </svg>
                                                Dashboard
                                            </Link>

                                            <Link
                                                to="/recruiter/company"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                Company
                                            </Link>

                                            <Link
                                                to="/recruiter/create-job"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Create Job
                                            </Link>

                                            <Link
                                                to="/recruiter/manage-jobs"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Manage Jobs
                                            </Link>
                                        </>
                                    )}

                                    {/* Admin Links */}
                                    {role === "admin" && (
                                        <>
                                            <div className="px-4 py-1 border-b border-gray-100">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Admin
                                                </p>
                                            </div>

                                            <Link
                                                to="/admin/dashboard"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Admin Dashboard
                                            </Link>

                                            <Link
                                                to="/admin/users"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                Manage Users
                                            </Link>

                                            <Link
                                                to="/admin/jobs"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-sm"
                                            >
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Manage Jobs
                                            </Link>
                                        </>
                                    )}

                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 transition text-sm text-red-600 cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>

                                </div>
                            )}

                        </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/login"
                                className="hover:text-gray-200 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;