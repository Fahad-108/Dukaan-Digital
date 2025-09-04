import { useState, useEffect } from "react";
import { updateProfile } from "../../services/profileService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaLock } from 'react-icons/fa';
import Loader from "../../components/parts/Loader.jsx";

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
        }, 100);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-md mx-auto border border-blue-300 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300  hover:scale-[1.01] hover:shadow-blue-500/20">
        <div className="p-8">
          <h1 className="text-center text-3xl font-extrabold text-blue-700 mb-2">Edit Profile</h1>
          <p className="text-center text-gray-500 text-[14px] mb-8">Update your personal information.</p>

          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-blue-800 font-semibold mb-2">Name</label>
                <div className="relative flex items-center">
                  <FaUser className="absolute left-4 text-blue-400 z-10" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-blue-800 font-semibold mb-2">Phone</label>
                <div className="relative flex items-center">
                  <FaPhone className="absolute left-4 text-blue-400 z-10" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-blue-800 font-semibold mb-2">New Password</label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-blue-400 z-10" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    placeholder="Leave blank to keep current password"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
          <div className="mt-8 text-center">
            <span className="text-sm text-gray-600 font-medium">To make any other changes, please contact your administrator.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;