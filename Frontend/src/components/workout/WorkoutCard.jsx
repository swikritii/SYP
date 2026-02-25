import React from 'react';
import { Play, ClipboardList } from 'lucide-react';

const WorkoutCard = ({ workout, onQuickTips }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col h-full"
    >
      {/* Thumbnail with Hover Effect */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={workout.thumbnail || "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800"} 
          alt={workout.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {workout.difficulty}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            {workout.duration}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {workout.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
          {workout.description}
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a
            href={workout.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-blue-200"
          >
            <Play size={16} fill="currentColor" />
            <span className="text-sm font-semibold">Watch</span>
          </a>
          <button
            onClick={() => onQuickTips(workout)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all hover:shadow-sm"
          >
            <ClipboardList size={16} />
            <span className="text-sm font-semibold">Tips</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
