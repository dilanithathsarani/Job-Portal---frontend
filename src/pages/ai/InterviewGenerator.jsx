import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import Navbar from "../../components/navBar";

const buildFallbackQuestions = (title) => {

    const role = title.trim();

    return [
        `Tell us about your experience as a ${role}.`,
        `What do you consider the most important skills for a ${role}?`,
        `Describe a project where you solved a difficult problem related to ${role}.`,
        `How do you stay current with best practices in ${role}?`,
        `How do you handle feedback or changing requirements in a ${role} role?`,
        `What tools or technologies do you use most often as a ${role}?`,
        `How do you prioritize tasks when working on multiple ${role} responsibilities?`,
        `Why are you interested in this ${role} opportunity?`,
    ].join("\n\n");

};

function InterviewGenerator() {

    const [jobTitle, setJobTitle] = useState("");

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const generateQuestions = async () => {

        if (!jobTitle.trim()) {
            toast.error("Please enter a job title.");
            return;
        }

        try {

            setLoading(true);
            setQuestions("");

            const res = await api.post(
                "/ai/interview",
                {
                    jobTitle,
                }
            );

            setQuestions(res.data.result);
            toast.success("Interview questions generated");

        } catch (error) {

            console.log(error);
            setQuestions(buildFallbackQuestions(jobTitle));

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
                            Interview question generator
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Enter a job title and get a focused set of interview questions to help you prepare with less noise and more clarity.
                        </p>

                        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Job title
                                </label>
                                <input
                                    type="text"
                                    placeholder="React Developer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <p className="mt-3 text-sm text-slate-500">
                                    Example: Frontend Developer, Data Analyst, Product Manager.
                                </p>

                                <button
                                    onClick={generateQuestions}
                                    disabled={loading}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Generating..." : "Generate questions"}
                                </button>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Output
                                    </h2>
                                    <span className="text-sm text-slate-500">
                                        {questions ? "Ready" : "Waiting for input"}
                                    </span>
                                </div>

                                <textarea
                                    rows={14}
                                    value={questions}
                                    readOnly
                                    placeholder="Generated interview questions will appear here."
                                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-4 leading-7 text-slate-700 outline-none resize-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </>

    );

}

export default InterviewGenerator;