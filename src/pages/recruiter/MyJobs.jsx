import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

const MyJobs = () => {

    const [jobs, setJobs] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const res = await axios.get("/jobs/myjobs");

                console.log("My Jobs Response:", res.data);

                setJobs(res.data.jobs || []);

            }
            catch(error) {

                console.log(
                    error.response?.data || error.message
                );

                setJobs([]);

            }

        };


        fetchJobs();

    }, []);



    const deleteJob = async(id)=>{

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );


        if(!confirmDelete) return;


        try{

            await axios.delete(
                `/recruiter/jobs/${id}`
            );


            setJobs((previousJobs)=>
                previousJobs.filter(
                    job => job._id !== id
                )
            );


        }
        catch(error){

            console.log(error);

        }

    };



    return (

        <div className="flex min-h-screen bg-gray-100">


            {/* Sidebar */}

            <RecruiterSidebar />



            {/* Main Content */}

            <div className="flex-1 p-8">


                <h1 className="text-3xl font-bold mb-6">
                    My Jobs
                </h1>



                {
                    jobs.length === 0 ?

                    (
                        <p className="text-gray-600">
                            No jobs posted yet
                        </p>
                    )


                    :

                    (

                    <div className="grid gap-6">


                    {
                        jobs.map((job)=>(


                        <div
                        key={job._id}
                        className="
                        bg-white
                        shadow-md
                        rounded-xl
                        p-6
                        border
                        "
                        >


                            <h2 className="text-xl font-bold">
                                {job.title}
                            </h2>


                            <p>
                                🏢 {job.company?.name || "Company"}
                            </p>


                            <p>
                                📍 {job.location}
                            </p>


                            <p>
                                💼 {job.jobType}
                            </p>


                            <p>
                                💰 LKR {job.salary}
                            </p>


                            <p>
                                🎯 {job.experienceLevel}
                            </p>


                            <p className="text-gray-500">
                                Posted:
                                {" "}
                                {
                                new Date(job.createdAt)
                                .toLocaleDateString()
                                }
                            </p>



                            <div className="flex gap-3 mt-5">


                                <button
                                onClick={() =>
                                    navigate(
                                    `/recruiter/edit-job/${job._id}`
                                    )
                                }
                                className="
                                bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                "
                                >
                                    ✏️ Edit
                                </button>



                                <button
                                onClick={() =>
                                    deleteJob(job._id)
                                }
                                className="
                                bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                "
                                >
                                    🗑 Delete
                                </button>



                                <button
                                onClick={() =>
                                    navigate(
                                    `/recruiter/applicants/${job._id}`
                                    )
                                }
                                className="
                                bg-green-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                "
                                >
                                    👥 Applicants
                                </button>


                            </div>


                        </div>


                        ))
                    }


                    </div>

                    )

                }


            </div>


        </div>

    );

};


export default MyJobs;