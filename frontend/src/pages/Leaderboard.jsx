import React from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover the top chefs and trending creators across the TastyTalks community.
          </p>
          <Link
            to="/top-chefs"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            View Top Chefs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
