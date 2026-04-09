import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Avatar from '../components/ui/Avatar';
import { Trophy, TrendingUp, Users, Award } from 'lucide-react';

const TopChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopChefs();
  }, []);

  const fetchTopChefs = async () => {
    try {
      const response = await userAPI.getTopChefs();
      console.log(chefs);
      setChefs(response.data.data);
    } catch (error) {
      console.error('Error fetching top chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getMedalColor = (index) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-primary-500 to-accent-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="text-yellow-500" size={48} />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Top Chefs Leaderboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Weekly rankings based on community engagement and recipe quality
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {chefs.slice(0, 3).map((chef, index) => (
            <Link
              key={chef.id}
              to={`/profile/${chef.id}`}
              className={`bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center w-full max-w-sm mx-auto transform transition hover:scale-105 ${
                index === 0 ? 'md:order-2 md:scale-110' : index === 1 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className="text-5xl mb-2">{getMedalEmoji(index)}</div>

              <div className="mb-4">
                <Avatar user={chef} size="2xl" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {chef.username}
              </h3>

              <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-6">
                {chef.role}
              </p>

              <div className="grid grid-cols-3 gap-6 w-full text-center">
                <div>
                  <p className="text-xl font-bold text-rose-500">
                    {chef.weeklyPoints || 0}
                  </p>
                  <p className="text-xs text-gray-500">Weekly Points</p>
                </div>

                <div>
                  <p className="text-xl font-bold text-orange-500">
                    {chef.followersCount || 0}
                  </p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>

                <div>
                  <p className="text-xl font-bold text-purple-500">
                    {chef.totalPoints || 0}
                  </p>
                  <p className="text-xs text-gray-500">Total Points</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest of Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-6">
            <h2 className="text-2xl font-display font-bold">Full Rankings</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {chefs.map((chef, index) => (
              <Link
                key={chef.id}
                to={`/profile/${chef.id}`}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <Avatar user={chef} size="md" />

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {chef.username}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {chef.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-rose-500">{chef.weeklyPoints || 0}</p>
                    <p className="text-gray-500">pts</p>
                  </div>

                  <div className="text-center">
                    <p className="font-bold">{chef.followersCount || 0}</p>
                    <p className="text-gray-500">followers</p>
                  </div>

                  <div className="text-center">
                    <p className="font-bold">{chef.totalPoints || 0}</p>
                    <p className="text-gray-500">total</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            How Points Are Earned
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-semibold">Post Recipe</p>
                <p className="text-xs">+10 points</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">❤️</span>
              <div>
                <p className="font-semibold">Get Likes</p>
                <p className="text-xs">+2 points each</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-semibold">Get 5-Star Rating</p>
                <p className="text-xs">+5 points</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold">Get Comments</p>
                <p className="text-xs">+1 point each</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            * Weekly points reset every Monday. Keep creating amazing recipes to stay on top!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopChefs;
