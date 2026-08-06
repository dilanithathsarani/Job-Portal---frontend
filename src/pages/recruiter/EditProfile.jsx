import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../../services/recruiterService";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import Loader from "../../components/Loader";

function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    education: "",
    experience: "",
    skills: "",
  });

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
    } catch (error) {
      console.error("Error loading recruiter profile:", error);
      toast.error("Failed to load profile");
    } finally {
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
      setSaving(true);

      await updateRecruiterProfile({
        name: formData.name,
        bio: formData.bio,
        phone: formData.phone,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      toast.success("Profile updated");
      navigate("/recruiter/profile");
    } catch (error) {
      console.error("Error updating recruiter profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <RecruiterSidebar />

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              to="/recruiter/profile"
              className="text-sm font-semibold text-blue-700 transition hover:text-blue-500"
            >
              ← Back to profile
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Recruiter settings
              </p>
              <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Edit profile
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Update your contact and professional details in one place.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Education
                    </label>
                    <input
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="BSc Computer Science"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Experience
                  </label>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5 years in tech recruiting"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="A short summary about yourself"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Skills
                  </label>
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Sourcing, interviews, React"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Separate skills with commas.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                  <Link
                    to="/recruiter/profile"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
