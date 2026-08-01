import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Users, UserRoundCheck, Briefcase, FileText, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import {
    BarChart, Bar, PieChart, Pie, Cell,
    Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../services/api";
import { normalizeRole } from "../../utils/roles";

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function Dashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobSeekers: 0,
        totalJobs: 0,
        totalApplications: 0,
        applicationStatus: [],
        userRoles: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/admin/dashboard");
            const data = res.data.data;
            const userRoles = (data.userRoles || []).reduce((roles, entry) => {
                const role = normalizeRole(entry._id);
                const existingRole = roles.find((item) => item._id === role);

                if (existingRole) {
                    existingRole.count += entry.count;
                } else {
                    roles.push({ ...entry, _id: role });
                }

                return roles;
            }, []);

            const totalJobSeekers = userRoles.find((entry) => entry._id === "jobseeker")?.count || 0;
            setStats({ ...data, userRoles, totalJobSeekers });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        { title: "Total Users", value: stats.totalUsers, icon: <Users size={22} />, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Job Seekers", value: stats.totalJobSeekers, icon: <UserRoundCheck size={22} />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Total Jobs", value: stats.totalJobs, icon: <Briefcase size={22} />, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Applications", value: stats.totalApplications, icon: <FileText size={22} />, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    const quickActions = [
        { label: "Manage Users", path: "/admin/users", color: "text-blue-600", bg: "bg-blue-50", hoverBg: "hover:bg-blue-100" },
        { label: "Manage Jobs", path: "/admin/jobs", color: "text-purple-600", bg: "bg-purple-50", hoverBg: "hover:bg-purple-100" },
        { label: "View Applications", path: "/admin/applications", color: "text-emerald-600", bg: "bg-emerald-50", hoverBg: "hover:bg-emerald-100" },
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage your job portal platform efficiently.</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-xl px-4 py-3 flex items-center gap-3 border border-slate-100">
                        <ShieldCheck className="text-indigo-600" size={22} />
                        <div>
                            <p className="text-xs text-slate-500">Logged in as</p>
                            <p className="font-bold text-slate-800 text-sm">Administrator</p>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-slate-500 font-medium text-sm">{card.title}</h3>
                                <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
                                    {card.icon}
                                </div>
                            </div>
                            <h2 className={`text-4xl font-bold ${card.color}`}>{loading ? "—" : card.value}</h2>
                        </div>
                    ))}
                </div>

                {/* Charts + Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Charts side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Users Distribution Pie */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-indigo-50 rounded-xl">
                                    <TrendingUp className="text-indigo-600" size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">Users Distribution</h2>
                            </div>
                            <div className="h-[260px]">
                                {stats.userRoles.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stats.userRoles}
                                                dataKey="count"
                                                nameKey="_id"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={90}
                                                innerRadius={50}
                                                paddingAngle={4}
                                                label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {stats.userRoles.map((entry, index) => (
                                                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value, name) => [value, name]}
                                                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                            />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-400">No user data available</div>
                                )}
                            </div>
                        </div>

                        {/* Application Status Bar Chart */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-emerald-50 rounded-xl">
                                    <FileText className="text-emerald-600" size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">Application Status</h2>
                            </div>
                            <div className="h-[260px]">
                                {stats.applicationStatus.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={stats.applicationStatus} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                                            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                                            <Tooltip
                                                cursor={{ fill: "#f9fafb" }}
                                                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                            />
                                            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-400">No application data available</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit">
                        <h2 className="text-lg font-bold text-slate-800 mb-5">Quick Actions</h2>
                        <div className="space-y-3">
                            {quickActions.map((action) => (
                                <button
                                    key={action.path}
                                    onClick={() => navigate(action.path)}
                                    className={`w-full flex items-center justify-between ${action.bg} ${action.hoverBg} ${action.color} font-semibold px-4 py-3.5 rounded-xl transition-all text-sm`}
                                >
                                    {action.label}
                                    <ArrowRight size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
