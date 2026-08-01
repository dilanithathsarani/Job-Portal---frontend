import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBriefcase, FaUsers, FaChartPie, FaChartBar } from 'react-icons/fa';
import api from '../../services/api';
import RecruiterSidebar from '../../components/recruiter/RecruiterSidebar';
import DashboardCard from '../../components/recruiter/DashboardCard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658', '#ef4444', '#10b981'];

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await api.get('/recruiter/analytics');
            setAnalyticsData(res.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex">
                <RecruiterSidebar />
                <div className="flex-1 bg-gray-50 min-h-screen flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-900"></div>
                </div>
            </div>
        );
    }

    if (!analyticsData) {
         return (
            <div className="flex">
                <RecruiterSidebar />
                <div className="flex-1 bg-gray-50 min-h-screen flex justify-center items-center">
                    <p className="text-xl text-gray-600">Failed to load analytics data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <RecruiterSidebar />
            <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Analytics Overview</h1>
                        <p className="text-gray-500 mt-2">Track your job postings and applicant engagement.</p>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <DashboardCard
                        title="Total Jobs Posted"
                        value={analyticsData.totalJobs}
                        icon={<FaBriefcase className="text-3xl opacity-80" />}
                        color="text-blue-600"
                        bg="bg-blue-50"
                    />
                    <DashboardCard
                        title="Total Applications"
                        value={analyticsData.totalApplications}
                        icon={<FaUsers className="text-3xl opacity-80" />}
                        color="text-green-600"
                        bg="bg-green-50"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Status Distribution Pie Chart */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <FaChartPie className="text-purple-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-800">Applications by Status</h2>
                        </div>
                        <div className="h-[350px]">
                            {analyticsData.statusData && analyticsData.statusData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={analyticsData.statusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={110}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {analyticsData.statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value) => [`${value} Applicants`, 'Count']}
                                            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">No application data available</div>
                            )}
                        </div>
                    </div>

                    {/* Applications per Job Bar Chart */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <FaChartBar className="text-indigo-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-800">Applications per Job</h2>
                        </div>
                        <div className="h-[350px]">
                             {analyticsData.applicationsPerJob && analyticsData.applicationsPerJob.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={analyticsData.applicationsPerJob}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis 
                                            dataKey="name" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            height={80} 
                                            tick={{fill: '#6b7280', fontSize: 12}}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            allowDecimals={false}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{fill: '#6b7280'}}
                                        />
                                        <Tooltip
                                            cursor={{fill: '#f9fafb'}}
                                            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="applications" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                             ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">No job data available</div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
