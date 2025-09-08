import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { editUserProfile } from '../../services/adminService';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStore, FaLock , FaArrowLeft} from 'react-icons/fa';

const EditProfile = () => {
    const location = useLocation();
    const data = location.state?.data;
    const [form, setform] = useState({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        address: data?.address || "",
        shopname: data?.shopname || "",
        password: ""
    })

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await editUserProfile(data._id, form);
            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    navigate('/admin');
                }, 200);
            } else {
                toast.error(response.msg || "Failed to update profile");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile");
        }
        setLoading(false);
    }

    return (
        <div className="flex justify-center items-center p-6">
            <div className="w-full max-w-md mx-auto border border-blue-300 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300  hover:scale-[1.01] hover:shadow-blue-500/20">
                <div className="p-8">
                    <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300"
        >
          <FaArrowLeft className="text-blue-600" />
          <span className="font-medium">Back</span>
        </button>
                    <h1 className="text-center text-3xl font-extrabold text-blue-700 mb-2">Edit Profile</h1>
                    <p className="text-center text-gray-500 text-sm mb-8">Update personal and business information.</p>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
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
                                <label htmlFor="email" className="block text-blue-800 font-semibold mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <FaEnvelope className="absolute left-4 text-blue-400 z-10" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                                        placeholder="Enter your email address"
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
                                <label htmlFor="address" className="block text-blue-800 font-semibold mb-2">Address</label>
                                <div className="relative flex items-center">
                                    <FaMapMarkerAlt className="absolute left-4 text-blue-400 z-10" />
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                                        placeholder="Enter your full address"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {data.role !== "admin" && (
                                <div className="relative">
                                    <label htmlFor="shopname" className="block text-blue-800 font-semibold mb-2">Shop Name</label>
                                    <div className="relative flex items-center">
                                        <FaStore className="absolute left-4 text-blue-400 z-10" />
                                        <input
                                            type="text"
                                            id="shopname"
                                            name="shopname"
                                            value={form.shopname}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                                            placeholder="Enter your shop's name"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            )}

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
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;