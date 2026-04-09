import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, recipeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/ui/Avatar';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { Users, BookMarked, Award, TrendingUp, UserPlus, UserMinus } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState('recipes');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user?.id;

    console.log(user);

    if (!id) {
      navigate('/login');
      return;
    }

    fetchProfile(id);
  }, []);

  const fetchProfile = async (id) => {
    try {
      const response = await userAPI.getProfile(id);
      setProfile(response.data.data.user);
      setRecipes(response.data.data.recipes);
      
      if (currentUser) {
        setIsFollowing(response.data.data.user.followers.some(f => f.id === currentUser.id));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 404) {
        toast.error('Profile not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await userAPI.getBookmarks(profile.id);
      setBookmarks(response.data.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await userAPI.follow(profile.id);
      setIsFollowing(!isFollowing);
      setProfile({
        ...profile,
        followers: isFollowing 
          ? profile.followers.filter(f => f.id !== currentUser.id)
          : [...profile.followers, { id: currentUser.id }]
      });
      toast.success(isFollowing ? 'Unfollowed' : 'Following');
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  useEffect(() => {
    if (activeTab === 'bookmarks' && currentUser && profile && profile.id === currentUser.id) {
      fetchBookmarks();
    }
  }, [activeTab, profile, currentUser]);

  useEffect(() => {
    // Set default active tab based on role when profile loads
    if (profile) {
      const isChef = profile.role === "CHEF";
      const defaultTab = isChef ? 'recipes' : 'bookmarks';
      setActiveTab(defaultTab);
    }
  }, [profile]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!profile) return null;

  const isOwnProfile = currentUser && currentUser.id == profile.id;
  const isChef = profile?.role === "CHEF";
  const isFoodie = profile?.role === "FOODIE";

  // Set default active tab based on role
  const defaultTab = isChef ? 'recipes' : 'bookmarks';
  const currentActiveTab = activeTab || defaultTab;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isFoodie ? (
          // FOODIE Dashboard
          <>
            {/* Foodie Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar 
                    user={profile}
                    size="xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{profile.username}</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900 dark:to-primary-900 rounded-full text-sm font-semibold">
                          🍕 FOODIE
                        </span>
                      </h1>
                    </div>
                    <div className="flex space-x-2">
                      {isOwnProfile && (
                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                          Edit Profile
                        </button>
                      )}
                      {!isOwnProfile && currentUser && (
                        <button
                          onClick={handleFollow}
                          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition ${
                            isFollowing
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                              : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
                          }`}
                        >
                          {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
                          <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile.followers && profile.followers.length) || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile.following && profile.following.length) || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile.bookmarks && profile.bookmarks.length) || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bookmarks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookmarked Recipes Preview */}
            {isOwnProfile && bookmarks.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Bookmarks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarks.slice(0, 3).map((recipe) => (
                    <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
                  ))}
                </div>
              </div>
            )}

            {/* Following Chefs Preview */}
            {profile.following && profile.following.filter(u => u.role === 'CHEF').length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Following Chefs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.following.filter(u => u.role === 'CHEF').slice(0, 6).map((chef) => (
                    <a
                      key={chef.id || chef._id}
                      href={`/profile/${chef.id || chef._id}`}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <Avatar 
                        user={chef}
                        username={chef.username}
                        size="md"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{chef.username}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">👨‍🍳 Chef</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Foodie Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-6">
              <div className="flex border-b dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('bookmarks')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'bookmarks'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <BookMarked size={18} />
                  <span>Bookmarks</span>
                </button>
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'followers'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Users size={18} />
                  <span>Followers</span>
                </button>
                <button
                  onClick={() => setActiveTab('following')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'following'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <TrendingUp size={18} />
                  <span>Following</span>
                </button>
              </div>
            </div>

            {/* Foodie Tab Content */}
            <div>
              {currentActiveTab === 'bookmarks' && (
                <div>
                  {bookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {bookmarks.map((recipe) => (
                        <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                      <div className="text-5xl mb-4">🔖</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        You haven't bookmarked any recipes yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Start exploring and save your favorite recipes!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'followers' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  {profile.followers && profile.followers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.followers.map((follower) => (
                        <a
                          key={follower.id || follower._id}
                          href={`/profile/${follower.id || follower._id}`}
                          className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Avatar 
                            user={follower}
                            username={follower.username}
                            size="lg"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{follower.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{follower.role}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">No followers yet</p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'following' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  {profile.following && profile.following.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.following.map((user) => (
                        <a
                          key={user.id || user._id}
                          href={`/profile/${user.id || user._id}`}
                          className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Avatar 
                            user={user}
                            username={user.username}
                            size="lg"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">You are not following any chefs yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          // CHEF Dashboard
          <>
            {/* Chef Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar 
                    user={profile}
                    size="3xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{profile.username}</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900 dark:to-primary-900 rounded-full text-sm font-semibold">
                          👨‍🍳 CHEF
                        </span>
                      </h1>
                    </div>
                    <div className="flex space-x-2">
                      {isOwnProfile && (
                        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                          Post Recipe
                        </button>
                      )}
                      {!isOwnProfile && currentUser && (
                        <button
                          onClick={handleFollow}
                          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition ${
                            isFollowing
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                              : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
                          }`}
                        >
                          {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
                          <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {profile.bio && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-4">
                      {profile.bio}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {recipes.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Recipes</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile.followers && profile.followers.length) || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile.following && profile.following.length) || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center border-2 border-primary-200 dark:border-primary-800">
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {profile.weeklyPoints || 0}
                      </p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Weekly Pts</p>
                    </div>
                    <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4 text-center border-2 border-accent-200 dark:border-accent-800">
                      <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                        {profile.totalPoints || 0}
                      </p>
                      <p className="text-sm text-accent-600 dark:text-accent-400">Total Pts</p>
                    </div>
                  </div>

                  {/* Badges */}
                  {profile.badges && profile.badges.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Badges & Achievements
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.badges.map((badge, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900 dark:to-primary-900 rounded-full text-xs font-semibold"
                            title={badge.name}
                          >
                            {badge.icon} {badge.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Leaderboard Rank */}
                  {profile.rank && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        🏆 Rank #{profile.rank} on Leaderboard
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Recipes Preview */}
            {recipes.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Recipes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recipes.slice(0, 3).map((recipe) => (
                    <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
                  ))}
                </div>
              </div>
            )}

            {/* Chef Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-6">
              <div className="flex border-b dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('recipes')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'recipes'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Award size={18} />
                  <span>Recipes</span>
                </button>
                {isOwnProfile && (
                  <button
                    onClick={() => setActiveTab('bookmarks')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                      currentActiveTab === 'bookmarks'
                        ? 'text-primary-500 border-b-2 border-primary-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <BookMarked size={18} />
                    <span>Bookmarks</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'followers'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Users size={18} />
                  <span>Followers</span>
                </button>
                <button
                  onClick={() => setActiveTab('following')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'following'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <TrendingUp size={18} />
                  <span>Following</span>
                </button>
                <button
                  onClick={() => setActiveTab('badges')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-semibold transition text-sm md:text-base ${
                    currentActiveTab === 'badges'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Award size={18} />
                  <span>Badges</span>
                </button>
              </div>
            </div>

            {/* Chef Tab Content */}
            <div>
              {currentActiveTab === 'recipes' && (
                <div>
                  {recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                      <div className="text-5xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No recipes yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {isOwnProfile ? 'Start sharing your culinary creations!' : 'This chef hasn\'t posted any recipes yet.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'bookmarks' && (
                <div>
                  {bookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {bookmarks.map((recipe) => (
                        <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                      <div className="text-5xl mb-4">🔖</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No bookmarks yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Save your favorite recipes to find them easily later!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'followers' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  {profile.followers && profile.followers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.followers.map((follower) => (
                        <a
                          key={follower.id || follower._id}
                          href={`/profile/${follower.id || follower._id}`}
                          className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Avatar 
                            user={follower}
                            username={follower.username}
                            size="lg"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{follower.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{follower.role}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">No followers yet</p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'following' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  {profile.following && profile.following.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.following.map((user) => (
                        <a
                          key={user.id || user._id}
                          href={`/profile/${user.id || user._id}`}
                          className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Avatar 
                            user={user}
                            username={user.username}
                            size="lg"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">Not following anyone yet</p>
                    </div>
                  )}
                </div>
              )}

              {currentActiveTab === 'badges' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  {profile.badges && profile.badges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.badges.map((badge, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border border-accent-200 dark:border-accent-800">
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">No badges earned yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
