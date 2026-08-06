import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import api from "../../services/api";
import authImage from "../../assets/login-professional.jpg";
import { normalizeRole } from "../../utils/roles";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      const user = { ...response.data.user, role: normalizeRole(response.data.user.role) };

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      toast.success("Login successful");

      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto grid h-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:block">
          <img src={authImage} alt="Professional exploring job opportunities on a laptop" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Welcome back</p>
            <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">Your next opportunity is waiting.</h1>
            <p className="mt-4 max-w-md leading-7 text-slate-200">Sign in to continue your search, manage applications, and stay connected to the right roles.</p>
          </div>
        </section>

        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5 text-slate-950">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><BriefcaseBusiness size={20} /></span>
              <span className="text-xl font-bold tracking-tight">Job Portal</span>
            </Link>

            <div className="mt-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sign in to your account</h2>
              <p className="mt-2 text-slate-500">Enter your details to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="login-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="login-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required autoComplete="current-password" className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Signing in..." : "Sign in"} {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <CheckCircle2 size={17} className="shrink-0 text-emerald-600" /> Your account details are securely protected.
            </div>

            <p className="mt-7 text-center text-sm text-slate-600">New to Job Portal? <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
