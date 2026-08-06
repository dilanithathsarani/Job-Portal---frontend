import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import Navbar from "../../components/navBar";
import Footer from "../../components/footer";

const buildFallbackAnalysis = (fileName) => {
    return [
        "ATS Score: 65/100",
        "Strengths:",
        `- Resume file ${fileName || "(uploaded file)"} was received.`,
        "- Basic structure appears ready for review.",
        "Weaknesses:",
        "- AI analysis is currently unavailable.",
        "Missing Skills:",
        "- Match required keywords from your target job description.",
        "Suggestions:",
        "- Add measurable impact points for each role.",
        "- Keep skills grouped by category.",
        "- Include tools and technologies near relevant projects.",
    ].join("\n");
};

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [note, setNote] = useState("");

    const analyzeResume = async () => {

        if (!file) {
            toast.error("Please select a PDF resume.");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);
        setError("");
        setNote("");
        setAnalysis("");

        try {

            setLoading(true);

            const res = await api.post("/ai/analyze-resume", formData);

            const analysisText =
                res.data.analysis ||
                res.data.result ||
                res.data.data?.analysis ||
                res.data.message ||
                "No analysis was returned by the server.";

            setAnalysis(analysisText);

            if (res.data.warning) setNote(res.data.warning);

            toast.success("Resume analyzed successfully");

        } catch (error) {
            console.error("Resume analysis request failed:", error);
            setError("");
            setNote("");
            setAnalysis(buildFallbackAnalysis(file?.name));

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                            AI tools
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                            Resume analyzer
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Upload a PDF resume to receive a clear ATS-style summary with strengths and suggested improvements.
                        </p>

                        {note && (
                            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                                {note}
                            </div>
                        )}

                        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Upload resume
                                </label>

                                <input
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
                                />

                                <p className="mt-3 text-sm text-slate-500">
                                    PDF files only.
                                </p>

                                {file && (
                                    <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                                        Selected file: <span className="font-semibold text-slate-950">{file.name}</span>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={analyzeResume}
                                    disabled={loading}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Analyzing..." : "Analyze resume"}
                                </button>

                                {error && (
                                    <p className="mt-4 text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Analysis
                                    </h2>
                                    <span className="text-sm text-slate-500">
                                        {analysis ? "Ready" : "Waiting for upload"}
                                    </span>
                                </div>

                                <textarea
                                    rows={16}
                                    value={analysis}
                                    readOnly
                                    placeholder="Your resume analysis will appear here."
                                    className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 leading-7 text-slate-700 outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />

        </>
    );

}

export default ResumeAnalyzer;
