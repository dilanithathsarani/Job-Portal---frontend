import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import { publishJobDeleted, subscribeToJobDeletions } from "../../utils/jobEvents";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import { FaTrash, FaUsers, FaSearch } from "react-icons/fa";

function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/jobs/recruiter", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(res.data.jobs || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => subscribeToJobDeletions((jobId) => {
        setJobs((currentJobs) => currentJobs.filter((job) => job._id !== jobId));
    }), []);

    const handleDelete = async (id) => {
        const confirmed = await confirmToast("Are you sure you want to delete this job?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            await api.delete(`/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setJobs((currentJobs) => currentJobs.filter((job) => job._id !== id));
            publishJobDeleted(id);
            toast.success("Job Deleted");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete job");
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                            Manage Jobs
                        </h1>
                        <p className="text-slate-500 mt-1">Overview of all jobs you have posted in table format.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <FaSearch className="text-4xl text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700">No jobs found</h3>
                        <p className="text-slate-500 mt-2">You don't have any jobs to manage right now.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">Title</th>
                                        <th className="p-4 font-medium">Location</th>
                                        <th className="p-4 font-medium">Job Type</th>
                                        <th className="p-4 font-medium">Salary</th>
                                        <th className="p-4 font-medium text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-semibold text-slate-800">{job.title}</div>
                                                <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{job.company?.name || 'Your Company'}</div>
                                            </td>
                                            <td className="p-4 text-slate-600 text-sm">{job.location}</td>
                                            <td className="p-4">
                                                <span className="bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-md text-xs">
                                                    {job.jobType}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-600 text-sm font-medium">{job.salary}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        to={`/recruiter/applicants/${job._id}`}
                                                        className="inline-flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-indigo-100"
                                                    >
                                                        <FaUsers />
                                                        Applicants
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(job._id)}
                                                        className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-100"
                                                    >
                                                        <FaTrash />
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
            </div>
        </div>
    );
}

export default ManageJobs;
