import { useState } from 'react';
import axios from 'axios';
import AOS from 'aos';



useEffect(() => {
  AOS.init({ duration: 2000 });
  const interval = setInterval(() => {
    AOS.refresh();
  }, 4000); // Re-trigger every 4s
  return () => clearInterval(interval);
}, []);


export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image');

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post(
        'https://fake-news-erql.onrender.com/api/fact-check/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onResult(data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-black p-6 rounded-lg shadow-lg mb-6 max-w-md mx-auto border border-green-500"
      >
        <h2 className="text-2xl font-bold text-green-500 mb-4 text-center">Upload Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 disabled:opacity-50 transition"
        >
          {loading ? 'Processing...' : 'Upload & Check'}
        </button>
      </form>

      <p
  className="text-center text-green-400"
  data-aos="zoom-in"
  data-aos-duration="2000"
>
  Upload an image → AI verifies the content → Result shows if it's real or fake.
</p>


    </>
  );
}
