import { useState } from "react";
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

        try {

            setLoading(true);

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

        }

        catch (error) {

            console.log(error);

            alert("Failed to generate cover letter.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleDownload = () => {

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

            <div className="max-w-5xl mx-auto mt-10">

                <h1 className="text-4xl font-bold mb-8">

                    AI Cover Letter Generator

                </h1>

                <div className="space-y-4">

                    <input

                        type="text"

                        placeholder="Company"

                        value={company}

                        onChange={(e)=>setCompany(e.target.value)}

                        className="w-full border p-3 rounded"

                    />

                    <input

                        type="text"

                        placeholder="Position"

                        value={position}

                        onChange={(e)=>setPosition(e.target.value)}

                        className="w-full border p-3 rounded"

                    />

                    <textarea

                        rows={4}

                        placeholder="Skills"

                        value={skills}

                        onChange={(e)=>setSkills(e.target.value)}

                        className="w-full border p-3 rounded"

                    />

                    <textarea

                        rows={5}

                        placeholder="Experience"

                        value={experience}

                        onChange={(e)=>setExperience(e.target.value)}

                        className="w-full border p-3 rounded"

                    />

                    <button

                        onClick={generateLetter}

                        className="bg-blue-600 text-white px-6 py-3 rounded"

                    >

                        {

                            loading

                            ?

                            "Generating..."

                            :

                            "Generate Cover Letter"

                        }

                    </button>

                </div>

                {

                    coverLetter && (

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold mb-4">

                                Generated Cover Letter

                            </h2>

                            <textarea

                                rows={18}

                                value={coverLetter}

                                onChange={(e) => setCoverLetter(e.target.value)}

                                readOnly={!isEditing}

                                className="w-full border p-4 rounded"

                            />

                            <div className="flex gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing((current) => !current)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {isEditing ? "Save" : "Edit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigator.clipboard.writeText(coverLetter)}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Copy
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDownload}
                                    className="bg-gray-700 text-white px-4 py-2 rounded"
                                >
                                    Download Cover Letter
                                </button>
                            </div>

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default CoverLetter;