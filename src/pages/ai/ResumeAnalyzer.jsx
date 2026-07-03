import { useState } from "react";
import api from "../../services/api";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const analyzeResume = async () => {

        if (!file) {
            alert("Please select a PDF resume.");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);

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

            setAnalysis(res.data.analysis);

        } catch (error) {

            console.log(error);

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
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                onClick={analyzeResume}
                className="bg-blue-600 text-white px-5 py-3 rounded mt-4"
            >
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

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