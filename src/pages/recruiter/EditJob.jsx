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

            toast.success("Job Updated Successfully!");
            navigate("/recruiter/jobs");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update job");
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 flex justify-between items-center border-b border-slate-200 pb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                        Edit Job Posting
                                    </h1>
                                    <p className="text-slate-500 mt-1">Update the details for this position.</p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="bg-white p-8 shadow-sm rounded-2xl border border-slate-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
                                        <input
                                            name="title"
                                            value={job.title}
                                            placeholder="e.g. Senior React Developer"
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                                        <select
                                            name="company"
                                            value={job.company}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                            required
                                        >
                                            <option value="">Select a Company</option>
                                            {companies.map((company) => (
                                                <option key={company._id} value={company._id}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description *</label>
                                        <textarea
                                            name="description"
                                            value={job.description}
                                            placeholder="Describe the responsibilities, requirements, and benefits..."
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[150px]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                        <input
                                            name="location"
                                            value={job.location}
                                            placeholder="e.g. Colombo, Remote"
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Salary (LKR)</label>
                                        <input
                                            name="salary"
                                            value={job.salary}
                                            placeholder="e.g. 150000 - 250000"
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
                                        <select
                                            name="jobType"
                                            value={job.jobType}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select Job Type</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
                                        <select
                                            name="experienceLevel"
                                            value={job.experienceLevel}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select Experience Level</option>
                                            <option value="Entry Level">Entry Level</option>
                                            <option value="Mid Level">Mid Level</option>
                                            <option value="Senior Level">Senior Level</option>
                                        </select>
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Skills Required</label>
                                        <input
                                            type="text"
                                            name="skillsRequired"
                                            value={job.skillsRequired}
                                            onChange={handleChange}
                                            placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Separate each skill with a comma.</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/recruiter/jobs")}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-sm shadow-indigo-200"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditJob;
