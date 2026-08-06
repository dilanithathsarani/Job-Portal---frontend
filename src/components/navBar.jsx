import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  ChevronDown,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import NotificationBell from "./NotificationBell";
import { normalizeRole } from "../utils/roles";

const aiLinks = [
  { label: "AI Interview", to: "/ai/interview" },
  { label: "Resume Analyzer", to: "/ai/resume-analyzer" },
  { label: "Cover Letter", to: "/ai/cover-letter" },
  { label: "Career Advisor", to: "/ai/career-advisor" },
  { label: "AI Job Matches", to: "/ai/recommendations" },
];

const accountLinks = {
  jobseeker: [
    { label: "Profile", to: "/profile" },
    { label: "Applied Jobs", to: "/applied-jobs" },
  ],
  recruiter: [
    { label: "Dashboard", to: "/recruiter/dashboard" },
    { label: "Company", to: "/recruiter/company" },
    { label: "Create Job", to: "/recruiter/create-job" },
    { label: "Manage Jobs", to: "/recruiter/manage-jobs" },
  ],
  admin: [
    { label: "Admin Dashboard", to: "/admin/dashboard" },
    { label: "Manage Users", to: "/admin/users" },
    { label: "Manage Jobs", to: "/admin/jobs" },
  ],
};

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
  }`;

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [accountOpen, setAccountOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const accountRef = useRef(null);
  const aiRef = useRef(null);

  let role = null;
  try {
    role = normalizeRole(JSON.parse(localStorage.getItem("user"))?.role);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  const roleLinks = accountLinks[role] || [];
  const aiActive = location.pathname.startsWith("/ai/");
  const accountActive = roleLinks.some(({ to }) => location.pathname.startsWith(to));

  useEffect(() => {
    setMobileOpen(false);
    setAiOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeMenus = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountOpen(false);
      if (aiRef.current && !aiRef.current.contains(event.target)) setAiOpen(false);
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5 text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BriefcaseBusiness size={19} />
          </span>
          <span className="text-lg font-bold tracking-tight">Job Portal</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/jobs" className={navClass}>Jobs</NavLink>

          <div className="relative" ref={aiRef}>
            <button
              type="button"
              onClick={() => setAiOpen((current) => !current)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${aiActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
              aria-expanded={aiOpen}
            >
              AI Tools <ChevronDown size={15} className={`transition ${aiOpen ? "rotate-180" : ""}`} />
            </button>
            {aiOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Career tools</p>
                {aiLinks.map((item) => <DropdownLink key={item.to} {...item} pathname={location.pathname} />)}
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {token ? (
            <>
              <NotificationBell />
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((current) => !current)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${accountActive ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                  aria-expanded={accountOpen}
                >
                  <UserRound size={17} /> Account
                  <ChevronDown size={15} className={`transition ${accountOpen ? "rotate-180" : ""}`} />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{role || "Account"}</p>
                    {roleLinks.map((item) => <DropdownLink key={item.to} {...item} pathname={location.pathname} />)}
                    <div className="mt-2 border-t border-slate-100 pt-2">
                      <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Create account</Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setMobileOpen((current) => !current)} className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden" aria-label="Toggle navigation">
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            <MobileLink to="/" label="Home" pathname={location.pathname} exact />
            <MobileLink to="/jobs" label="Jobs" pathname={location.pathname} />

            <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">AI Tools</p>
            {aiLinks.map((item) => <MobileLink key={item.to} {...item} pathname={location.pathname} />)}

            {token ? (
              <>
                <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Account</p>
                {roleLinks.map((item) => <MobileLink key={item.to} {...item} pathname={location.pathname} />)}
                <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"><LogOut size={16} /> Logout</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Link to="/login" className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700">Login</Link>
                <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white">Create account</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownLink({ label, to, pathname }) {
  const active = pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link to={to} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>
      <span className="flex items-center gap-2"><Sparkles size={15} className={active ? "text-blue-600" : "text-slate-400"} />{label}</span>
      {active && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
    </Link>
  );
}

function MobileLink({ label, to, pathname, exact = false }) {
  const active = exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  return <Link to={to} className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>{label}</Link>;
}

export default Navbar;
