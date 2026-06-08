import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between">

                <h1 className="font-bold text-xl">
                    Job Portal
                </h1>

                <div className="space-x-4">

                    <Link to="/">Home</Link>

                    <Link to="/jobs">Jobs</Link>

                    <Link to="/login">Login</Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;