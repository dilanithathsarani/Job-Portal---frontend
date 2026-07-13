import { useEffect, useState } from "react";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../../services/recruiterService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      console.log(error);
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">Edit Recruiter Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="border p-2 w-full"
        />

        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
          className="border p-2 w-full"
        />

        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="border p-2 w-full"
        />

        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (React, Node)"
          className="border p-2 w-full"
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
