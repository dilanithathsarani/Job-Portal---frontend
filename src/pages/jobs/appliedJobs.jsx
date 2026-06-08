import { useEffect, useState } from "react";
import api from "../../services/api";

function AppliedJobs() {

    const [applications,
        setApplications] =
        useState([]);

    useEffect(() => {

        getApplications();

    }, []);

    const getApplications =
        async () => {

            const token =
                localStorage.getItem("token");

            const res =
                await api.get(
                    "/application/my-applications",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setApplications(res.data);

        };

    return (

        <div className="max-w-6xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">

                My Applications

            </h1>

            {
                applications.map((app) => (

                    <div
                        key={app._id}
                        className="border p-4 rounded mb-3"
                    >

                        <h2>
                            {app.job.title}
                        </h2>

                        <p>
                            Status:
                            {app.status}
                        </p>

                    </div>

                ))
            }

        </div>

    );
}

export default AppliedJobs;