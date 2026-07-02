import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const res =
                await api.get(`/jobs/${id}`);

            setJob(res.data);

        } catch (error) {

            console.log(error);

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

    if (!job) {
        return <h1>Loading...</h1>;
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