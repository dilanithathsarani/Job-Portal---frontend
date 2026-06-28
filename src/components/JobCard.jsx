import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function JobCard({ job, initiallySaved = false }) {

    const [saved, setSaved] = useState(initiallySaved);
    const token = localStorage.getItem("token");
    let role = null;
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        role = user?.role;
    } catch (e) {}

    const handleSave = async () => {

        try {

            const token = localStorage.getItem("token");

            if (saved) {

                await api.delete(
                    `/jobs/${job._id}/save`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSaved(false);

            } else {

                await api.post(
                    `/jobs/${job._id}/save`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSaved(true);

            }

        } catch (error) {

            console.error("Error saving/unsaving job:", error);

        }

    };

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-4 flex justify-between items-start transition-shadow hover:shadow-md">

            <div>

                <h2 className="text-xl font-bold mb-1">
                    {job.title}
                </h2>

                <p className="text-gray-600 mb-1">
                    {job.location}
                </p>

                <p className="text-gray-500 text-sm mb-2">
                    {job.jobType}
                </p>

                <p className="font-semibold text-green-600 mb-3">
                    Rs. {job.salary}
                </p>

                <Link
                    to={`/jobs/${job._id}`}
                    className="text-blue-600 hover:underline font-medium"
                >
                    View Details
                </Link>

            </div>

            {token && role === "jobseeker" && (
                <button
                    onClick={handleSave}
                    className="text-yellow-500 hover:scale-110 active:scale-95 transition flex items-center gap-1 cursor-pointer font-semibold border border-yellow-200 rounded-lg px-3 py-1 bg-yellow-50/50 hover:bg-yellow-50"
                >
                    ⭐ {saved ? "Saved" : "Save"}
                </button>
            )}

        </div>
    );
}

export default JobCard;
