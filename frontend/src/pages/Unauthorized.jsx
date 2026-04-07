import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Unauthorized</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
