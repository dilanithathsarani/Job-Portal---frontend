import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";

function ViewApplicants() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const endpoint = jobId ? `/application/job/${jobId}` : `/application/recruiter`;

            const res = await api.get(
                endpoint,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(res.data || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load applicants");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            await api.put(
                `/application/status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(`Status updated to: ${status}`);
            fetchApplicants();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {jobId ? "Job Applicants" : "All Applicants"}
                    </h1>
                    <p className="text-slate-500 mt-1">Review and manage the applications received.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <FaUserCircle className="text-4xl text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700">No applicants found</h3>
                        <p className="text-slate-500 mt-2">There are currently no applications for this job.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">Applicant</th>
                                        <th className="p-4 font-medium">Job Applied To</th>
                                        <th className="p-4 font-medium">Resume</th>
                                        <th className="p-4 font-medium">Current Status</th>
                                        <th className="p-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                        {app.applicant?.name?.charAt(0) || "?"}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">{app.applicant?.name || "N/A"}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5">{app.applicant?.email || "N/A"}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-700 font-medium text-sm">
                                                {app.job?.title || "N/A"}
                                            </td>
                                            <td className="p-4">
                                                {app.applicant?.resume ? (
                                                    <a
                                                        href={`http://localhost:5000/${app.applicant.resume}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <FaFileAlt /> View Resume
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-sm italic">No Resume</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-md text-xs font-bold inline-flex items-center gap-1.5 ${
                                                    app.status === "Hired" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                                    app.status === "Rejected" ? "bg-red-50 text-red-600 border border-red-100" :
                                                    app.status === "Interview" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                                    app.status === "Shortlisted" ? "bg-teal-50 text-teal-600 border border-teal-100" :
                                                    app.status === "Under Review" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                                    "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        app.status === "Hired" ? "bg-emerald-500" :
                                                        app.status === "Rejected" ? "bg-red-500" :
                                                        app.status === "Interview" ? "bg-purple-500" :
                                                        app.status === "Shortlisted" ? "bg-teal-500" :
                                                        app.status === "Under Review" ? "bg-amber-500" :
                                                        "bg-indigo-500"
                                                    }`}></span>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            app._id,
                                                            e.target.value
                                                        )
                                                    }
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewApplicants;