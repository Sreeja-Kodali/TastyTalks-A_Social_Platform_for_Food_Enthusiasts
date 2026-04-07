import React, { useState } from 'react';

const Avatar = ({ 
  user, 
  username = "U", 
  imageUrl = null, 
  size = "md", 
  className = "",
  fallbackBg = true
}) => {
  const [imageError, setImageError] = useState(false);

  // Size mappings
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
    xl: "w-12 h-12 text-lg",
    "2xl": "w-16 h-16 text-2xl",
    "3xl": "w-32 h-32 text-4xl"
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Determine which image to use
  const image = imageUrl || user?.profileImage || user?.avatar;

  // Generate color based on username (deterministic)
  const generateColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-primary-400 to-primary-600',
      'bg-gradient-to-br from-accent-400 to-accent-600',
      'bg-gradient-to-br from-soft-400 to-soft-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitial = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "U";
  };

  // If image exists and hasn't errored, show it
  if (image && !imageError) {
    return (
      <img
        src={image}
        alt={username}
        onError={() => setImageError(true)}
        className={`${sizeClass} rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  // Fall back to colored circle with initials
  const bgColor = fallbackBg ? generateColor(username) : "bg-gray-200 dark:bg-gray-700";
  const textColor = fallbackBg ? "text-white" : "text-gray-700 dark:text-gray-300";

  return (
    <div
      className={`${sizeClass} ${bgColor} ${textColor} rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center font-semibold ${className}`}
      title={username}
    >
      {getInitial(username)}
    </div>
  );
};

export default Avatar;
