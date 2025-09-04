import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { editUserProfile } from '../../services/adminService';

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
        <div className="flex justify-center items-center p-6 bg-blue-50">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300">
                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Edit Profile</h2>
                {loading &&
                    <div className="flex justify-center items-center py-6">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                }
                {!loading && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">email</label>
                            <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter address"
                            />
                        </div>
                        {data?.role === "manager" && 
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">shopname</label>
                            <input
                                type="text"
                                name="shopname"
                                value={form.shopname}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Shopname"
                            />
                        </div>}
                        <div>
                            <label className="block text-blue-700 font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Leave blank to keep current password"
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
                )}
            </div>
        </div>
    );
};

export default EditProfile;