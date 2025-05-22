import { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trialInfo, setTrialInfo] = useState({ trialsUsed: 0, trialsRemaining: 5 });

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image');

    if (!isLoggedIn && trialInfo.trialsRemaining <= 0) {
      return alert('Free trial limit reached. Please log in to continue.');
    }

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
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      // Update trial info from backend response
      setTrialInfo({
        trialsUsed: data.trialsUsed ?? 0,
        trialsRemaining: data.trialsRemaining === 'Unlimited' ? Infinity : data.trialsRemaining,
      });

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
          disabled={loading || (!isLoggedIn && trialInfo.trialsRemaining <= 0)}
          className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 disabled:opacity-50 transition"
        >
          {loading ? 'Processing...' : 'Upload & Check'}
        </button>

        {!isLoggedIn && (
          <p className="text-sm text-green-400 mt-2 text-center">
            Free trials remaining: {trialInfo.trialsRemaining === Infinity ? 'Unlimited' : trialInfo.trialsRemaining} / 5
          </p>
        )}
      </form>

      <p className="text-center text-green-400">
        Upload an image → AI verifies the content → Result shows if it's real or fake.
      </p>
    </>
  );
}
