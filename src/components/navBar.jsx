import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <h1 className="font-bold text-xl">
                    Job Portal
                </h1>

                <div className="space-x-4 flex items-center">

                    <Link to="/">Home</Link>

                    <Link to="/jobs">Jobs</Link>

                    {token ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-gray-200"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/applied-jobs"
                                className="hover:text-gray-200"
                            >
                                Applied Jobs
                            </Link>

                            <Link
                                to="/recruiter/dashboard"
                                className="hover:text-gray-200"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/recruiter/create-job"
                                className="hover:text-gray-200"
                            >
                                Create Job
                            </Link>

                            <Link
                                to="/recruiter/manage-jobs"
                                className="hover:text-gray-200"
                            >
                                Manage Jobs
                            </Link>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;