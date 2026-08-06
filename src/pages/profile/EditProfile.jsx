import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import Loader from "../../components/Loader";

const formatSkillsForInput = (skills) => {
    if (Array.isArray(skills)) {
        return skills.join(", ");
    }

    return skills || "";
};

function EditProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const [form, setForm] = useState({
        bio: "",
        skills: "",
        education: "",
        experience: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserEmail(res.data.email || "");

            setForm({
                bio: res.data.bio || "",
                skills: formatSkillsForInput(res.data.skills),
                education: res.data.education || "",
                experience: res.data.experience || "",
            });
        } catch (error) {
            console.error("Error loading profile:", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const token = localStorage.getItem("token");
            const skills = form.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            await api.put(
                "/users/profile",
                {
                    bio: form.bio,
                    education: form.education,
                    experience: form.experience,
                    skills,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Profile updated");
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setUploading(true);

            const token = localStorage.getItem("token");

            await api.post("/users/resume", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Resume uploaded");
        } catch (error) {
            console.error("Error uploading resume:", error);
            toast.error("Failed to upload resume");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <NavBar />

            <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-6">
                        <Link
                            to="/profile"
                            className="text-sm font-semibold text-blue-700 transition hover:text-blue-500"
                        >
                            ← Back to profile
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                                Profile settings
                            </p>
                            <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                                Edit profile
                            </h1>
                            <p className="mt-3 text-sm text-slate-600">
                                Keep your details clear and up to date for better job matches.
                            </p>

                            {userEmail && (
                                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                    Signed in as <span className="font-semibold text-slate-900">{userEmail}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Write a short summary about yourself"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Education
                                        </label>
                                        <input
                                            name="education"
                                            value={form.education}
                                            onChange={handleChange}
                                            placeholder="e.g. BSc Computer Science"
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Experience
                                        </label>
                                        <input
                                            name="experience"
                                            value={form.experience}
                                            onChange={handleChange}
                                            placeholder="e.g. 2 years frontend development"
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Skills
                                    </label>
                                    <input
                                        name="skills"
                                        value={form.skills}
                                        onChange={handleChange}
                                        placeholder="React, Node.js, MongoDB"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                    <p className="mt-2 text-xs text-slate-500">
                                        Separate skills with commas.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Resume
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,application/pdf"
                                        onChange={handleResumeUpload}
                                        disabled={uploading}
                                        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
                                    />
                                    <p className="mt-2 text-xs text-slate-500">
                                        Upload a PDF or Word document.
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                                    <Link
                                        to="/profile"
                                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {saving ? "Saving..." : "Save changes"}
                                    </button>
                                </div>
                            </form>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default EditProfile;
