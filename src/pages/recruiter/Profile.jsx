import { useEffect, useState } from "react";
import { getRecruiterProfile } from "../../services/recruiterService";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchProfile();
  }, [location]);

  const fetchProfile = async () => {
    try {
      const data = await getRecruiterProfile();

      setProfile(data.recruiter);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Recruiter Profile</h1>

      <div className="mt-5 space-y-3">
        <p>
          <b>Name:</b> {profile.name}
        </p>

        <p>
          <b>Email:</b> {profile.email}
        </p>

        <p>
          <b>Phone:</b> {profile.phone}
        </p>

        <p>
          <b>Bio:</b> {profile.bio}
        </p>

        <p>
          <b>Education:</b> {profile.education}
        </p>

        <p>
          <b>Experience:</b> {profile.experience}
        </p>

        <p>
          <b>Skills:</b> {profile.skills?.join(", ")}
        </p>
      </div>

      <Link
        to="/recruiter/edit-profile"
        className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default Profile;
