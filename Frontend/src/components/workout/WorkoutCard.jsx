import React from 'react';
import { Play, ClipboardList, Clock, BarChart } from 'lucide-react';

const WorkoutCard = ({ workout, onQuickTips }) => {
  return (
    <div 
      className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full hover:-translate-y-2"
    >
      {/* Thumbnail with Overlay */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={workout.thumbnail || "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800"} 
          alt={workout.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border backdrop-blur-md ${
                workout.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                workout.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}>
                {workout.difficulty}
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                <Clock className="w-3 h-3 text-indigo-500" />
                {workout.duration}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                <BarChart className="w-3 h-3 text-indigo-500" />
                {workout.category}
            </div>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-none">
          {workout.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
          {workout.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={workout.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-indigo-950 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-indigo-100 font-black text-sm uppercase tracking-widest group/btn"
          >
            <Play size={18} fill="white" className="group-hover/btn:scale-110 transition-transform" />
            Watch Drill
          </a>
          <button
            onClick={() => onQuickTips(workout)}
            className="flex items-center justify-center gap-2 w-full py-3 text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-indigo-600 transition-colors"
          >
            <ClipboardList size={18} />
            Quick Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
