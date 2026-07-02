import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import authImage from "../../assets/job-hero-hq.png";

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
        <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-950 sm:px-8 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#111827_48%,_#1e3a8a_100%)]" />

            <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-blue-950/30 lg:grid-cols-[1.08fr_0.92fr]">
                <section className="flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-md animate-auth-rise">
                        <Link to="/" className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                            Job Portal
                        </Link>

                        <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                            Create account
                        </p>
                        <h2 className="mt-3 text-4xl font-black text-slate-950">
                            Start your job journey
                        </h2>
                        <p className="mt-3 leading-7 text-slate-600">
                            Build a profile for job discovery or join as a recruiter to manage hiring faster.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Amanda Silva"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Min 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Account Type
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="jobseeker">Job Seeker</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-5 py-3.5 font-black text-white shadow-xl shadow-blue-100 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Registering..." : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Already have an account?
                            <Link to="/login" className="ml-1 font-black text-blue-700 transition hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </section>

                <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="animate-auth-rise">
                        <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-200">
                            Built for momentum
                        </p>
                        <h1 className="mt-12 text-5xl font-black leading-tight">
                            One account for applications, hiring, and growth.
                        </h1>
                        <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
                            Choose your role and step into a clearer way to manage opportunities.
                        </p>
                    </div>

                    <div className="relative animate-auth-float">
                        <div className="absolute inset-10 rounded-full bg-emerald-400/20 blur-3xl" />
                        <img
                            src={authImage}
                            alt="Job portal brand graphic"
                            className="relative mx-auto w-72 object-contain drop-shadow-2xl"
                        />
                    </div>

                    <div className="grid gap-3">
                        {[
                            "Personalized job discovery",
                            "Saved roles and simple applications",
                            "Recruiter tools for fast hiring",
                        ].map((item) => (
                            <div key={item} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 backdrop-blur">
                                {item}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Register;
