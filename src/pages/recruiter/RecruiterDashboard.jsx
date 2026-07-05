import { useEffect, useState } from "react";
import api from "../../services/api";

import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import DashboardCard from "../../components/recruiter/DashboardCard";

function RecruiterDashboard() {

    const [stats, setStats] = useState({

        totalJobs: 0,

        applications: 0,

        interviews: 0,

        shortlisted: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/recruiter/dashboard");

            setStats(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="flex">

            <RecruiterSidebar />

            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Recruiter Dashboard

                </h1>

                <div className="grid grid-cols-4 gap-6">

                    <DashboardCard

                        title="Jobs Posted"

                        value={stats.totalJobs}

                        color="text-blue-600"

                    />

                    <DashboardCard

                        title="Applications"

                        value={stats.applications}

                        color="text-green-600"

                    />

                    <DashboardCard

                        title="Interviews"

                        value={stats.interviews}

                        color="text-orange-600"

                    />

                    <DashboardCard

                        title="Shortlisted"

                        value={stats.shortlisted}

                        color="text-purple-600"

                    />

                </div>

                <div className="bg-white rounded-xl mt-10 p-6 shadow">

                    <h2 className="text-2xl font-bold mb-4">

                        Recent Jobs

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">Title</th>

                                <th>Applications</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td className="py-4">

                                    React Developer

                                </td>

                                <td className="text-center">

                                    15

                                </td>

                                <td className="text-center text-green-600">

                                    Active

                                </td>

                            </tr>

                            <tr>

                                <td className="py-4">

                                    Backend Developer

                                </td>

                                <td className="text-center">

                                    10

                                </td>

                                <td className="text-center text-green-600">

                                    Active

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default RecruiterDashboard;