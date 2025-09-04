import { useState } from 'react'
import { login } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/Context/UserContext.jsx';
import DukaanDigital from '../../assets/Dukaan_Digital.svg'
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await login(form)
      console.log(response.data);
      if (response.data && response.data.token) {
        sessionStorage.setItem('token', response.data.token)
        toast.success('Login successfully!');
        const USER = response.data.user;
        setUser(USER);
        navigate('/manager');
      } else {
        setError('Invalid login response')
      }
    } catch (err) {
      toast.error('Login failed!');
      setError(err.response?.data?.message || 'An error occurred during login')
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-60 from-blue-400 via-blue-100 to-blue-400 px-4 font-sans">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">

        <div className="flex justify-center mb-6">
          <img src={DukaanDigital} alt="Dukaan Digital" className="h-16" />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">
          Welcome Back!
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Login to your Dukaan Digital account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-800 mb-1 text-sm font-semibold" htmlFor="email">Email Address</label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-blue-400 z-10" />
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-blue-800 mb-1 text-sm font-semibold" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-blue-400 z-10" />
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center py-3 rounded-xl bg-red-50 border border-red-200 transition-all duration-300 transform animate-pulse-once">{error}</div>}
          <div className='flex justify-center pt-2'>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage