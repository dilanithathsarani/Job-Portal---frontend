import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function Profile() {

    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        bio: "",
        skills: "",
        education: "",
        experience: ""
    });

    useEffect(() => {

        getProfile();

    }, []);

    const getProfile = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res =
                await api.get(
                    "/users/profile",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setUser(res.data);

            setForm({
                bio: res.data.bio || "",
                skills: res.data.skills || "",
                education: res.data.education || "",
                experience: res.data.experience || ""
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await api.put(
                "/users/profile",
                form,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setEditing(false);
            getProfile();
            toast.success("Profile Updated");

        } catch (error) {

            console.log(error);
            toast.error("Failed to update profile");

        }

    };

    if (!user)
        return <h2>Loading...</h2>;

    return (
        <>
            <NavBar />

            <div className="max-w-4xl mx-auto mt-10">

                <div className="bg-white p-6 shadow rounded">

                    <h1 className="text-3xl font-bold mb-4">

                        Profile

                    </h1>

                    <p>
                        <strong>Name: </strong>
                        {user.name}
                    </p>

                    <p>
                        <strong>Email: </strong>
                        {user.email}
                    </p>

                    {editing ? (

                        <div className="mt-4 space-y-4">

                            <div>
                                <label className="font-semibold block mb-1">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">
                                    Skills
                                </label>
                                <input
                                    name="skills"
                                    value={form.skills}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded"
                                    placeholder="e.g. React, Node.js, MongoDB"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">
                                    Education
                                </label>
                                <input
                                    name="education"
                                    value={form.education}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded"
                                    placeholder="e.g. BSc in Computer Science"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">
                                    Experience
                                </label>
                                <textarea
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded"
                                    rows={3}
                                    placeholder="e.g. 2 years at XYZ Company"
                                />
                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-5 py-2 rounded"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditing(false)}
                                    className="bg-gray-400 text-white px-5 py-2 rounded"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="mt-4 space-y-2">

                            <p>
                                <strong>Bio: </strong>
                                {user.bio || "Not set"}
                            </p>

                            <p>
                                <strong>Skills: </strong>
                                {user.skills || "Not set"}
                            </p>

                            <p>
                                <strong>Education: </strong>
                                {user.education || "Not set"}
                            </p>

                            <p>
                                <strong>Experience: </strong>
                                {user.experience || "Not set"}
                            </p>

                            {user.resume && (
                                <p>
                                    <strong>Resume: </strong>
                                    <a
                                        href={user.resume.startsWith("http") ? user.resume : `http://localhost:5000/${user.resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                </p>
                            )}

                            <button
                                onClick={() => setEditing(true)}
                                className="bg-blue-600 text-white px-5 py-2 rounded mt-3"
                            >
                                Edit Profile
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </>

    );
}

export default Profile;
