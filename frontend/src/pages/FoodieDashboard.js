import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import StatCard from '../components/ui/StatCard';
import { TrendingUp, BookMarked, Star, Users, ChefHat, Search, ArrowRight } from 'lucide-react';

const FoodieDashboard = () => {
  const { user } = useAuth();
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [stats, setStats] = useState({
    recipesViewed: 0,
    bookmarksCount: 0,
    ratingsGiven: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trendingRes, bookmarksRes] = await Promise.all([
        recipeAPI.getTrending(),
        userAPI.getBookmarks(user.id)
      ]);

      setTrending(trendingRes.data.data.slice(0, 6));
      setBookmarks(bookmarksRes.data.data.slice(0, 6));

      // Mock stats - in real app, get from API
      setStats({
        recipesViewed: 42,
        bookmarksCount: bookmarksRes.data.data.length,
        ratingsGiven: 15
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.username}! 🍽️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover new recipes and connect with amazing chefs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Recipes Viewed"
            value={stats.recipesViewed}
            icon={TrendingUp}
            color="primary"
          />
          <StatCard
            title="Bookmarks"
            value={stats.bookmarksCount}
            icon={BookMarked}
            color="accent"
          />
          <StatCard
            title="Ratings Given"
            value={stats.ratingsGiven}
            icon={Star}
            color="soft"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/recipes"
              className="flex flex-col items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition"
            >
              <Search className="text-primary-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Browse Recipes</span>
            </Link>
            <Link
              to={`/profile/${user.id}?tab=bookmarks`}
              className="flex flex-col items-center p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl hover:bg-accent-100 dark:hover:bg-accent-900/30 transition"
            >
              <BookMarked className="text-accent-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">My Bookmarks</span>
            </Link>
            <Link
              to="/top-chefs"
              className="flex flex-col items-center p-4 bg-soft-50 dark:bg-soft-900/20 rounded-xl hover:bg-soft-100 dark:hover:bg-soft-900/30 transition"
            >
              <ChefHat className="text-soft-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Top Chefs</span>
            </Link>
            <Link
              to="/chat"
              className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition"
            >
              <Users className="text-green-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Chat</span>
            </Link>
          </div>
        </div>

        {/* Trending Recipes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-primary-500" size={28} />
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Trending Recipes
              </h2>
            </div>
            <Link
              to="/recipes"
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>

        {/* My Bookmarks */}
        {bookmarks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BookMarked className="text-accent-500" size={28} />
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  My Bookmarks
                </h2>
              </div>
              <Link
                to={`/profile/${user.id}?tab=bookmarks`}
                className="text-accent-500 hover:text-accent-600 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodieDashboard;