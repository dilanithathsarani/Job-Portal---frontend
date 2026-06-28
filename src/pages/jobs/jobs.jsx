import { useEffect, useState } from "react";
import api from "../../services/api";
import JobCard from "../../components/JobCard";
import Loader from "../../components/Loader";
import NavBar from "../../components/navBar";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [jobType, setJobType] = useState("");

    // Pagination & Loading
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Saved Jobs state
    const [savedJobIds, setSavedJobIds] = useState(new Set());

    useEffect(() => {

        fetchSavedJobs();

    }, []);

    useEffect(() => {

        fetchJobs();

    }, [currentPage]);

    const fetchSavedJobs = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const user = JSON.parse(localStorage.getItem("user"));

            if (user?.role !== "jobseeker") return;

            const res = await api.get(
                "/users/saved-jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const ids = new Set(res.data.map((job) => job._id));
            setSavedJobIds(ids);

        } catch (error) {

            console.error("Error fetching saved jobs:", error);

        }

    };

    const fetchJobs = async () => {

        setLoading(true);

        try {

            const res = await api.get(
                `/jobs?page=${currentPage}&limit=10`
            );

            // Handle robust pagination response or simple array fallback
            let jobsData = [];
            let total = 1;

            if (Array.isArray(res.data)) {

                jobsData = res.data;

            } else if (res.data && Array.isArray(res.data.jobs)) {

                jobsData = res.data.jobs;
                total = res.data.totalPages || 1;

            }

            setJobs(jobsData);
            setTotalPages(total);

            // Filter jobs immediately using any active search/type filter
            applyFilters(jobsData, search, jobType);

        } catch (error) {

            console.error("Error fetching jobs:", error);

        } finally {

            setLoading(false);

        }

    };

    const applyFilters = (jobsList, searchValue, typeValue) => {

        const filtered = jobsList.filter((job) => {

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
        applyFilters(jobs, value, jobType);

    };

    const handleJobType = (e) => {

        const value = e.target.value;
        setJobType(value);
        applyFilters(jobs, search, value);

    };

    return (
        <>
            <NavBar />

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
                        className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <select
                        value={jobType}
                        onChange={handleJobType}
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                        <option value="">All Jobs</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                    </select>

                </div>

                {loading ? (

                    <Loader />

                ) : filteredJobs.length === 0 ? (

                    <p className="text-center mt-10 text-gray-500">
                        No jobs found.
                    </p>

                ) : (

                    <div>
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job._id}
                                job={job}
                                initiallySaved={savedJobIds.has(job._id)}
                            />
                        ))}
                    </div>

                )}

                {/* Pagination Controls */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">

                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-gray-50 transition cursor-pointer"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                                    currentPage === page
                                        ? "bg-blue-600 text-white font-bold"
                                        : "bg-white border hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-gray-50 transition cursor-pointer"
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>
        </>
    );
}

export default Jobs;