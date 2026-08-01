import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaBriefcase, FaFileAlt, FaComments, FaStar } from "react-icons/fa";

import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import DashboardCard from "../../components/recruiter/DashboardCard";

function RecruiterDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalJobs: 0,
        applications: 0,
        interviews: 0,
        shortlisted: 0
    });

    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadRecentJobs();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await api.get("/recruiter/dashboard");
            setStats(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const loadRecentJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/jobs/recruiter", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Show only the 5 most recent jobs
            const jobs = res.data.jobs || res.data || [];
            setRecentJobs(jobs.slice(0, 5));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />
            
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        Dashboard Overview
                    </h1>
                    <p className="text-slate-500 mt-1">Welcome back, here is your recruiting summary.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard
                        title="Jobs Posted"
                        value={stats.totalJobs}
                        color="text-blue-600"
                        bg="bg-white"
                        icon={<FaBriefcase className="text-2xl" />}
                    />
                    <DashboardCard
                        title="Applications"
                        value={stats.applications}
                        color="text-emerald-600"
                        bg="bg-white"
                        icon={<FaFileAlt className="text-2xl" />}
                    />
                    <DashboardCard
                        title="Interviews"
                        value={stats.interviews}
                        color="text-orange-500"
                        bg="bg-white"
                        icon={<FaComments className="text-2xl" />}
                    />
                    <DashboardCard
                        title="Shortlisted"
                        value={stats.shortlisted}
                        color="text-purple-600"
                        bg="bg-white"
                        icon={<FaStar className="text-2xl" />}
                    />
                </div>

                <div className="bg-white rounded-2xl mt-10 shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            Recent Jobs
                        </h2>
                        <button
                            onClick={() => navigate("/recruiter/jobs")}
                            className="text-indigo-600 font-medium text-sm hover:text-indigo-700 hover:underline"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                    <th className="py-4 font-medium px-4">Title</th>
                                    <th className="py-4 font-medium px-4">Type</th>
                                    <th className="py-4 font-medium px-4 text-right">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentJobs.length > 0 ? recentJobs.map((job) => (
                                    <tr key={job._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-semibold text-slate-800">{job.title}</div>
                                            <div className="text-xs text-slate-500 mt-1">{job.company?.name || ""}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full text-xs">
                                                {job.jobType || "N/A"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right text-slate-600 text-sm">
                                            {job.location || "—"}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="py-10 text-center text-slate-400">
                                            No jobs posted yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecruiterDashboard;