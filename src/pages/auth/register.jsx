import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "jobseeker"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all required fields");
            return;
        }

        try {

            setLoading(true);

            await api.post(
                "/auth/register",
                formData
            );

            toast.success("Registration Successful");
            navigate("/login");

        } catch (error) {

            console.error("Registration error:", error);
            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md border border-gray-100"
            >

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                <div className="space-y-4 mb-6">

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Amanda"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-250 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="e.g. amanda@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-250 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Min 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-250 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">
                            I want to register as a
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-250 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        >
                            <option value="jobseeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-98 transition disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline ml-1 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;
