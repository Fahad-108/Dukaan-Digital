import { useState } from 'react';
import { register } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import DukaanDigital from '../../assets/Dukaan_Digital.svg'
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaStore, FaMapMarkerAlt, FaUserTie, FaChevronDown } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager',
    phone: '',
    shopname: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register(formData);
      console.log(response)
      if (response.data) {
        toast.success("Account registered successfully!");
        setTimeout(() => {
          navigate('/admin');
        }, 200);
      }
    } catch (err) {
      toast.error("Registration failed!")
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-60 from-blue-400 via-blue-100 to-blue-400 px-4 py-12">
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">
                <div className="flex justify-center mb-6">
                    <img className='h-16' src={DukaanDigital} alt="DukaanDigital" />
                </div>
                <h2 className="mt-2 mb-2 text-center text-3xl font-extrabold text-blue-700">
                    Register a New Account
                </h2>
                <p className="text-center text-gray-500 text-sm mb-8">
                    Please provide your details to create an account.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium">
                        {error}
                    </div>
                )}
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-blue-800 mb-2">
                                Full Name
                            </label>
                            <div className="relative flex items-center">
                                <FaUser className="absolute left-4 text-blue-400" />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-blue-800 mb-2">
                                Email
                            </label>
                            <div className="relative flex items-center">
                                <FaEnvelope className="absolute left-4 text-blue-400" />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-blue-800 mb-2">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <FaLock className="absolute left-4 text-blue-400" />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-blue-800 mb-2">
                                Phone Number
                            </label>
                            <div className="relative flex items-center">
                                <FaPhone className="absolute left-4 text-blue-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Conditional Shop Name Input */}
                        {formData.role === "manager" &&
                            <div>
                                <label htmlFor="shopname" className="block text-sm font-semibold text-blue-800 mb-2">
                                    Shop Name
                                </label>
                                <div className="relative flex items-center">
                                    <FaStore className="absolute left-4 text-blue-400" />
                                    <input
                                        type="text"
                                        name="shopname"
                                        id="shopname"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                        onChange={handleChange}
                                        placeholder="Enter your shop's name"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        }

                        {/* Address Input */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-blue-800 mb-2">
                                Address
                            </label>
                            <div className="relative flex items-center">
                                <FaMapMarkerAlt className="absolute left-4 text-blue-400" />
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                                    onChange={handleChange}
                                    placeholder="Enter your full address"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Role Select Dropdown */}
                        <div className="relative">
                            <label htmlFor="role" className="block text-sm font-semibold text-blue-800 mb-2">
                                Role
                            </label>
                            <div className="relative flex items-center">
                                <FaUserTie className="absolute left-4 text-blue-400 pointer-events-none" />
                                <select
                                    name="role"
                                    id="role"
                                    className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-blue-200 rounded-xl appearance-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900"
                                    onChange={handleChange}
                                    defaultValue="manager"
                                    disabled={loading}
                                >
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <FaChevronDown className="absolute right-4 text-blue-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-8 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
};

export default RegisterPage;