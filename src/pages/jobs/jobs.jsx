import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [jobType, setJobType] = useState("");

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

    const filterJobs = (searchValue, typeValue) => {

        const filtered = jobs.filter((job) => {

            const searchMatch =
                job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.location.toLowerCase().includes(searchValue.toLowerCase());

            const typeMatch =
                typeValue === "" ||
                job.jobType === typeValue;

            return searchMatch && typeMatch;

        });

        setFilteredJobs(filtered);

    };

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        filterJobs(value, jobType);

    };

    const handleJobType = (e) => {

        const value = e.target.value;

        setJobType(value);

        filterJobs(search, value);

    };

    return (
        <div className="max-w-7xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Available Jobs
            </h1>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 border p-3 rounded-lg"
                />

                <select
                    value={jobType}
                    onChange={handleJobType}
                    className="border p-3 rounded"
                >

                    <option value="">All Jobs</option>

                    <option value="Full Time">Full Time</option>

                    <option value="Part Time">Part Time</option>

                    <option value="Internship">Internship</option>

                    <option value="Remote">Remote</option>

                </select>

            </div>

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