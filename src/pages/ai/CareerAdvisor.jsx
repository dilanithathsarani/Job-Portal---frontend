import { useState } from "react";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function CareerAdvisor() {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (!question.trim()) {

            alert("Please enter a question.");

            return;

        }

        try {

            setLoading(true);

            const res = await api.post(

                "/ai/career-advisor",

                {

                    question

                }

            );

            setAnswer(res.data.advice);

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <NavBar />

            <div className="max-w-5xl mx-auto mt-10">

                <h1 className="text-4xl font-bold mb-6">

                    AI Career Advisor

                </h1>

                <textarea

                    rows={5}

                    placeholder="Ask any career-related question..."

                    value={question}

                    onChange={(e)=>setQuestion(e.target.value)}

                    className="w-full border rounded p-4"

                />

                <button

                    onClick={askQuestion}

                    className="bg-blue-600 text-white px-6 py-3 rounded mt-4"

                >

                    {

                        loading

                        ?

                        "Thinking..."

                        :

                        "Ask AI"

                    }

                </button>

                {

                    answer && (

                        <div className="mt-8">

                            <h2 className="text-2xl font-semibold mb-3">

                                AI Response

                            </h2>

                            <textarea

                                rows={18}

                                value={answer}

                                readOnly

                                className="w-full border rounded p-4"

                            />

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default CareerAdvisor;