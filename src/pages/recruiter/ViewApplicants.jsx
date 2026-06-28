import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function ViewApplicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        fetchApplicants();

    }, []);

    const fetchApplicants = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                `/application/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.put(

                `/application/status/${id}`,

                {
                    status
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            fetchApplicants();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <NavBar />

            <div className="max-w-6xl mx-auto mt-10">

                <h1 className="text-3xl font-bold mb-6">

                    Applicants

                </h1>

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">Name</th>

                            <th>Email</th>

                            <th>Status</th>

                            <th>Resume</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {applications.map((app) => (

                            <tr key={app._id}>

                                <td className="p-3">
                                    {app.applicant.name}
                                </td>

                                <td>
                                    {app.applicant.email}
                                </td>

                                <td>
                                    {app.status}
                                </td>

                                <td>

                                    <a
                                        href={`http://localhost:5000/${app.applicant.resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600"
                                    >
                                        View Resume
                                    </a>

                                </td>

                                <td>

                                    Pending

                                </td>

                                <td>

                                    <select
                                        defaultValue={app.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                app._id,
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded"
                                    >

                                        <option>Applied</option>

                                        <option>Under Review</option>

                                        <option>Shortlisted</option>

                                        <option>Interview</option>

                                        <option>Rejected</option>

                                        <option>Hired</option>

                                    </select>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default ViewApplicants;