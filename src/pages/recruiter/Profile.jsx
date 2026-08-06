import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRecruiterProfile } from "../../services/recruiterService";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import Loader from "../../components/Loader";

const formatSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.filter(Boolean);
  }

  if (typeof skills === "string" && skills.trim()) {
    return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  }

  return [];
};

function ProfileField({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-800">
        {value || "Not added yet"}
      </p>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchProfile();
  }, [location]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getRecruiterProfile();
      setProfile(data.recruiter);
    } catch (error) {
      console.error("Error fetching recruiter profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const skills = formatSkills(profile?.skills);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <RecruiterSidebar />

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <Loader />
          ) : !profile ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">Unable to load your profile.</p>
            </section>
          ) : (
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-blue-900 px-6 py-8 text-white sm:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-200">
                      Recruiter profile
                    </p>
                    <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                      {profile.name}
                    </h1>
                    <p className="mt-2 text-sm text-slate-300">
                      {profile.email}
                    </p>
                  </div>

                  <Link
                    to="/recruiter/edit-profile"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                  >
                    Edit profile
                  </Link>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    About
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                    {profile.bio || "Add a short bio to introduce yourself to candidates."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="Phone" value={profile.phone} />
                  <ProfileField label="Education" value={profile.education} />
                  <ProfileField label="Experience" value={profile.experience} />
                </div>

                <div className="mt-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    Skills
                  </h2>

                  {skills.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      No skills added yet.
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
