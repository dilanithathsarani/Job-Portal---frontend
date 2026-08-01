import { useEffect, useState } from "react";
import { getRecruiterProfile } from "../../services/recruiterService";
import { Link, useLocation } from "react-router-dom";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import { FaUserCircle, FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

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
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <RecruiterSidebar />
            <div className="flex-1 p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Recruiter Profile</h1>
              <p className="text-slate-500 mt-1">Manage your personal information and preferences.</p>
            </div>
            <Link
              to="/recruiter/edit-profile"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200"
            >
              Edit Profile
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-indigo-50/50 p-8 border-b border-slate-100 flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-indigo-300">
                <FaUserCircle className="w-20 h-20" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
                <div className="text-slate-500 mt-1 font-medium">{profile.bio || "No bio added yet"}</div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                       Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-slate-400 mt-1" />
                        <div>
                          <div className="text-sm text-slate-500 font-medium">Email Address</div>
                          <div className="text-slate-800">{profile.email}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-slate-400 mt-1" />
                        <div>
                          <div className="text-sm text-slate-500 font-medium">Phone Number</div>
                          <div className="text-slate-800">{profile.phone || "Not provided"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8 flex items-center gap-2">
                       Professional Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FaGraduationCap className="text-slate-400 mt-1" />
                        <div>
                          <div className="text-sm text-slate-500 font-medium">Education</div>
                          <div className="text-slate-800">{profile.education || "Not provided"}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaBriefcase className="text-slate-400 mt-1" />
                        <div>
                          <div className="text-sm text-slate-500 font-medium">Experience</div>
                          <div className="text-slate-800">{profile.experience || "Not provided"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FaCode /> Skills
                  </h3>
                  {profile.skills && profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span key={index} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No skills added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
