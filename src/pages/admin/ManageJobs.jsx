import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const token = localStorage.getItem("token");

            // Since it's admin, they fetch all jobs
            const res = await api.get(
                "/jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setJobs(res.data);
            setFilteredJobs(res.data);

        } catch (error) {

            console.error("Error fetching jobs:", error);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = (e) => {

        const value = e.target.value;
        setSearch(value);

        const filtered = jobs.filter((j) =>
            j.title.toLowerCase().includes(value.toLowerCase()) ||
            j.location.toLowerCase().includes(value.toLowerCase()) ||
            (j.company && typeof j.company === "string" && j.company.toLowerCase().includes(value.toLowerCase())) ||
            (j.company && j.company.name && j.company.name.toLowerCase().includes(value.toLowerCase()))
        );

        setFilteredJobs(filtered);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/jobs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updated = jobs.filter((j) => j._id !== id);
            setJobs(updated);
            setFilteredJobs(
                updated.filter((j) =>
                    j.title.toLowerCase().includes(search.toLowerCase()) ||
                    j.location.toLowerCase().includes(search.toLowerCase())
                )
            );

            toast.success("Job Deleted Successfully");

        } catch (error) {

            console.error("Error deleting job:", error);
            toast.error("Failed to delete job");

        }

    };

    return (
        <>
            <NavBar />

            <div className="max-w-7xl mx-auto p-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                    <h1 className="text-4xl font-bold">
                        Job Management
                    </h1>

                    <input
                        type="text"
                        placeholder="Search jobs by title or location..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full md:w-80 border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                </div>

                {loading ? (

                    <div className="text-center py-10 text-gray-500">
                        Loading jobs...
                    </div>

                ) : filteredJobs.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">
                        No jobs found.
                    </div>

                ) : (

                    <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">

                        <table className="w-full">

                            <thead className="bg-gray-55 border-b border-gray-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Title
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Company
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Location
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Salary
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredJobs.map((j) => (

                                    <tr
                                        key={j._id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {j.title}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {j.company?.name || j.company || "N/A"}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {j.location}
                                        </td>

                                        <td className="p-4 text-gray-600 font-semibold text-green-600">
                                            Rs. {j.salary}
                                        </td>

                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(j._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

            </div>
        </>
    );
}

export default ManageJobs;
