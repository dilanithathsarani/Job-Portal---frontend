import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Eye, X, Search, Users } from "lucide-react";
import { formatRole, normalizeRole } from "../../utils/roles";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            const normalizedUsers = res.data.users.map((user) => ({
                ...user,
                role: normalizeRole(user.role),
            }));

            setUsers(normalizedUsers);
            setFilteredUsers(normalizedUsers);

            // Persist legacy employee accounts as job seekers so the old role
            // is removed from future API responses as well.
            const legacyEmployeeUsers = res.data.users.filter(
                (user) => normalizeRole(user.role) === "jobseeker" && user.role !== "jobseeker",
            );

            if (legacyEmployeeUsers.length > 0) {
                const updates = await Promise.allSettled(
                    legacyEmployeeUsers.map((user) =>
                        api.put(`/users/${user._id}/role`, { role: "jobseeker" }),
                    ),
                );

                if (updates.some((update) => update.status === "rejected")) {
                    toast.error("Some legacy employee roles could not be updated");
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = users.filter(
            (u) =>
                u.name.toLowerCase().includes(value.toLowerCase()) ||
                u.email.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredUsers(filtered);
    };

    const handleDelete = async (id) => {
        const confirmed = await confirmToast("Are you sure you want to delete this user?");
        if (!confirmed) return;
        try {
            await api.delete(`/admin/users/${id}`);
            const updated = users.filter((u) => u._id !== id);
            setUsers(updated);
            setFilteredUsers(updated);
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await api.put(`/users/${id}/role`, { role: newRole });
            const updated = users.map((u) => u._id === id ? { ...u, role: newRole } : u);
            setUsers(updated);
            setFilteredUsers(updated);
            toast.success("Role updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role");
        }
    };

    const roleBadge = (role) => {
        const styles = {
            admin: "bg-red-50 text-red-600 border border-red-100",
            recruiter: "bg-indigo-50 text-indigo-600 border border-indigo-100",
            jobseeker: "bg-emerald-50 text-emerald-600 border border-emerald-100",
            employer: "bg-purple-50 text-purple-600 border border-purple-100",
        };
        return styles[normalizeRole(role)] || "bg-slate-50 text-slate-600 border border-slate-100";
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manage Users</h1>
                        <p className="text-slate-500 mt-1">Manage job seekers, employers and administrators.</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-xl px-5 py-3 border border-slate-100 flex items-center gap-3">
                        <Users size={20} className="text-indigo-600" />
                        <div>
                            <p className="text-xs text-slate-500">Total Users</p>
                            <p className="text-xl font-bold text-indigo-600">{users.length}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center gap-3">
                    <Search size={18} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full outline-none text-slate-700 placeholder-slate-400 text-sm bg-transparent"
                    />
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <Users size={48} className="text-slate-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700">No users found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search query.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">User</th>
                                        <th className="p-4 font-medium">Email</th>
                                        <th className="p-4 font-medium">Role</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                        {u.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-semibold text-slate-800">{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600 text-sm">{u.email}</td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${roleBadge(u.role)}`}>
                                                    {formatRole(u.role)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <select
                                                        value={normalizeRole(u.role)}
                                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                        className="border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-sm text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-slate-300 transition-colors"
                                                    >
                                                        <option value="jobseeker">Job Seeker</option>
                                                        <option value="recruiter">Recruiter</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <button
                                                        onClick={() => setSelectedUser(u)}
                                                        className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <Eye size={15} /> View
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(u._id)}
                                                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* User Detail Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl relative animate-in">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 transition-colors"
                            >
                                <X size={22} />
                            </button>

                            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
                                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    {selectedUser.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedUser.name}</h2>
                                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${roleBadge(selectedUser.role)}`}>
                                        {formatRole(selectedUser.role)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm">
                                {[
                                    { label: "Email", value: selectedUser.email },
                                    { label: "Education", value: selectedUser.education || "Not Added" },
                                    { label: "Experience", value: selectedUser.experience || "Not Added" },
                                    { label: "Skills", value: selectedUser.skills?.join(", ") || "Not Added" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex gap-3">
                                        <span className="text-slate-500 font-medium w-24 shrink-0">{label}</span>
                                        <span className="text-slate-800">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageUsers;
