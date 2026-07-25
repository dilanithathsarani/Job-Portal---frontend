import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import api from "../../services/api";
import toast from "react-hot-toast";

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
        <div className="flex min-h-screen bg-gray-100">
            <RecruiterSidebar />

            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">
                    {jobId ? "Job Applicants" : "All Applicants"}
                </h1>

                {loading ? (
                    <p className="text-gray-500">Loading applicants...</p>
                ) : applications.length === 0 ? (
                    <p className="text-gray-500">No applicants found.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                                    <th className="p-4 text-left font-semibold text-gray-700">Email</th>
                                    <th className="p-4 text-left font-semibold text-gray-700">Job Applied To</th>
                                    <th className="p-4 text-left font-semibold text-gray-700">Resume</th>
                                    <th className="p-4 text-left font-semibold text-gray-700">Current Status</th>
                                    <th className="p-4 text-left font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 text-gray-800 font-medium">
                                            {app.applicant?.name || "N/A"}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {app.applicant?.email || "N/A"}
                                        </td>
                                        <td className="p-4 text-gray-700 font-medium">
                                            {app.job?.title || "N/A"}
                                        </td>
                                        <td className="p-4">
                                            {app.applicant?.resume ? (
                                                <a
                                                    href={`http://localhost:5000/${app.applicant.resume}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                                                >
                                                    📄 View Resume
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No Resume</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                app.status === "Hired" ? "bg-green-100 text-green-800" :
                                                app.status === "Rejected" ? "bg-red-100 text-red-800" :
                                                app.status === "Interview" ? "bg-purple-100 text-purple-800" :
                                                app.status === "Shortlisted" ? "bg-teal-100 text-teal-800" :
                                                app.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-blue-100 text-blue-800"
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) =>
                                                    updateStatus(
                                                        app._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-2 rounded bg-white text-gray-800 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                )}
            </div>
        </div>
    );
}

export default ViewApplicants;