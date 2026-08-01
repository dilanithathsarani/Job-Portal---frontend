import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";

function CoverLetter() {

    const [company, setCompany] = useState("");

    const [position, setPosition] = useState("");

    const [skills, setSkills] = useState("");

    const [experience, setExperience] = useState("");

    const [coverLetter, setCoverLetter] = useState("");

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const generateLetter = async () => {

        if (!company.trim() || !position.trim() || !skills.trim() || !experience.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);
            setCoverLetter("");

            const res = await api.post(

                "/ai/cover-letter",

                {

                    company,

                    position,

                    skills,

                    experience

                }

            );

            setCoverLetter(res.data.coverLetter);
            setIsEditing(false);
            toast.success("Cover letter generated");

        }

        catch (error) {

            console.log(error);
            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to generate cover letter."
            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleDownload = () => {

        if (!coverLetter.trim()) {
            toast.error("Generate a cover letter first.");
            return;
        }

        const blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "cover-letter.txt";
        link.click();

        URL.revokeObjectURL(url);

    };

    return (

        <>

            <NavBar />

            <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                            AI tools
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                            Cover letter generator
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Provide a few role details and get a professional cover letter draft you can edit, copy, and download.
                        </p>

                        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <label className="mb-2 mt-4 block text-sm font-semibold text-slate-700">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    placeholder="Position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <label className="mb-2 mt-4 block text-sm font-semibold text-slate-700">
                                    Skills
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Key skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <label className="mb-2 mt-4 block text-sm font-semibold text-slate-700">
                                    Experience
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Briefly describe your experience"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <button
                                    onClick={generateLetter}
                                    disabled={loading}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Generating..." : "Generate cover letter"}
                                </button>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Output
                                    </h2>
                                    <span className="text-sm text-slate-500">
                                        {coverLetter ? "Ready" : "Waiting for input"}
                                    </span>
                                </div>

                                <textarea
                                    rows={14}
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    readOnly={!isEditing}
                                    placeholder="Generated cover letter will appear here."
                                    className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 leading-7 text-slate-700 outline-none"
                                />

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing((current) => !current)}
                                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                                    >
                                        {isEditing ? "Save" : "Edit"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!coverLetter.trim()) {
                                                toast.error("Generate a cover letter first.");
                                                return;
                                            }
                                            navigator.clipboard.writeText(coverLetter);
                                            toast.success("Copied to clipboard");
                                        }}
                                        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                                    >
                                        Copy
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDownload}
                                        className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </>

    );

}

export default CoverLetter;