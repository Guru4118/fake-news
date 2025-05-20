import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import ResultDisplay from '../components/ResultDisplay';
import img1 from './im.jpg';
import img2 from './two.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a custom duration for smooth animations
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 text-lg">
            <li>
              <a href="#dash" className="text-green-500 hover:text-white transition-all duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-green-500 hover:text-white transition-all duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-green-500 hover:text-white transition-all duration-300">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Logout Button */}
          <button
  onClick={logout}
  className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
>
  Logout
</button>

        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-gray-800 text-white w-full ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <ul className="space-y-4 py-4">
            <li>
              <a href="#dash" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="block text-green-500 hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </a>
              <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div
        id="dash"
        className="p-6 min-h-[600px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg mb-12 text-center text-white"
        style={{
          backgroundImage: `url(${img2})`, // Replace with your actual image path
          
          
        }}
        data-aos="fade-up" // AOS animation on scroll
        data-aos-duration="1500"
      >
        <h2 className="text-2xl font-semibold mb-6"></h2>

        <UploadForm onResult={setResult} />
        {result && <ResultDisplay data={result} />}
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="py-12 bg-gray-900"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 px-4 text-center lg:text-left"
          data-aos="fade-right"
          >
            <h2 className="text-3xl font-bold text-green-500 mb-4">About Fake News Detector</h2>
            <p className="text-lg text-gray-400 mb-4">
              Our mission is to help individuals identify and verify fake news through advanced machine learning models.
              Using the latest AI and NLP technologies, we analyze news sources and provide accurate, fact-checked results. 
              Whether it's text or images, our platform ensures you get trustworthy information.
            </p>
            <p className="text-lg text-gray-400">
              With a user-friendly interface, you can easily upload articles and images for analysis. Stay informed, stay safe, 
              and fight misinformation with the Fake News Detector.
            </p>
          </div>

          <div className="lg:w-1/2 px-4 mt-6 lg:mt-0">
            <img
            data-aos="fade-left"
              src="https://img.freepik.com/premium-photo/fact-fake-concept-flip-blocks-change-word-fake-fact-april-fools-day_136875-3607.jpg" // Replace with actual image URL
              alt="Fake News Detector"
              className="w-full rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="py-12 bg-gray-800 text-white"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 px-4">
            <img
              src={img1}
              alt="Contact Us"
              className="w-full rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
              data-aos="fade-right"
            />
          </div>

          <div className="lg:w-1/2 px-4 mt-6 lg:mt-0">
            <h2 className="text-3xl font-bold text-green-500 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-300 mb-6">
              Have questions, feedback, or want to connect? Fill out the form and we’ll get back to you shortly.
            </p>

            <form
              action="https://formspree.io/f/YOUR_FORM_ID" // Replace with your Formspree ID or backend route
              method="POST"
              className="bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              data-aos="fade-left"
            >
              <div className="mb-4">
                <label className="block text-green-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-green-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-green-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-green-400 mb-1">Your Query</label>
                <textarea
                  name="query"
                  rows="4"
                  required
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-sm text-gray-400 py-6">
        <p>
          © 2025 Y-nOt. All Rights Reserved @{' '}
          <a className="text-green-700 text-2xl" href="https://www.linkedin.com/in/guruprasath103/">
            Guruprasath
          </a>
        </p>
      </footer>
    </div>
  );
}
