import { useState, useEffect } from 'react'
import { login } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/context/UserContext.jsx';
import DukaanDigital from '../../assets/Dukaan_Digital.svg'
import { toast } from 'react-hot-toast';

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
        navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-linear-60 from-blue-400 via-blue-100 to-blue-400 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">

        <div className="flex justify-center mb-6">
          <img src={DukaanDigital} alt="Dukaan Digital" className="h-14" />
        </div>

        <h2 className="text-2xl font-extrabold text-center text-blue-500 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Login to your Dukaan Digital account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium" htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center py-2 rounded-lg bg-red-100">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage