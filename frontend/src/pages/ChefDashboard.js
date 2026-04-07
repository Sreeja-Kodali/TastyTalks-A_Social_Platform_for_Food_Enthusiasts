import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import StatCard from '../components/ui/StatCard';
import { TrendingUp, BookMarked, Star, Users, ChefHat, PlusCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const ChefDashboard = () => {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalViews: 0,
    totalLikes: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await userAPI.getProfile(user.id);
      const recipes = profileRes.data.data.recipes || [];
      setMyRecipes(recipes.slice(0, 6));

      // Calculate stats
      const totalViews = recipes.reduce((sum, recipe) => sum + (recipe.views || 0), 0);
      const totalLikes = recipes.reduce((sum, recipe) => sum + (recipe.likes?.length || 0), 0);
      const totalRatings = recipes.reduce((sum, recipe) => sum + (recipe.ratings?.length || 0), 0);
      const averageRating = totalRatings > 0
        ? recipes.reduce((sum, recipe) =>
            sum + (recipe.ratings?.reduce((rSum, r) => rSum + r.rating, 0) || 0), 0) / totalRatings
        : 0;

      setStats({
        totalRecipes: recipes.length,
        totalViews,
        totalLikes,
        averageRating: Math.round(averageRating * 10) / 10
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
            Chef Dashboard, {user.username}! 👨‍🍳
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your recipes and connect with food lovers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Recipes"
            value={stats.totalRecipes}
            icon={ChefHat}
            color="primary"
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews}
            icon={TrendingUp}
            color="accent"
          />
          <StatCard
            title="Total Likes"
            value={stats.totalLikes}
            icon={Star}
            color="soft"
          />
          <StatCard
            title="Avg Rating"
            value={stats.averageRating}
            icon={Star}
            color="yellow"
            suffix="/5"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Chef Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/post-recipe"
              className="flex flex-col items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition"
            >
              <PlusCircle className="text-primary-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Post Recipe</span>
            </Link>
            <Link
              to={`/profile/${user._id}`}
              className="flex flex-col items-center p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl hover:bg-accent-100 dark:hover:bg-accent-900/30 transition"
            >
              <ChefHat className="text-accent-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">My Profile</span>
            </Link>
            <Link
              to="/chat"
              className="flex flex-col items-center p-4 bg-soft-50 dark:bg-soft-900/20 rounded-xl hover:bg-soft-100 dark:hover:bg-soft-900/30 transition"
            >
              <Users className="text-soft-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Chat</span>
            </Link>
            <Link
              to="/top-chefs"
              className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition"
            >
              <TrendingUp className="text-green-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Top Chefs</span>
            </Link>
          </div>
        </div>

        {/* My Recipes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <ChefHat className="text-primary-500" size={28} />
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                My Recipes
              </h2>
            </div>
            <Link
              to={`/profile/${user._id}`}
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          {myRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChefHat className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No recipes yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Share your culinary creations with the community
              </p>
              <Link
                to="/post-recipe"
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                <PlusCircle size={16} className="mr-2" />
                Post Your First Recipe
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Recipe approved
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your "Classic Spaghetti Carbonara" was approved 2 days ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Star className="text-yellow-500" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New rating
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Someone rated your "Beef Stroganoff" 5 stars
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Users className="text-blue-500" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New follower
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Foodie123 started following you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;