import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://fake-news-erql.onrender.com/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 p-4 shadow-md">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-500">Fake News Detector</h1>

          <button
            className="lg:hidden text-green-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul className="hidden lg:flex space-x-8 text-lg">
            <li><a href="/dashboard" className="text-green-500 hover:text-white transition-all duration-300">Home</a></li>
            <li><a href="/dashboard#about" className="text-green-500 hover:text-white transition-all duration-300">About Us</a></li>
            <li><a href="/dashboard#contact" className="text-green-500 hover:text-white transition-all duration-300">Contact Us</a></li>
          </ul>

          <Link
            to="/login"
            className="hidden lg:block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-gray-800 text-white w-full ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <ul className="space-y-4 py-4 px-4">
            <li><a href="/dashboard" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
            <li><a href="/dashboard#about" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>About Us</a></li>
            <li><a href="/dashboard#contact" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a></li>
            <li>
              <Link
                to="/login"
                className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Form */}
      <div className="flex items-center justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md animate__animated animate__fadeIn"
        >
          <h2 className="text-3xl mb-4 text-center text-green-500">Register</h2>

          <label className="block mb-4">
            <span className="text-lg">Name</span>
            <input
              type="text"
              className="w-full border border-green-500 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Email</span>
            <input
              type="email"
              className="w-full border border-green-500 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-lg">Password</span>
            <input
              type="password"
              className="w-full border border-green-500 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
