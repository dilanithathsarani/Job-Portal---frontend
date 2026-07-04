import { useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/navBar";

function InterviewGenerator() {

    const [jobTitle, setJobTitle] = useState("");

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const generateQuestions = async () => {

        try {

            setLoading(true);

            const res = await api.post(
                "/ai/interview",
                {
                    jobTitle
                }
            );

            setQuestions(res.data.result);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
        
        <Navbar/>

        <div className="max-w-4xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-5">

                AI Interview Generator

            </h1>

            <input
                type="text"
                placeholder="React Developer"
                value={jobTitle}
                onChange={(e)=>setJobTitle(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />

            <button
                onClick={generateQuestions}
                className="bg-blue-600 text-white px-5 py-3 rounded"
            >
                {loading ? "Generating..." : "Generate"}
            </button>

            <textarea
                rows={15}
                value={questions}
                readOnly
                className="w-full border p-4 rounded mt-5"
            />

        </div>

        </>

    );

}

export default InterviewGenerator;