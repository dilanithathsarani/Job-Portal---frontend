import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchJob();

    }, [id]);

    const fetchJob = async () => {

        try {

            setLoading(true);
            setError("");

            const res =
                await api.get(`/jobs/${id}`);

            setJob(res.data);

        } catch (error) {

            console.error("Error fetching job:", error);
            setError(
                error.response?.data?.message ||
                "Failed to load job details"
            );
            toast.error(
                error.response?.data?.message ||
                "Failed to load job details"
            );

        } finally {

            setLoading(false);

        }

    };

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
        return <h1 className="p-6 text-center">Loading...</h1>;
    }

    if (error || !job) {
        return (
            <>
                <NavBar />
                <div className="max-w-5xl mx-auto p-6 text-center">
                    <p className="text-red-600 mb-4">
                        {error || "Job not found"}
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="max-w-5xl mx-auto p-6">

                <div className="bg-white shadow rounded-lg p-6">

                    <h1 className="text-3xl font-bold mb-4">
                        {job.title}
                    </h1>

                    <p className="mb-3">
                        <strong>Location:</strong> {job.location}
                    </p>

                    <p className="mb-3">
                        <strong>Salary:</strong> Rs. {job.salary}
                    </p>

                    <p className="mb-3">
                        <strong>Job Type:</strong> {job.jobType}
                    </p>

                    <p className="mb-3">
                        <strong>Experience:</strong> {job.experienceLevel}
                    </p>

                    <p className="mb-5">
                        <strong>Description:</strong>
                        <br />
                        {job.description}
                    </p>

                    <button
                        onClick={applyJob}
                        className="bg-blue-600 text-white px-5 py-3 rounded"
                    >
                        Apply Now
                    </button>

                </div>

            </div>
        </>
    );
}

export default JobDetails;