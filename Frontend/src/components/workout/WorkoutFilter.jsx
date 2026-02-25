import React from 'react';

const WorkoutFilter = ({ activeFilter, setFilter }) => {
  const categories = [
    'All',
    'Warm-Up',
    'Agility',
    'Speed',
    'Strength',
    'Ball Control',
    'Cool Down'
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
            activeFilter === category
              ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default WorkoutFilter;
