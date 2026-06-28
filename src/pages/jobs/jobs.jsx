import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {

            const res =
                await api.get("/jobs");

            setJobs(res.data);
            setFilteredJobs(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        const filtered = jobs.filter((job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) ||
            job.location.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredJobs(filtered);

    };

    return (
        <div className="max-w-7xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Available Jobs
            </h1>

            <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={handleSearch}
                className="w-full border p-3 rounded-lg mb-6"
            />

            {
                filteredJobs.map((job) => (

                    <div
                        key={job._id}
                        className="border p-4 rounded-lg mb-3"
                    >

                        <h2 className="text-xl font-bold">
                            {job.title}
                        </h2>

                        <p>{job.location}</p>

                        <p>Rs. {job.salary}</p>

                        <Link
                            to={`/jobs/${job._id}`}
                            className="text-blue-600"
                        >
                            View Details
                        </Link>

                    </div>

                ))
            }

        </div>
    );
}

export default Jobs;