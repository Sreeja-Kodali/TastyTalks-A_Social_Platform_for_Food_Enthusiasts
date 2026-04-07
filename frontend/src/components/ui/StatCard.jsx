import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'primary', suffix = '' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-200',
    accent: 'bg-accent-50 text-accent-600 border-accent-200',
    soft: 'bg-soft-50 text-soft-600 border-soft-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold">
            {value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color === 'yellow' ? 'bg-yellow-100' : `bg-${color}-100`}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;