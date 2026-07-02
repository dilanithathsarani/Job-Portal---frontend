import { useState } from "react";
import toast from "react-hot-toast";
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
        company: ""
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

            const token =
                localStorage.getItem("token");

            await api.post(
                "/jobs/create",
                job,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success("Job Created");

        } catch (error) {

            console.log(error);
            toast.error("Failed to create job");

        }

    };

    return (
        <>
            <NavBar />

            <div className="max-w-4xl mx-auto mt-10">

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
                        className="w-full border p-3 mb-3"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="salary"
                        placeholder="Salary"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="jobType"
                        placeholder="Full Time"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="experienceLevel"
                        placeholder="Junior"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="company"
                        placeholder="Company ID"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <button
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