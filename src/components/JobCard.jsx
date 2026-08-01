import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { normalizeRole } from "../utils/roles";

function JobCard({ job, initiallySaved = false }) {

    const [saved, setSaved] = useState(initiallySaved);
    const token = localStorage.getItem("token");
    const role = (() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return normalizeRole(user?.role);
        } catch {
            return null;
        }
    })();

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
        <article className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div>
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                            {job.jobType || "Job"}
                        </p>
                        <h2 className="mt-2 line-clamp-2 text-xl font-black text-slate-950">
                            {job.title}
                        </h2>
                    </div>

                    {token && role === "jobseeker" && (
                        <button
                            onClick={handleSave}
                            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                                saved
                                    ? "border-amber-300 bg-amber-50 text-amber-700"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                            }`}
                        >
                            {saved ? "Saved" : "Save"}
                        </button>
                    )}
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>{job.location || "Location flexible"}</p>
                    <p>{job.company?.name || job.company || "Company details available in job view"}</p>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-3">
                    {job.description}
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <p className="text-lg font-black text-emerald-600">
                    Rs. {job.salary}
                </p>

                <Link
                    to={`/jobs/${job._id}`}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                    View details
                </Link>
            </div>
        </article>
    );
}

export default JobCard;
