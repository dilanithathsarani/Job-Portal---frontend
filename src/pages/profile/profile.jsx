import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import Loader from "../../components/Loader";

const formatSkills = (skills) => {
    if (Array.isArray(skills)) {
        return skills.filter(Boolean);
    }

    if (typeof skills === "string" && skills.trim()) {
        return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
    }

    return [];
};

const getResumeUrl = (resume) => {
    if (!resume) return null;
    if (resume.startsWith("http")) return resume;
    return `http://localhost:5000/${resume}`;
};

function ProfileField({ label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-800">
                {value || "Not added yet"}
            </p>
        </div>
    );
}

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const skills = formatSkills(user?.skills);
    const resumeUrl = getResumeUrl(user?.resume);

    return (
        <>
            <NavBar />

            <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    {loading ? (
                        <Loader />
                    ) : !user ? (
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <p className="text-slate-600">Unable to load your profile.</p>
                        </section>
                    ) : (
                        <>
                            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-blue-900 px-6 py-8 text-white sm:px-8">
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-200">
                                                Your profile
                                            </p>
                                            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                                                {user.name}
                                            </h1>
                                            <p className="mt-2 text-sm text-slate-300">
                                                {user.email}
                                            </p>
                                            <span className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                                                {user.role || "jobseeker"}
                                            </span>
                                        </div>

                                        <Link
                                            to="/profile/edit"
                                            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                                        >
                                            Edit profile
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="mb-8">
                                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                            About
                                        </h2>
                                        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                                            {user.bio || "Add a short bio to help recruiters understand your background."}
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <ProfileField label="Education" value={user.education} />
                                        <ProfileField label="Experience" value={user.experience} />
                                    </div>

                                    <div className="mt-8">
                                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                            Skills
                                        </h2>

                                        {skills.length > 0 ? (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="mt-3 text-sm text-slate-500">
                                                No skills added yet.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                                    Resume
                                                </h2>
                                                <p className="mt-2 text-sm text-slate-600">
                                                    {resumeUrl
                                                        ? "Your resume is attached to your profile."
                                                        : "Upload a resume from the edit profile page."}
                                                </p>
                                            </div>

                                            {resumeUrl && (
                                                <a
                                                    href={resumeUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                                                >
                                                    View resume
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Link
                                    to="/applied-jobs"
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                >
                                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                                        Applications
                                    </p>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Track jobs you have already applied to.
                                    </p>
                                </Link>

                                <Link
                                    to="/jobs"
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                >
                                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                                        Browse jobs
                                    </p>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Find new roles that match your profile.
                                    </p>
                                </Link>
                            </section>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Profile;
