import { Link } from "react-router-dom";

const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "Browse Jobs", to: "/jobs" },
    { label: "Applied Jobs", to: "/applied-jobs" },
    { label: "Profile", to: "/profile" },
];

const aiLinks = [
    { label: "AI Interview", to: "/ai/interview" },
    { label: "Resume Analyzer", to: "/ai/resume-analyzer" },
    { label: "Cover Letter", to: "/ai/cover-letter" },
    { label: "Career Advisor", to: "/ai/career-advisor" },
    { label: "AI Job Matches", to: "/ai/recommendations" },
];

const accountLinks = [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-auto overflow-hidden bg-slate-950 text-slate-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_35%)]" />

            <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-xl font-black text-white transition hover:text-blue-200"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-900/40">
                                JP
                            </span>
                            Job Portal
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
                            Discover curated roles, sharpen your profile with AI tools, and move from search to offer with confidence.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Smart hiring platform
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            Explore
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            AI Tools
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {aiLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            Get Started
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {accountLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm font-semibold text-white">
                                Ready for your next role?
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Browse open positions and save the ones that fit your goals.
                            </p>
                            <Link
                                to="/jobs"
                                className="mt-4 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                            >
                                View jobs
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Job Portal. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <Link to="/jobs" className="transition hover:text-white">
                            Jobs
                        </Link>
                        <Link to="/ai/recommendations" className="transition hover:text-white">
                            AI Matches
                        </Link>
                        <Link to="/register" className="transition hover:text-white">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
