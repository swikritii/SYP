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
    <div className="flex flex-wrap justify-center gap-4 my-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 border-2 ${
            activeFilter === category
              ? 'bg-indigo-950 text-white border-indigo-950 shadow-[0_10px_20px_-5px_rgba(30,27,75,0.4)] scale-105'
              : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-100 hover:text-indigo-600 hover:shadow-lg'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default WorkoutFilter;
