import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const analyzeResume = async () => {

        if (!file) {
            toast.error("Please select a PDF resume.");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);
        setError("");
        setAnalysis("");

        try {

            setLoading(true);

            const res = await api.post(
                "/ai/analyze-resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const analysisText =
                res.data.analysis ||
                res.data.result ||
                res.data.message ||
                "No analysis was returned by the server.";

            setAnalysis(analysisText);
            toast.success("Resume analyzed successfully");

        } catch (error) {

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to analyze resume";

            setError(message);
            toast.error(message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-5xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-6">

                AI Resume Analyzer

            </h1>

            <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full max-w-md rounded border border-gray-300 px-3 py-2"
            />

            {file && (
                <p className="mt-2 text-sm text-gray-600">
                    Selected file: {file.name}
                </p>
            )}

            <button
                type="button"
                onClick={analyzeResume}
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-3 rounded mt-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {error && (
                <p className="mt-4 text-sm text-red-600">
                    {error}
                </p>
            )}

            <textarea
                rows={20}
                value={analysis}
                readOnly
                className="w-full border p-4 mt-6 rounded"
            />

        </div>

    );

}

export default ResumeAnalyzer;