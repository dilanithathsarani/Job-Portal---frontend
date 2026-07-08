import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    User,
    Briefcase,
    Building2,
    MapPin,
    FileText
} from "lucide-react";

import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";


function ManageApplications() {


    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);





    useEffect(() => {

        fetchApplications();

    }, []);





    const fetchApplications = async () => {

        try {


            const res =
            await api.get(
                "/admin/applications"
            );


            setApplications(
                res.data.applications
            );


        } catch(error) {


            console.error(error);

            toast.error(
                "Failed to load applications"
            );


        } finally {

            setLoading(false);

        }

    };







    const updateStatus = async(id,status)=>{


        try {


            await api.put(
                `/admin/applications/${id}`,
                {
                    status
                }
            );



            setApplications(
                applications.map((app)=>

                    app._id === id

                    ?

                    {
                        ...app,
                        status
                    }

                    :

                    app

                )
            );



            toast.success(
                "Application status updated"
            );


        } catch(error) {


            console.error(error);

            toast.error(
                "Failed to update status"
            );

        }


    };








    return (

        <div className="
            min-h-screen
            bg-gray-100
        ">


            <AdminSidebar />



            <main className="
                ml-64
                p-8
            ">



                <div className="
                    mb-8
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                        text-gray-800
                    ">
                        Manage Applications
                    </h1>


                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Review and manage job applications
                    </p>


                </div>







                {
                    loading ?


                    (

                    <div className="
                        bg-white
                        rounded-xl
                        p-10
                        text-center
                        text-gray-500
                    ">

                        Loading applications...

                    </div>

                    )



                    : applications.length === 0 ?


                    (

                    <div className="
                        bg-white
                        rounded-xl
                        p-10
                        text-center
                        text-gray-500
                    ">

                        No applications found

                    </div>

                    )



                    :



                    (

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        overflow-hidden
                    ">


                    <table className="
                        w-full
                    ">


                        <thead className="
                            bg-gray-900
                            text-white
                        ">


                            <tr>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Applicant
                                </th>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Job
                                </th>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Company
                                </th>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Status
                                </th>


                            </tr>


                        </thead>






                        <tbody>


                        {
                        applications.map((app)=>(


                            <tr
                            key={app._id}

                            className="
                                border-b
                                hover:bg-gray-50
                            "
                            >



                                {/* Applicant */}

                                <td className="
                                    p-5
                                ">


                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">


                                        <User
                                            className="
                                            text-blue-600
                                            "
                                        />


                                        <div>


                                            <p className="
                                                font-semibold
                                            ">

                                                {
                                                app.applicant?.name
                                                ||
                                                "N/A"
                                                }

                                            </p>


                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">

                                                {
                                                app.applicant?.email
                                                ||
                                                "N/A"
                                                }

                                            </p>


                                        </div>


                                    </div>


                                </td>









                                {/* Job */}

                                <td className="
                                    p-5
                                ">


                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">


                                        <Briefcase
                                            className="
                                            text-purple-600
                                            "
                                        />


                                        <div>


                                            <p className="
                                                font-semibold
                                            ">

                                            {
                                            app.job?.title
                                            ||
                                            "N/A"
                                            }

                                            </p>


                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">


                                            {
                                            app.job?.location
                                            ||
                                            "N/A"
                                            }


                                            </p>


                                        </div>


                                    </div>


                                </td>








                                {/* Company */}

                                <td className="
                                    p-5
                                ">


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">


                                        <Building2
                                            size={18}
                                        />


                                        {
                                        app.job?.company?.name
                                        ||
                                        "N/A"
                                        }


                                    </div>


                                </td>









                                {/* Status */}


                                <td className="
                                    p-5
                                ">


                                    <select

                                    value={app.status}

                                    onChange={(e)=>
                                        updateStatus(
                                            app._id,
                                            e.target.value
                                        )
                                    }


                                    className="
                                        border
                                        rounded-lg
                                        p-2
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "

                                    >


                                        <option>
                                            Applied
                                        </option>


                                        <option>
                                            Under Review
                                        </option>


                                        <option>
                                            Shortlisted
                                        </option>


                                        <option>
                                            Interview
                                        </option>


                                        <option>
                                            Rejected
                                        </option>


                                        <option>
                                            Hired
                                        </option>



                                    </select>


                                </td>





                            </tr>


                        ))
                        }



                        </tbody>



                    </table>



                    </div>


                    )

                }



            </main>


        </div>

    );

}


export default ManageApplications;