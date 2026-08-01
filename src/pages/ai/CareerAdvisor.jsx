import { useState } from "react";
import toast from "react-hot-toast";
import NavBar from "../../components/navBar";
import api from "../../services/api";

const buildFallbackAdvice = (question) => {
    return [
        "Career Direction:",
        "Focus on a clear role target based on your question.",
        "",
        "Suggested Roadmap:",
        "1. Identify 3 core skills required for your target role.",
        "2. Build 1 portfolio project per skill.",
        "3. Practice interview questions weekly.",
        "",
        "Skills To Prioritize:",
        "- Technical fundamentals",
        "- Communication and presentation",
        "- Problem solving",
        "",
        "Project Ideas:",
        "- Build a project that solves a real business problem.",
        "- Add measurable impact in your project write-up.",
        "",
        "Interview Preparation:",
        "- Prepare STAR-format examples for achievements.",
        "- Practice explaining decisions and trade-offs.",
        "",
        `Your question was: ${question}`,
    ].join("\n");
};

function CareerAdvisor() {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (!question.trim()) {
            toast.error("Please enter a question.");

            return;

        }

        try {

            setLoading(true);
            setAnswer("");

            const res = await api.post(

                "/ai/career-advisor",

                {

                    question

                }

            );

            setAnswer(res.data.advice);
            toast.success("Advice generated");

        }

        catch (error) {

            console.log(error);
            setAnswer(buildFallbackAdvice(question));

        }

        finally {

            setLoading(false);

        }

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
                            Career advisor
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Ask a career question and get practical guidance on roadmap, skills, and interview preparation.
                        </p>

                        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Your question
                                </label>

                                <textarea
                                    rows={10}
                                    placeholder="Ask any career-related question..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <button
                                    onClick={askQuestion}
                                    disabled={loading}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Thinking..." : "Ask AI"}
                                </button>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Output
                                    </h2>
                                    <span className="text-sm text-slate-500">
                                        {answer ? "Ready" : "Waiting for input"}
                                    </span>
                                </div>

                                <textarea
                                    rows={14}
                                    value={answer}
                                    readOnly
                                    placeholder="Career advice will appear here."
                                    className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 leading-7 text-slate-700 outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </>

    );

}

export default CareerAdvisor;