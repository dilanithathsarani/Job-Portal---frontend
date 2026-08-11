import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase, Building2, FileText } from "lucide-react";

import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

const applicationStatuses = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview",
    "Rejected",
    "Hired",
];

function ManageApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredApplications = useMemo(() => {
        if (statusFilter === "All") return applications;

        return applications.filter(
            (application) => application.status?.toLowerCase() === statusFilter.toLowerCase(),
        );
    }, [applications, statusFilter]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get("/admin/applications");
            setApplications(Array.isArray(res.data.applications) ? res.data.applications : []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/admin/applications/${id}`, { status });
            setApplications((currentApplications) =>
                currentApplications.map((app) => app._id === id ? { ...app, status } : app)
            );
            toast.success("Application status updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const statusBadge = (status) => {
        const styles = {
            "Hired": "bg-emerald-50 text-emerald-600 border border-emerald-100",
            "Rejected": "bg-red-50 text-red-600 border border-red-100",
            "Interview": "bg-purple-50 text-purple-600 border border-purple-100",
            "Shortlisted": "bg-teal-50 text-teal-600 border border-teal-100",
            "Under Review": "bg-amber-50 text-amber-600 border border-amber-100",
            "Applied": "bg-indigo-50 text-indigo-600 border border-indigo-100",
        };
        const dots = {
            "Hired": "bg-emerald-500",
            "Rejected": "bg-red-500",
            "Interview": "bg-purple-500",
            "Shortlisted": "bg-teal-500",
            "Under Review": "bg-amber-500",
            "Applied": "bg-indigo-500",
        };
        return { badge: styles[status] || "bg-slate-50 text-slate-600 border border-slate-100", dot: dots[status] || "bg-slate-500" };
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manage Applications</h1>
                        <p className="text-slate-500 mt-1">Review and manage all job applications on the platform.</p>
                    </div>
                    {!loading && (
                        <div className="bg-white shadow-sm rounded-xl px-5 py-3 border border-slate-100 flex items-center gap-3">
                            <FileText size={20} className="text-orange-500" />
                            <div>
                                <p className="text-xs text-slate-500">Total Applications</p>
                                <p className="text-xl font-bold text-orange-500">{applications.length}</p>
                            </div>
                        </div>
                    )}
                </div>

                {!loading && applications.length > 0 && (
                    <div className="mb-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <label htmlFor="application-status-filter" className="text-sm font-semibold text-slate-700">
                                Filter by status
                            </label>
                            <select
                                id="application-status-filter"
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="All">All applications ({applications.length})</option>
                                {applicationStatuses.map((status) => {
                                    const count = applications.filter(
                                        (application) => application.status?.toLowerCase() === status.toLowerCase(),
                                    ).length;

                                    return <option key={status} value={status}>{status} ({count})</option>;
                                })}
                            </select>
                        </div>
                        <p className="text-sm text-slate-500">
                            Showing {filteredApplications.length} of {applications.length}
                        </p>
                    </div>
                )}

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <FileText size={48} className="text-slate-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700">
                            {statusFilter === "All" ? "No applications found" : `No ${statusFilter.toLowerCase()} applications`}
                        </h3>
                        <p className="text-slate-500 mt-2">
                            {statusFilter === "All"
                                ? "Applications will appear here once candidates apply."
                                : "No applications currently match this status."}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">Applicant</th>
                                        <th className="p-4 font-medium">Job</th>
                                        <th className="p-4 font-medium">Company</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium text-right">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.map((app) => {
                                        const { badge, dot } = statusBadge(app.status);
                                        return (
                                            <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                {/* Applicant */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                                                            {app.applicant?.name?.charAt(0) || "?"}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800">{app.applicant?.name || "N/A"}</p>
                                                            <p className="text-xs text-slate-500">{app.applicant?.email || "N/A"}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Job */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase size={15} className="text-purple-400 shrink-0" />
                                                        <div>
                                                            <p className="font-semibold text-slate-800 text-sm">{app.job?.title || "N/A"}</p>
                                                            <p className="text-xs text-slate-500">{app.job?.location || ""}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Company */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                        <Building2 size={15} className="text-slate-400" />
                                                        {app.job?.company?.name || "N/A"}
                                                    </div>
                                                </td>

                                                {/* Status badge */}
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold inline-flex items-center gap-1.5 ${badge}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                                                        {app.status}
                                                    </span>
                                                </td>

                                                {/* Status dropdown */}
                                                <td className="p-4 text-right">
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                                        className="border border-slate-200 p-2 rounded-lg bg-white text-sm text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-slate-300 transition-colors"
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Under Review">Under Review</option>
                                                        <option value="Shortlisted">Shortlisted</option>
                                                        <option value="Interview">Interview</option>
                                                        <option value="Rejected">Rejected</option>
                                                        <option value="Hired">Hired</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageApplications;
