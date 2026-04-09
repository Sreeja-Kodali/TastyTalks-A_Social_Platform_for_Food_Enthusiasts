import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, Users, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from './Avatar';
import { recipeAPI } from '../../services/api';
import toast from 'react-hot-toast';

const RecipeCard = ({ recipe, onLikeUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = React.useState(
    recipe.likes?.includes(user?.id) || false
  );
  const [likesCount, setLikesCount] = React.useState(recipe.likes?.length || 0);

  // Debug logging
  React.useEffect(() => {
    if (!recipe.id) {
      console.warn('RecipeCard: Recipe has no ID', { recipe });
    }
  }, [recipe.id]);

  // Function to generate unique image based on recipe title
  const getRecipeImage = (title, category) => {
    if (recipe.image) return recipe.image;
    
    // Use different food-related images based on category or title keywords
    const foodImages = {
      'Italian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
      'Chinese': 'https://images.unsplash.com/photo-1563379091339-03246963d4d5?w=400&h=300&fit=crop&crop=center',
      'Mexican': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center',
      'Indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center',
      'Japanese': 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=300&fit=crop&crop=center',
      'French': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
      'American': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      'Thai': 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center',
      'Mediterranean': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center',
      'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop&crop=center',
      'Lunch': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
      'Dinner': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
      'Dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
      'Appetizer': 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop&crop=center',
      'Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center',
      'Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center',
      'Pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center',
      'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
      'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      'Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
      'Ice Cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop&crop=center'
    };

    // Check if category matches
    if (recipe.category && foodImages[recipe.category]) {
      return foodImages[recipe.category];
    }

    // Check title keywords
    const titleLower = title.toLowerCase();
    for (const [key, url] of Object.entries(foodImages)) {
      if (titleLower.includes(key.toLowerCase())) {
        return url;
      }
    }

    // Default fallback with some variety based on recipe ID
    const defaultImages = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center'
    ];
    
    return defaultImages[recipe.id % defaultImages.length];
  };

  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to like recipes');
      return;
    }

    try {
      const response = await recipeAPI.like(recipe.id);
      setIsLiked(!isLiked);
      setLikesCount(response.data.data.length);
      if (onLikeUpdate) onLikeUpdate(recipe.id, response.data.data);
      toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  return (
    <Link 
      to={`/recipes/${recipe.id}`}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getRecipeImage(recipe.title, recipe.category)} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {recipe.isFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ⭐ Featured
          </div>
        )}
        {recipe.isTrending && (
          <div className="absolute top-3 right-3 bg-soft-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            🔥 Trending
          </div>
        )}
        <button
          onClick={handleLike}
          className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart 
            size={20} 
            className={isLiked ? 'fill-primary-500 text-primary-500' : 'text-gray-600 dark:text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition">
          {recipe.title}
        </h3>

        {/* Chef Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar 
            user={recipe.user}
            username={recipe.user?.username || "U"}
            size="sm"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
            by {recipe.user?.username || recipe.chefName || "Unknown Chef"}
          </span>
          {recipe.user?.role === 'CHEF' && (
            <span className="text-xs">👨‍🍳</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-xs rounded-full">
            {recipe.cuisine}
          </span>
          <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-300 text-xs rounded-full">
            {recipe.category}
          </span>
          <span className="px-2 py-1 bg-soft-100 dark:bg-soft-900 text-soft-600 dark:text-soft-300 text-xs rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{recipe.likeCount || recipe.likes?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{(recipe.averageRating || 0).toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{recipe.views || 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>
                {(() => {
                  const prep = recipe.prepTime && !isNaN(recipe.prepTime) ? recipe.prepTime : 0;
                  const cook = recipe.cookTime && !isNaN(recipe.cookTime) ? recipe.cookTime : 0;
                  const total = prep + cook;
                  return total > 0 ? `${total}m` : "N/A";
                })()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{recipe.servings || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
