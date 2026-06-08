import { useEffect, useState } from "react";
import api from "../../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs");
            setJobs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Available Jobs
            </h1>

            {jobs.length === 0 && (
                <p className="text-gray-500">No jobs found. Check back later!</p>
            )}

            {jobs.map((job) => (
                <div
                    key={job._id}
                    className="border p-4 rounded-lg mb-3"
                >
                    <h2 className="text-xl font-bold">
                        {job.title}
                    </h2>
                    <p>{job.location}</p>
                    <p>Rs. {job.salary}</p>
                </div>
            ))}

        </div>
    );
}

export default Jobs;
