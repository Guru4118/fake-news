import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://fake-news-erql.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
       {/* Navbar */}
      <nav className="bg-gray-900 p-4 shadow-md">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-500">Fake News Detector</h1>

          {/* Hamburger Icon for Mobile */}
          <button
            className="lg:hidden text-green-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 text-lg">
            <li><a href="#dash" className="text-green-500 hover:text-white transition-all duration-300">Home</a></li>
            <li><a href="#about" className="text-green-500 hover:text-white transition-all duration-300">About Us</a></li>
            <li><a href="#contact" className="text-green-500 hover:text-white transition-all duration-300">Contact Us</a></li>
          </ul>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={goToLogin}
              className="hidden lg:block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-gray-800 text-white w-full ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <ul className="space-y-4 py-4">
            <li><a href="#dash" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>About Us</a></li>
            <li><a href="#contact" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a></li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={goToLogin}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <form
        onSubmit={submitHandler}
        className="bg-gray-900 p-6 rounded-lg shadow-xl w-full sm:max-w-md max-w-lg animate__animated animate__fadeIn"
      >
        <h2 className="text-3xl mb-6 text-center text-green-500">Login</h2>
        <label className="block mb-4">
          <span className="text-lg">Email</span>
          <input
            type="email"
            className="w-full border border-green-500 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-lg">Password</span>
          <input
            type="password"
            className="w-full border border-green-500 bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
