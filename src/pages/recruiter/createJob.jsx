import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RecruiterSideBar from "../../components/recruiter/RecruiterSidebar";
import api from "../../services/api";

function CreateJob() {

     const [companies, setCompanies] = useState([]);

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
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/company/my-companies",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCompanies(res.data.companies);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load companies");

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

            const token =
                localStorage.getItem("token");

                const jobData = {
                ...job,
                skillsRequired: job.skillsRequired
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
            };

            await api.post(
                "/jobs/create",
                jobData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success("Job Created");

             setJob({
                title: "",
                description: "",
                location: "",
                salary: "",
                jobType: "",
                experienceLevel: "",
                skillsRequired: "",
                company: ""
            });


        } catch (error) {

            console.log(error);
            toast.error("Failed to create job");

        }

    };

    return (
        <>
         
    <div className="flex min-h-screen bg-gray-100">

        <RecruiterSideBar />

        <div className="flex-1 p-5">

            

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow rounded"
                >

                    <h1 className="text-3xl font-bold mb-5">
                        Create Job
                    </h1>

                    <input
                        name="title"
                        value={job.title}
                        placeholder="Job Title"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                        required
                    />

                    <textarea
                        name="description"
                        value={job.description}
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                        required
                    />

                    <input
                        name="location"
                        value={job.location}
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="salary"
                        value={job.salary}
                        placeholder="Salary"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <select
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    >
                        <option value="">Select Job Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                    </select>

                    <select
                        name="experienceLevel"
                        value={job.experienceLevel}
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    >
                        <option value="">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                    </select>

                    <input
                            type="text"
                            name="skillsRequired"
                            value={job.skillsRequired}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                            className="w-full border p-3 mb-3"
                        />

                    <select
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            className="w-full border p-3 mb-3"
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

                    <button
                        className="bg-green-600 text-white px-5 py-3 rounded"
                    >
                        Create Job
                    </button>

                </form>

            </div>
        </div>
    
        </>
    );
}

export default CreateJob;