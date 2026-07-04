import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import authImage from "../../assets/register.png";

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
        <main className="relative isolate flex h-dvh items-start justify-center overflow-hidden bg-slate-950 px-4 py-4 text-slate-950 sm:px-6 sm:py-6 lg:items-center lg:px-8 lg:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#111827_48%,_#1e3a8a_100%)]" />

            <div className="relative mx-auto grid h-full w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-blue-950/30 lg:grid-cols-[1.02fr_0.98fr]">
                <section className="flex items-start justify-center px-5 py-5 sm:px-8 sm:py-7 lg:items-center lg:px-10 lg:py-6">
                    <div className="w-full max-w-sm animate-auth-rise xl:max-w-md">
                        <Link to="/" className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                            Job Portal
                        </Link>

                        <p className="mt-4 text-[0.7rem] font-black uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                            Create account
                        </p>
                        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-4xl">
                            Start your job journey
                        </h2>
                        <p className="mt-1.5 text-sm leading-5 text-slate-600 sm:text-base sm:leading-7">
                            Build a profile for job discovery or join as a recruiter to manage hiring faster.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                            <div>
                                <label className="mb-1 block text-sm font-bold text-slate-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Amanda Silva"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-bold text-slate-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-bold text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Min 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-bold text-slate-700">
                                    Account Type
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                                >
                                    <option value="jobseeker">Job Seeker</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-xl shadow-blue-100 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Registering..." : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-3 text-center text-sm text-slate-600">
                            Already have an account?
                            <Link to="/login" className="ml-1 font-black text-blue-700 transition hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </section>

                <section className="hidden overflow-hidden bg-slate-950 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
                    <div className="animate-auth-rise">
                        <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-200">
                            Built for momentum
                        </p>
                        <h1 className="mt-10 text-4xl font-black leading-tight xl:text-5xl">
                            One account for applications, hiring, and growth.
                        </h1>
                        <p className="mt-4 max-w-md text-base leading-7 text-slate-300 xl:text-m xl:leading-8">
                            Choose your role and step into a clearer way to manage opportunities.
                        </p>
                    </div>

                    <div className="relative animate-auth-float">
                        <div className="absolute inset-5 rounded-full bg-emerald-400/20  blur-3xl" />
                        <img
                            src={authImage}
                            alt="Job portal brand graphic"
                            className="relative mx-auto w-90 object-contain drop-shadow-2xl xl:w-100"
                        />
                    </div>

                    
                </section>
            </div>
        </main>
    );
}

export default Register;
