import { useState } from "react";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function CreateJob() {

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        experienceLevel: "",
        company: "",
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/jobs/create", job);
            alert("Job Created Successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create job");
            console.log(error);
        }
    };

    return (
        <>
            <NavBar />

            <div className="max-w-4xl mx-auto mt-10 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow rounded"
                >
                    <h1 className="text-3xl font-bold mb-5">
                        Create Job
                    </h1>

                    <input
                        name="title"
                        placeholder="Job Title"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                        rows={4}
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <input
                        name="salary"
                        placeholder="Salary"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <input
                        name="jobType"
                        placeholder="Full Time / Part Time"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <input
                        name="experienceLevel"
                        placeholder="Junior / Senior"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <input
                        name="company"
                        placeholder="Company ID"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-5 py-3 rounded"
                    >
                        Create Job
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreateJob;
