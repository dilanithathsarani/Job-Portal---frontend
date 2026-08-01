import { useState } from "react";
import toast from "react-hot-toast";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import api from "../../services/api";

function CreateCompany() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/company/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Company Created Successfully!");
      setFormData({
        name: "",
        description: "",
        website: "",
        location: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Register Company
            </h1>
            <p className="text-slate-500 mt-1">Add a new company profile before posting jobs.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm rounded-2xl border border-slate-100">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  placeholder="e.g. Acme Corporation"
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  placeholder="Tell us about the company..."
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                  <input
                    name="website"
                    value={formData.website}
                    placeholder="https://acme.com"
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    placeholder="e.g. Colombo, Sri Lanka"
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-sm shadow-indigo-200"
              >
                Create Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
