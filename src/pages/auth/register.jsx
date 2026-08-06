import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, BriefcaseBusiness, LockKeyhole, Mail, UserRound, UsersRound } from "lucide-react";
import api from "../../services/api";
import authImage from "../../assets/register-interview.jpg";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", formData);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto grid h-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-4 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5 text-slate-950">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><BriefcaseBusiness size={20} /></span>
              <span className="text-xl font-bold tracking-tight">Job Portal</span>
            </Link>

            <div className="mt-5">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">Create your account</h1>
              <p className="mt-2 text-slate-500">Join as a job seeker or recruiter.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <Field icon={UserRound} id="register-name" label="Full name">
                <input id="register-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required autoComplete="name" className="auth-input" />
              </Field>

              <Field icon={Mail} id="register-email" label="Email address">
                <input id="register-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" className="auth-input" />
              </Field>

              <Field icon={LockKeyhole} id="register-password" label="Password">
                <input id="register-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" minLength={6} required autoComplete="new-password" className="auth-input" />
              </Field>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <RoleButton active={formData.role === "jobseeker"} onClick={() => setFormData((current) => ({ ...current, role: "jobseeker" }))} icon={UserRound} label="Find a job" />
                  <RoleButton active={formData.role === "recruiter"} onClick={() => setFormData((current) => ({ ...current, role: "recruiter" }))} icon={UsersRound} label="Hire talent" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Creating account..." : "Create account"} {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Sign in</Link></p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden lg:block">
          <img src={authImage} alt="Recruiter speaking with a job candidate" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Build your future</p>
            <h2 className="mt-3 max-w-md text-4xl font-bold leading-tight">Better connections start here.</h2>
            <p className="mt-4 max-w-md leading-7 text-slate-200">Find the right opportunity or connect with the people who will move your organization forward.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ children, icon: Icon, id, label }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        {children}
      </div>
    </div>
  );
}

function RoleButton({ active, onClick, icon: Icon, label }) {
  return (
    <button type="button" onClick={onClick} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition ${active ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}>
      <Icon size={17} /> {label}
    </button>
  );
}

export default Register;
