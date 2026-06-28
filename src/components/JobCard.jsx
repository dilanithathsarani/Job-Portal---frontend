import { Link } from "react-router-dom";

function JobCard({ job }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold">

                {job.title}

            </h2>

            <p>{job.location}</p>

            <p>{job.jobType}</p>

            <p>Rs. {job.salary}</p>

            <Link
                to={`/jobs/${job._id}`}
                className="text-blue-600"
            >
                View Details
            </Link>

        </div>

    );

}

export default JobCard;
