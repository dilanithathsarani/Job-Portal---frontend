import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const companyName =
        typeof job?.company === "string"
            ? job.company
            : job?.company?.name || "Hiring team";

    useEffect(() => {

        const fetchJob = async () => {

            try {

                setLoading(true);
                setError("");

                const res = await api.get(`/jobs/${id}`);
                setJob(res.data);

            } catch (requestError) {

                console.error("Error fetching job:", requestError);

                const message =
                    requestError.response?.data?.message ||
                    "Failed to load job details";

                setError(message);
                toast.error(message);

            } finally {

                setLoading(false);

            }

        };

        fetchJob();

    }, [id]);

    const applyJob = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                `/application/apply/${id}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success("Applied Successfully!");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Application Failed"
            );

        }

    };

    if (loading) {
        return (
            <>
                <NavBar />
                <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="h-4 w-24 rounded-full bg-slate-200" />
                        <div className="mt-5 h-8 w-3/4 rounded-xl bg-slate-200" />
                        <div className="mt-8 space-y-3">
                            <div className="h-4 rounded-full bg-slate-200" />
                            <div className="h-4 w-11/12 rounded-full bg-slate-200" />
                            <div className="h-4 w-10/12 rounded-full bg-slate-200" />
                        </div>
                    </div>
                </main>
            </>
        );
    }

    if (error || !job) {
        return (
            <>
                <NavBar />
                <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-red-600">
                            {error || "Job not found"}
                        </p>
                        <Link
                            to="/jobs"
                            className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                        >
                            Back to jobs
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-4xl">
                    <Link
                        to="/jobs"
                        className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
                    >
                        Back to jobs
                    </Link>

                    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                            {companyName}
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                            {job.title}
                        </h1>

                        <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                            <p><span className="font-semibold text-slate-900">Location:</span> {job.location || "Flexible"}</p>
                            <p><span className="font-semibold text-slate-900">Salary:</span> Rs. {job.salary}</p>
                            <p><span className="font-semibold text-slate-900">Job type:</span> {job.jobType || "Open role"}</p>
                            <p><span className="font-semibold text-slate-900">Experience:</span> {job.experienceLevel || "Not specified"}</p>
                        </div>

                        <div className="mt-8 border-t border-slate-200 pt-6">
                            <h2 className="text-lg font-bold text-slate-950">Description</h2>
                            <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                                {job.description}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-500">
                                Review the role details above, then apply when you're ready.
                            </p>

                            <button
                                onClick={applyJob}
                                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                            >
                                Apply Now
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default JobDetails;