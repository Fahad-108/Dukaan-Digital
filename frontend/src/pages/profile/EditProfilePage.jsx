import React, { useState } from 'react';
import { updateProfile } from "../../services/profileService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user?.id) {
        toast.error("User ID not found");
        return;
      }

      const formDataToSend = {};
      if (form.name !== user?.name) formDataToSend.name = form.name;
      if (form.phone !== user?.phone) formDataToSend.phone = form.phone;
      if (form.password) formDataToSend.password = form.password;

      if (Object.keys(formDataToSend).length === 0) {
        toast("No changes to save.", { icon: 'ℹ' });
        setLoading(false);
        return;
      }

      const res = await updateProfile(formDataToSend);
      if (res.data) {
        toast.success("Profile updated successfully!");
        const updatedUser = { ...user, ...formDataToSend };
        if (formDataToSend.password) delete updatedUser.password;
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6 bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Edit Profile
        </h2>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-blue-700 font-medium mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
