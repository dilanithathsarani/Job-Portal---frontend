import { useEffect, useState } from "react";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../../services/recruiterService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getRecruiterProfile();
      const recruiter = data.recruiter;

      setFormData({
        name: recruiter.name || "",
        phone: recruiter.phone || "",
        bio: recruiter.bio || "",
        education: recruiter.education || "",
        experience: recruiter.experience || "",
        skills: recruiter.skills ? recruiter.skills.join(", ") : "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRecruiterProfile({
        name: formData.name,
        bio: formData.bio,
        phone: formData.phone,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      });

      console.log("Updated response:", response);
      toast.success("Profile updated successfully");
      navigate("/recruiter/profile");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Edit Recruiter Profile</h1>
                <p className="text-slate-500 mt-1">Update your personal and professional information.</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Education</label>
                    <input
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="BSc. Computer Science"
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Experience</label>
                    <input
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="5 years in Tech Recruiting"
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="A short summary about yourself..."
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[100px]"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Skills (comma-separated)</label>
                    <input
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. Sourcing, Technical Interviews, React, Node.js"
                      className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/recruiter/profile")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-sm shadow-indigo-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
