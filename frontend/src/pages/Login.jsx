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
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
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
