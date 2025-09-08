import { useEffect, useState } from "react";
import { getProfile, deleteProfile } from "../../services/profileService";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Store,
  Calendar,
  Edit2,
  Trash2,
  MapPin,
} from "lucide-react";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const handleDelete = async () => {
    try {
      if (
        confirm(
          "Are you sure you want to delete your account? This will remove all your data."
        )
      ) {
        const deleted = await deleteProfile();
        if (deleted) {
          sessionStorage.clear();
          navigate("/login");
        }
      }
    } catch (err) {
      toast.error("Failed to delete profile!");
      console.error(err);
    }
  };

  const handleEdit = () => {
    if (profile.role === "admin") {
      navigate("/admin/profile/edit", { state: { data: profile } });
    } else {
      navigate("/profile/edit");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start font-sans">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
          <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300"
        >
          <FaArrowLeft className="text-blue-600" />
          <span className="font-medium">Back</span>
        </button>
          {/* Avatar circle */}
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-white shadow-lg">
            <User className="text-blue-600" size={36} />
          </div>

          <h2 className="text-2xl font-bold text-center">{profile.name}</h2>
          <p className="text-center text-blue-100 capitalize">{profile.role}</p>

          {profile.role === "manager" && (
            <div className="mt-3 text-center">
              <span className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium shadow">
                {profile.shopname}
              </span>
            </div>
          )}

          {/* Header Actions - Below avatar & name */}
          
        </div>

        {/* Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ProfileDetail icon={<Mail size={18} />} label="Email" value={profile.email} />
          <ProfileDetail icon={<Phone size={18} />} label="Phone" value={profile.phone} />
          {profile.role === "manager" && (
            <ProfileDetail
              icon={<Store size={18} />}
              label="Shop Name"
              value={profile.shopname}
            />
          )}
          <ProfileDetail icon={<Briefcase size={18} />} label="Role" value={profile.role} />
          <ProfileDetail icon={<MapPin size={18} />} label="Address" value={profile.address} />
          <ProfileDetail
            icon={<Calendar size={18} />}
            label="Joined On"
            value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
          />
        </div>
        <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              <Trash2 size={18} />
              Delete Profile
            </button>
          </div>
      </div>
    </div>
  );
};

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
      <div className="text-blue-600 bg-blue-100 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value || "Not Provided"}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
