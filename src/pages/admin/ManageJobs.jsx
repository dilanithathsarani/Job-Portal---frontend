import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase, MapPin, Building2, Trash2 } from "lucide-react";

import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import AdminSidebar from "../../components/admin/AdminSidebar";

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
      const res = await api.get("/admin/jobs");

      setJobs(res.data.jobs);

      setFilteredJobs(res.data.jobs);
    } catch (error) {
      console.error("Fetch jobs error:", error);

      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";

      const location = job.location?.toLowerCase() || "";

      const company = job.company?.name?.toLowerCase() || "";

      return (
        title.includes(value.toLowerCase()) ||
        location.includes(value.toLowerCase()) ||
        company.includes(value.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmToast(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/jobs/${id}`);

      const updated = jobs.filter((job) => job._id !== id);

      setJobs(updated);

      setFilteredJobs(updated);

      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Delete job error:", error);

      toast.error("Failed to delete job");
    }
  };

  return (
    <div
      className="
            min-h-screen
            bg-gray-100
        "
    >
      <AdminSidebar />

      <main
        className="
                ml-64
                p-8
            "
      >
        {/* Header */}

        <div
          className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    items-start
                    md:items-center
                    gap-5
                    mb-10
                "
        >
          <div>
            <h1
              className="
                            text-4xl
                            font-bold
                            text-gray-800
                        "
            >
              Manage Jobs
            </h1>

            <p
              className="
                            text-gray-500
                            mt-2
                        "
            >
              Manage all jobs posted on the platform
            </p>
          </div>

          <div
            className="
                        bg-white
                        shadow
                        rounded-2xl
                        px-6
                        py-4
                    "
          >
            <p
              className="
                            text-sm
                            text-gray-500
                        "
            >
              Total Jobs
            </p>

            <p
              className="
                            text-3xl
                            font-bold
                            text-blue-600
                        "
            >
              {jobs.length}
            </p>
          </div>
        </div>

        {/* Search Box */}

        <div
          className="
                    bg-white
                    shadow
                    rounded-2xl
                    p-5
                    mb-6
                "
        >
          <input
            type="text"
            placeholder="
                        Search by title, location or company...
                        "
            value={search}
            onChange={handleSearch}
            className="
                            w-full
                            md:w-96
                            border
                            border-gray-200
                            rounded-xl
                            px-5
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
          />
        </div>

        {loading ? (
          <div
            className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                    "
          >
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div
            className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                    "
          >
            No jobs found
          </div>
        ) : (
          <div
            className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        overflow-hidden
                    "
          >
            <table
              className="
                            w-full
                        "
            >
              <thead
                className="
                                bg-gray-900
                                text-white
                            "
              >
                <tr>
                  <th
                    className="
                                        p-5
                                        text-left
                                    "
                  >
                    Job Title
                  </th>

                  <th
                    className="
                                        p-5
                                        text-left
                                    "
                  >
                    Company
                  </th>

                  <th
                    className="
                                        p-5
                                        text-left
                                    "
                  >
                    Location
                  </th>

                  <th
                    className="
                                        p-5
                                        text-left
                                    "
                  >
                    Salary
                  </th>

                  <th
                    className="
                                        p-5
                                        text-center
                                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="
                                    border-b
                                    hover:bg-gray-50
                                    transition
                                "
                  >
                    <td
                      className="
                                        p-5
                                        font-semibold
                                    "
                    >
                      <div
                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                      >
                        <Briefcase
                          size={20}
                          className="
                                                text-blue-600
                                                "
                        />

                        {job.title}
                      </div>
                    </td>

                    <td
                      className="
                                        p-5
                                        text-gray-600
                                    "
                    >
                      <div
                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                      >
                        <Building2 size={18} />

                        {job.company?.name || "N/A"}
                      </div>
                    </td>

                    <td
                      className="
                                        p-5
                                        text-gray-600
                                    "
                    >
                      <div
                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                      >
                        <MapPin size={18} />

                        {job.location || "N/A"}
                      </div>
                    </td>

                    <td
                      className="
                                        p-5
                                        font-bold
                                        text-green-600
                                    "
                    >
                      Rs. {job.salary || 0}
                    </td>

                    <td
                      className="
                                        p-5
                                        text-center
                                    "
                    >
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="
                                            bg-red-500
                                            text-white
                                            p-3
                                            rounded-xl
                                            hover:bg-red-600
                                            transition
                                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageJobs;
