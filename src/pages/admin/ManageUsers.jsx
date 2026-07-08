import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data);
            setFilteredUsers(res.data);

        } catch (error) {

            console.error("Error fetching users:", error);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = (e) => {

        const value = e.target.value;
        setSearch(value);

        const filtered = users.filter((u) =>
            u.name.toLowerCase().includes(value.toLowerCase()) ||
            u.email.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredUsers(filtered);

    };

    const handleDelete = async (id) => {

        const confirmed = await confirmToast(
            "Are you sure you want to delete this user?"
        );
        if (!confirmed) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updated = users.filter((u) => u._id !== id);
            setUsers(updated);
            setFilteredUsers(
                updated.filter((u) =>
                    u.name.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase())
                )
            );

            toast.success("User Deleted Successfully");

        } catch (error) {

            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");

        }

    };

    const handleRoleChange = async (id, newRole) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/users/${id}/role`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updated = users.map((u) =>
                u._id === id ? { ...u, role: newRole } : u
            );
            setUsers(updated);
            setFilteredUsers(
                updated.filter((u) =>
                    u.name.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase())
                )
            );

            toast.success("User role updated successfully");

        } catch (error) {

            console.error("Error updating user role:", error);
            toast.error("Failed to update user role");

        }

    };

    return (
        <>
            <AdminSidebar />

            <div className="max-w-7xl mx-auto p-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                    <h1 className="text-4xl font-bold">
                        User Management
                    </h1>

                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full md:w-80 border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                </div>

                {loading ? (

                    <div className="text-center py-10 text-gray-500">
                        Loading users...
                    </div>

                ) : filteredUsers.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">
                        No users found.
                    </div>

                ) : (

                    <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">

                        <table className="w-full">

                            <thead className="bg-gray-55 border-b border-gray-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Name
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Email
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Role
                                    </th>
                                    <th className="text-left p-4 font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((u) => (

                                    <tr
                                        key={u._id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {u.name}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {u.email}
                                        </td>

                                        <td className="p-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) =>
                                                    handleRoleChange(u._id, e.target.value)
                                                }
                                                className="border border-gray-250 p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            >
                                                <option value="jobseeker">Job Seeker</option>
                                                <option value="recruiter">Recruiter</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>

                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(u._id)}
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

export default ManageUsers;
