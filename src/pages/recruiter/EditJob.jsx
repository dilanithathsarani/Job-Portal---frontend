import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import api from "../../services/api";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        experienceLevel: "",
        skillsRequired: "",
        company: ""
    });

    useEffect(() => {
        const loadData = async () => {
            await fetchCompanies();
            await fetchJobDetails();
            setLoading(false);
        };
        loadData();
    }, [id]);

    const fetchCompanies = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/company/my-companies", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCompanies(res.data.companies || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load companies");
        }
    };

    const fetchJobDetails = async () => {
        try {
            const res = await api.get(`/jobs/${id}`);
            const jobData = res.data;
            setJob({
                title: jobData.title || "",
                description: jobData.description || "",
                location: jobData.location || "",
                salary: jobData.salary || "",
                jobType: jobData.jobType || "",
                experienceLevel: jobData.experienceLevel || "",
                skillsRequired: Array.isArray(jobData.skillsRequired)
                    ? jobData.skillsRequired.join(", ")
                    : jobData.skillsRequired || "",
                company: jobData.company?._id || jobData.company || ""
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to load job details");
        }
    };

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const jobData = {
                ...job,
                skillsRequired: job.skillsRequired
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
            };

            await api.put(
                `/jobs/${id}`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Job Updated");
            navigate("/recruiter/jobs");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update job");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <RecruiterSidebar />

            <div className="flex-1 p-5">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-600 text-lg">Loading job details...</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 shadow rounded max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl font-bold mb-5">
                            Edit Job
                        </h1>

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                        <input
                            name="title"
                            value={job.title}
                            placeholder="Job Title"
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded"
                            required
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={job.description}
                            placeholder="Description"
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded min-h-[120px]"
                            required
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                        <input
                            name="location"
                            value={job.location}
                            placeholder="Location"
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded"
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Salary (LKR)</label>
                        <input
                            name="salary"
                            value={job.salary}
                            placeholder="Salary"
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded"
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                        <select
                            name="jobType"
                            value={job.jobType}
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded bg-white"
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                        </select>

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level</label>
                        <select
                            name="experienceLevel"
                            value={job.experienceLevel}
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded bg-white"
                        >
                            <option value="">Select Experience Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                        </select>

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Skills Required (comma-separated)</label>
                        <input
                            type="text"
                            name="skillsRequired"
                            value={job.skillsRequired}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                            className="w-full border p-3 mb-3 rounded"
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                        <select
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            className="w-full border p-3 mb-3 rounded bg-white"
                            required
                        >
                            <option value="">
                                Select Company
                            </option>
                            {companies.map((company) => (
                                <option
                                    key={company._id}
                                    value={company._id}
                                >
                                    {company.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/recruiter/jobs")}
                                className="bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 transition"
                            >
                                Update Job
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditJob;
