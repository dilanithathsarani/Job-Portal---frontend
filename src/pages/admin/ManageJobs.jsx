import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase, MapPin, Building2, X, Search } from "lucide-react";
import { Eye } from "lucide-react";

import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get("/admin/jobs");
            setJobs(res.data.jobs);
            setFilteredJobs(res.data.jobs);
        } catch (error) {
            console.error("Fetch jobs error:", error);
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = jobs.filter((job) => {
            const title = job.title?.toLowerCase() || "";
            const location = job.location?.toLowerCase() || "";
            const company = job.company?.name?.toLowerCase() || "";
            return (
                title.includes(value.toLowerCase()) ||
                location.includes(value.toLowerCase()) ||
                company.includes(value.toLowerCase())
            );
        });
        setFilteredJobs(filtered);
    };

    const handleDelete = async (id) => {
        const confirmed = await confirmToast("Are you sure you want to delete this job?");
        if (!confirmed) return;
        try {
            await api.delete(`/admin/jobs/${id}`);
            const updated = jobs.filter((job) => job._id !== id);
            setJobs(updated);
            setFilteredJobs(updated);
            toast.success("Job deleted successfully");
        } catch (error) {
            console.error("Delete job error:", error);
            toast.error("Failed to delete job");
        }
    };

    const jobTypeBadge = (type) => {
        const styles = {
            "Full Time": "bg-blue-50 text-blue-600 border border-blue-100",
            "Part Time": "bg-amber-50 text-amber-600 border border-amber-100",
            "Internship": "bg-teal-50 text-teal-600 border border-teal-100",
            "Contract": "bg-purple-50 text-purple-600 border border-purple-100",
            "Remote": "bg-emerald-50 text-emerald-600 border border-emerald-100",
        };
        return styles[type] || "bg-slate-50 text-slate-600 border border-slate-100";
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manage Jobs</h1>
                        <p className="text-slate-500 mt-1">Manage all jobs posted on the platform.</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-xl px-5 py-3 border border-slate-100 flex items-center gap-3">
                        <Briefcase size={20} className="text-purple-600" />
                        <div>
                            <p className="text-xs text-slate-500">Total Jobs</p>
                            <p className="text-xl font-bold text-purple-600">{jobs.length}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center gap-3">
                    <Search size={18} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by title, location or company..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full outline-none text-slate-700 placeholder-slate-400 text-sm bg-transparent"
                    />
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <Briefcase size={48} className="text-slate-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700">No jobs found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search query.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">Job</th>
                                        <th className="p-4 font-medium">Company</th>
                                        <th className="p-4 font-medium">Location</th>
                                        <th className="p-4 font-medium">Type</th>
                                        <th className="p-4 font-medium">Salary</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs.map((job) => (
                                        <tr key={job._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                                                        <Briefcase size={16} />
                                                    </div>
                                                    <span className="font-semibold text-slate-800">{job.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <Building2 size={15} className="text-slate-400" />
                                                    {job.company?.name || "N/A"}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <MapPin size={15} className="text-slate-400" />
                                                    {job.location || "N/A"}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {job.jobType && (
                                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${jobTypeBadge(job.jobType)}`}>
                                                        {job.jobType}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 font-semibold text-emerald-600 text-sm">
                                                Rs. {job.salary || 0}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedJob(job)}
                                                        className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <Eye size={15} /> View
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(job._id)}
                                                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Job Detail Modal */}
                {selectedJob && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-7 w-full max-w-xl shadow-2xl relative">
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 transition-colors"
                            >
                                <X size={22} />
                            </button>

                            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Briefcase size={22} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedJob.title}</h2>
                                    <p className="text-sm text-slate-500">{selectedJob.company?.name || "N/A"}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                {[
                                    { label: "Location", value: selectedJob.location },
                                    { label: "Salary", value: `Rs. ${selectedJob.salary}` },
                                    { label: "Job Type", value: selectedJob.jobType },
                                    { label: "Experience Level", value: selectedJob.experienceLevel },
                                    { label: "Skills Required", value: selectedJob.skillsRequired?.join(", ") || "N/A" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex gap-3">
                                        <span className="text-slate-500 font-medium w-36 shrink-0">{label}</span>
                                        <span className="text-slate-800">{value}</span>
                                    </div>
                                ))}
                                <div className="flex gap-3 mt-2">
                                    <span className="text-slate-500 font-medium w-36 shrink-0">Description</span>
                                </div>
                                <p className="bg-slate-50 rounded-xl p-4 text-slate-700 leading-relaxed">{selectedJob.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageJobs;
