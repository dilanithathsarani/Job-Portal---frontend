import { useEffect, useState, useRef } from "react";
import api from "../services/api";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {

        fetchNotifications();

        // Close dropdown when clicking outside
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const fetchNotifications = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await api.get(
                "/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(res.data);

        } catch (error) {

            console.error("Error fetching notifications:", error);

        }

    };

    const handleMarkAsRead = async (id) => {

        try {

            const token = localStorage.getItem("token");

            // Optional: call read notification endpoint if exists
            await api.put(
                `/notifications/${id}/read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update UI state
            setNotifications(
                notifications.map((n) =>
                    n._id === id ? { ...n, read: true } : n
                )
            );

        } catch (error) {

            // Fallback: If mark-as-read endpoint is not implemented, just update state locally
            setNotifications(
                notifications.map((n) =>
                    n._id === id ? { ...n, read: true } : n
                )
            );

        }

    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div
            className="relative"
            ref={dropdownRef}
        >
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 text-white hover:text-gray-200 transition focus:outline-none cursor-pointer"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>

                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn max-h-96 overflow-y-auto">

                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-700">
                            Notifications
                        </span>
                        {unreadCount > 0 && (
                            <span className="text-xs text-blue-500 font-semibold">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

                    {notifications.length === 0 ? (

                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                            No notifications yet
                        </div>

                    ) : (

                        <div className="divide-y divide-gray-55">
                            {notifications.map((n) => (

                                <div
                                    key={n._id}
                                    onClick={() => handleMarkAsRead(n._id)}
                                    className={`px-4 py-3 hover:bg-gray-50 transition cursor-pointer flex items-start gap-2.5 ${!n.read ? "bg-blue-50/30" : ""}`}
                                >
                                    <span className="text-lg">
                                        {n.message?.toLowerCase().includes("shortlisted") || n.message?.toLowerCase().includes("hired")
                                            ? "🎉"
                                            : n.message?.toLowerCase().includes("rejected")
                                            ? "❌"
                                            : "🔔"}
                                    </span>

                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700 leading-tight">
                                            {n.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : "Just now"}
                                        </p>
                                    </div>

                                    {!n.read && (
                                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                                    )}
                                </div>

                            ))}
                        </div>

                    )}

                </div>
            )}
        </div>
    );
}

export default NotificationBell;
