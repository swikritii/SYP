import React, { useEffect } from 'react';
import { X, CheckCircle2, Trophy, Clock, BarChart } from 'lucide-react';

const WorkoutModal = ({ workout, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#0a0c10]/95 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[40px] w-full max-w-5xl overflow-hidden shadow-[0_0_100px_-20px_rgba(30,27,75,0.5)] transform transition-all animate-in fade-in zoom-in-95 duration-500 border border-gray-100 flex flex-col md:flex-row h-full max-h-[85vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full z-50 transition-all border border-white/20 text-white"
        >
          <X size={24} />
        </button>

        {/* Cinematic Video Section */}
        <div className="md:w-[60%] bg-black relative flex items-center group/vid">
            <div className="aspect-video md:aspect-auto h-full w-full">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${workout.shortId}?autoplay=1&mute=0&loop=1&playlist=${workout.shortId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {/* Minimal overlay when not focused */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5 rounded-[40px] md:rounded-none"></div>
        </div>

        {/* Info Section */}
        <div className="md:w-[40%] p-10 md:p-14 overflow-y-auto bg-white custom-scrollbar">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6">
                <Trophy className="w-3 h-3" />
                {workout.category}
            </div>

            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-none uppercase tracking-tighter">{workout.title}</h2>
            
            <div className="flex gap-6 mb-10 border-b border-gray-100 pb-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Difficulty</span>
                    <div className="flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-black text-gray-900 uppercase">{workout.difficulty}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</span>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-black text-gray-900 uppercase">{workout.duration}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Elite Execution Tips</h3>
                    <ul className="space-y-5">
                        {workout.tips.map((tip, index) => (
                            <li key={index} className="flex gap-4 group/item">
                                <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-300">
                                    <CheckCircle2 size={16} className="shrink-0" />
                                </div>
                                <span className="text-gray-600 text-sm leading-relaxed font-medium">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
                <button
                    onClick={onClose}
                    className="w-full py-5 bg-indigo-950 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-2xl shadow-indigo-100 transform active:scale-95"
                >
                    Start Training Now
                </button>
                <button
                    onClick={onClose}
                    className="w-full py-4 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                >
                    Close & Return
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
