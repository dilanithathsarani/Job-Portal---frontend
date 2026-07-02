import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import authImage from "../../assets/job-hero-hq.png";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Login Successful");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-950 sm:px-8 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_34%),linear-gradient(135deg,_#020617_0%,_#0f172a_52%,_#1e3a8a_100%)]" />

            <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-blue-950/30 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="animate-auth-rise">
                        <Link to="/" className="text-sm font-black uppercase tracking-[0.24em] text-blue-200">
                            AI Job Portal
                        </Link>
                        <h1 className="mt-12 text-5xl font-black leading-tight">
                            Welcome back to your next opportunity.
                        </h1>
                        <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
                            Continue tracking saved roles, applications, and job matches from one calm workspace.
                        </p>
                    </div>

                    <div className="relative animate-auth-float">
                        <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl" />
                        <img
                            src={authImage}
                            alt="Job portal brand graphic"
                            className="relative mx-auto w-72 object-contain drop-shadow-2xl"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                        {[
                            ["8k+", "Roles"],
                            ["1.4k", "Teams"],
                            ["92%", "Match"],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <p className="text-2xl font-black">{value}</p>
                                <p className="mt-1 text-xs font-bold uppercase text-slate-300">{label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-md animate-auth-rise">
                        <div className="mb-8 lg:hidden">
                            <Link to="/" className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                                Job Portal
                            </Link>
                        </div>

                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                            Login
                        </p>
                        <h2 className="mt-3 text-4xl font-black text-slate-950">
                            Sign in to continue
                        </h2>
                        <p className="mt-3 leading-7 text-slate-600">
                            Access your job search dashboard and pick up right where you left off.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-5 py-3.5 font-black text-white shadow-xl shadow-blue-100 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Don't have an account?
                            <Link to="/register" className="ml-1 font-black text-blue-700 transition hover:text-blue-500">
                                Register
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
