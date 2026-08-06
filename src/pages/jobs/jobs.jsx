import { useEffect, useState } from "react";
import api from "../../services/api";
import JobCard from "../../components/JobCard";
import Loader from "../../components/Loader";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { normalizeRole } from "../../utils/roles";

const normalize = (value) =>
    String(value ?? "").trim().toLowerCase();

const getCompanyName = (company) => {

    if (typeof company === "string") return company;
    return company?.name ?? "";

};

const normalizeJobType = (value) =>
    normalize(value).replace(/[^a-z0-9]/g, "");

const applyFilters = (jobsList, searchValue, typeValue) => {

    const normalizedSearch = normalize(searchValue);
    const normalizedType = normalizeJobType(typeValue);

    return jobsList.filter((job) => {

        const searchableText = [
            job.title,
            job.location,
            job.description,
            getCompanyName(job.company),
        ].map(normalize).join(" ");

        const searchMatch =
            normalizedSearch === "" ||
            searchableText.includes(normalizedSearch);

        const typeMatch =
            normalizedType === "" ||
            normalizeJobType(job.jobType) === normalizedType;

        return searchMatch && typeMatch;

    });

};

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

    const hasActiveFilters = search.trim() !== "" || jobType !== "";
    const visibleJobs = filteredJobs;

    useEffect(() => {

        const fetchSavedJobs = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) return;

                const user = JSON.parse(localStorage.getItem("user"));

                if (normalizeRole(user?.role) !== "jobseeker") return;

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

        fetchSavedJobs();

    }, []);

    useEffect(() => {

        const fetchJobs = async () => {

            setLoading(true);

            try {

                const shouldFetchAllJobs = search.trim() !== "" || jobType !== "";

                const res = await api.get(
                    shouldFetchAllJobs
                        ? "/jobs"
                        : `/jobs?page=${currentPage}&limit=10`
                );

                let jobsData = [];
                let total = 1;

                if (Array.isArray(res.data)) {

                    jobsData = res.data;

                } else if (res.data && Array.isArray(res.data.jobs)) {

                    jobsData = res.data.jobs;
                    total = res.data.totalPages || 1;

                }

                setJobs(jobsData);
                setTotalPages(shouldFetchAllJobs ? 1 : total);
                setFilteredJobs(applyFilters(jobsData, search, jobType));

            } catch (error) {

                console.error("Error fetching jobs:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchJobs();

    }, [currentPage, search, jobType]);

    const handleSearch = (e) => {

        const value = e.target.value;
        setSearch(value);
        setFilteredJobs(applyFilters(jobs, value, jobType));

    };

    const handleJobType = (e) => {

        const value = e.target.value;
        setJobType(value);
        setFilteredJobs(applyFilters(jobs, search, value));

    };

    const clearFilters = () => {

        setSearch("");
        setJobType("");
        setFilteredJobs(applyFilters(jobs, "", ""));

    };

    return (
        <>
            <NavBar />

            <main className="min-h-screen bg-slate-50 text-slate-900">
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
                        <div className="max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                                Jobseeker jobs
                            </p>
                            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                                Find jobs fast, without the clutter.
                            </h1>
                            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                                Search by role, company, location, or type, then open a clean tile to review the details you need.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                            <div className="grid gap-3 lg:grid-cols-[1.3fr_220px_auto] lg:items-center">
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, or locations"
                                    value={search}
                                    onChange={handleSearch}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <select
                                    value={jobType}
                                    onChange={handleJobType}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="">All job types</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                                >
                                    Clear
                                </button>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Full Time", "Part Time", "Internship", "Remote"].map((type) => {
                                    const active = jobType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => {
                                                setJobType(type);
                                                applyFilters(jobs, search, type);
                                            }}
                                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                active
                                                    ? "bg-slate-950 text-white"
                                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-600">
                            {loading ? "Loading jobs..." : `${visibleJobs.length} jobs found`}
                        </p>
                        {hasActiveFilters && !loading && (
                            <p className="text-sm text-slate-500">
                                Showing filtered results
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <Loader />
                        </div>
                    ) : visibleJobs.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-xl font-bold text-slate-900">No jobs match your search.</p>
                            <p className="mt-2 text-slate-600">
                                Try a broader keyword or clear the filters to see everything again.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {visibleJobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    initiallySaved={savedJobIds.has(job._id)}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && totalPages > 1 && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`rounded-full px-4 py-2 font-semibold transition ${
                                        currentPage === page
                                            ? "bg-slate-950 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Jobs;
