import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import toast from "react-hot-toast";
import { confirmToast } from "../../utils/confirmToast";
import { publishJobDeleted, subscribeToJobDeletions } from "../../utils/jobEvents";
import { FaBuilding, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaStar, FaEdit, FaTrash, FaUsers } from "react-icons/fa";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("/jobs/myjobs");
                console.log("My Jobs Response:", res.data);
                setJobs(res.data.jobs || []);
            }
            catch(error) {
                console.log(error.response?.data || error.message);
                setJobs([]);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => subscribeToJobDeletions((jobId) => {
        setJobs((currentJobs) => currentJobs.filter((job) => job._id !== jobId));
    }), []);

    const deleteJob = async(id)=>{
        const confirmed = await confirmToast("Are you sure you want to delete this job?");
        if(!confirmed) return;

        try{
            await axios.delete(`/jobs/${id}`);
            setJobs((previousJobs) => previousJobs.filter(job => job._id !== id));
            publishJobDeleted(id);
            toast.success("Job deleted successfully");
        }
        catch(error){
            console.log(error);
            toast.error("Failed to delete job");
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        My Jobs
                    </h1>
                    <p className="text-slate-500 mt-1">Manage and track the jobs you have posted.</p>
                </div>

                {jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="bg-indigo-50 p-6 rounded-full mb-4">
                            <FaBriefcase className="text-4xl text-indigo-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700">No jobs posted yet</h3>
                        <p className="text-slate-500 mt-2 mb-6 max-w-md">You haven't posted any jobs. Create your first job posting to start receiving applications.</p>
                        <button 
                            onClick={() => navigate("/recruiter/create-job")}
                            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Create Job
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-2xl border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
                            >
                                {/* Decorative gradient top border */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-slate-800 line-clamp-2">
                                        {job.title}
                                    </h2>
                                    <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ml-3">
                                        {job.jobType}
                                    </span>
                                </div>

                                <div className="space-y-3 flex-1 mb-6">
                                    <div className="flex items-center text-slate-600">
                                        <FaBuilding className="mr-3 text-slate-400" />
                                        <span className="truncate">{job.company?.name || "Company"}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600">
                                        <FaMapMarkerAlt className="mr-3 text-slate-400" />
                                        <span className="truncate">{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600">
                                        <FaMoneyBillWave className="mr-3 text-slate-400" />
                                        <span>LKR {job.salary}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600">
                                        <FaStar className="mr-3 text-slate-400" />
                                        <span>{job.experienceLevel}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 mt-auto">
                                    <p className="text-xs text-slate-400 mb-4 font-medium">
                                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                                            className="flex items-center justify-center flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-medium transition-colors text-sm border border-slate-200"
                                        >
                                            <FaEdit className="mr-2 text-slate-500" /> Edit
                                        </button>

                                        <button
                                            onClick={() => deleteJob(job._id)}
                                            className="flex items-center justify-center flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-medium transition-colors text-sm border border-red-100"
                                        >
                                            <FaTrash className="mr-2 text-red-400" /> Delete
                                        </button>

                                        <button
                                            onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                                            className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm mt-1"
                                        >
                                            <FaUsers className="mr-2" /> View Applicants
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
