import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Building2, MapPin, Search } from "lucide-react";
import api from "../../services/api";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

const statusStyles = {
    applied: "bg-blue-50 text-blue-700",
    "under review": "bg-amber-50 text-amber-700",
    shortlisted: "bg-cyan-50 text-cyan-700",
    interview: "bg-violet-50 text-violet-700",
    hired: "bg-emerald-50 text-emerald-700",
    rejected: "bg-rose-50 text-rose-700",
};

const getStatus = (value) => String(value || "Applied").trim().toLowerCase();
const getCompany = (company) => typeof company === "string" ? company : company?.name || "Company not specified";

const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

function AppliedJobs() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const loadApplications = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/application/my-applications", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplications(Array.isArray(response.data) ? response.data : response.data?.applications || []);
        } catch (requestError) {
            console.error("Error loading applications:", requestError);
            setError("Could not load your applications.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadApplications(); }, [loadApplications]);

    const visibleApplications = useMemo(() => {
        const query = search.trim().toLowerCase();
        return applications.filter((application) => {
            const job = application.job || {};
            const matchesSearch = !query || [job.title, getCompany(job.company), job.location]
                .some((item) => String(item || "").toLowerCase().includes(query));
            return matchesSearch && (status === "all" || getStatus(application.status) === status);
        });
    }, [applications, search, status]);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <NavBar />
            <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Applied jobs</h1>
                        <p className="mt-2 text-slate-500">Track your job applications in one place.</p>
                    </div>
                    <Link to="/jobs" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                        Browse jobs <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="mt-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_190px]">
                    <label className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applications" className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500" />
                    </label>
                    <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                        <option value="all">All statuses</option>
                        <option value="applied">Applied</option>
                        <option value="under review">Under review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {!loading && <p className="mt-6 text-sm text-slate-500">{visibleApplications.length} application{visibleApplications.length === 1 ? "" : "s"}</p>}

                {loading ? (
                    <Message>Loading applications...</Message>
                ) : error ? (
                    <Message><p>{error}</p><button onClick={loadApplications} className="mt-3 font-semibold text-blue-600">Try again</button></Message>
                ) : visibleApplications.length === 0 ? (
                    <Message><Briefcase className="mx-auto text-slate-300" size={32} /><p className="mt-3 font-semibold text-slate-900">No applications found</p><p className="mt-1 text-sm">{applications.length ? "Try changing your search or filter." : "Browse jobs to submit your first application."}</p></Message>
                ) : (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        {visibleApplications.map((application, index) => {
                            const job = application.job || {};
                            const currentStatus = application.status || "Applied";
                            const appliedDate = formatDate(application.createdAt || application.appliedAt);
                            return (
                                <article key={application._id} className={`p-5 sm:p-6 ${index ? "border-t border-slate-100" : ""}`}>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-lg font-semibold text-slate-900">{job.title || "Job no longer available"}</h2>
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[getStatus(currentStatus)] || statusStyles.applied}`}>{currentStatus}</span>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                                <span className="inline-flex items-center gap-1.5"><Building2 size={15} />{getCompany(job.company)}</span>
                                                {job.location && <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{job.location}</span>}
                                                {appliedDate && <span>Applied {appliedDate}</span>}
                                            </div>
                                        </div>
                                        {job._id && <Link to={`/jobs/${job._id}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600">View job <ArrowRight size={15} /></Link>}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

function Message({ children }) {
    return <div className="mt-3 rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">{children}</div>;
}

export default AppliedJobs;
