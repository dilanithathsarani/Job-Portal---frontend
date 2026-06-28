import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const res = await api.get(
                    "/jobs/recruiter",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setJobs(res.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchJobs();

    }, []);

    const handleDelete = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/jobs/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setJobs(
                jobs.filter((job) => job._id !== id)
            );

            alert("Job Deleted");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <NavBar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">
                    Manage Jobs
                </h1>

                {loading ? (

                    <p className="text-gray-500">
                        Loading jobs...
                    </p>

                ) : jobs.length === 0 ? (

                    <p className="text-gray-500">
                        No jobs posted yet.
                    </p>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full bg-white shadow rounded">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-4">
                                        Title
                                    </th>
                                    <th className="text-left p-4">
                                        Location
                                    </th>
                                    <th className="text-left p-4">
                                        Job Type
                                    </th>
                                    <th className="text-left p-4">
                                        Salary
                                    </th>
                                    <th className="text-left p-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {jobs.map((job) => (

                                    <tr
                                        key={job._id}
                                        className="border-b"
                                    >
                                        <td className="p-4">
                                            {job.title}
                                        </td>

                                        <td className="p-4">
                                            {job.location}
                                        </td>

                                        <td className="p-4">
                                            {job.jobType}
                                        </td>

                                        <td className="p-4">
                                            {job.salary}
                                        </td>

                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    handleDelete(job._id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

            </div>
        </>
    );
}

export default ManageJobs;
