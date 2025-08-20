import { useEffect, useState } from 'react';
import { getProfile, deleteProfile } from '../../services/profileService';
import { User, Mail, Phone, Briefcase, Store, Calendar, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      console.log(response.data.user);
      setProfile(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if(confirm("Are you sure you want to delete your account? This will remove all your data.")){
        const deleted = await deleteProfile();
        if (deleted) {
          console.log("Profile deleted seccessfully")
          sessionStorage.clear();
          navigate('/login')
        }
      }
    } catch (err) {
      toast.error('Failed to fetch profile!')
      console.error('Error fetching profile:', err);
    }
  }

  const handleEdit = async () => {
    navigate("/profile/edit")
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6 min-h-screen font-sans bg-gray-50">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative bg-blue-600 p-6 text-center text-white">
          <div className='absolute z-50 top-25 right-4 cursor-pointer text-indigo-600 bg-indigo-100 p-2 rounded-full'
            onClick={() => handleEdit()}>
            {<Edit2 size={18} />}
          </div>
          <div className='absolute top-4 right-4 cursor-pointer text-indigo-600 bg-indigo-100 p-2 rounded-full'
            onClick={() => handleDelete()}>
            {<Trash2 size={18} />}
          </div>
          <div className="w-fit mx-auto mb-2 p-2 rounded-full bg-white flex items-center justify-center font-bold text-2xl shadow-lg">
            <h1 className='text-black Logo-font'>{profile.shopname}</h1>
          </div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm opacity-80">{profile.role}</p>
        </div>

        <div className="p-6 space-y-4">
          <ProfileDetail icon={<Mail size={18} />} label="Email" value={profile.email} />
          <ProfileDetail icon={<Phone size={18} />} label="Phone" value={profile.phone} />
          <ProfileDetail icon={<Store size={18} />} label="Shop Name" value={profile.shopname} />
          <ProfileDetail icon={<Briefcase size={18} />} label="Role" value={profile.role} />
          <ProfileDetail
            icon={<Calendar size={18} />}
            label="Joined On"
            value={new Date(profile.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
};

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-indigo-600 bg-indigo-100 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value || "Not Provided"}</p>
      </div>
    </div>
  );
}

export default ProfilePage;