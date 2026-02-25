import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md z-10 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Video Section */}
          <div className="md:w-1/2 bg-black flex items-center">
             <div className="aspect-[9/16] w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${workout.shortId}?autoplay=1&mute=1&loop=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
             </div>
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{workout.title}</h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">
                {workout.difficulty}
              </span>
              <span className="text-gray-400 text-sm italic">{workout.duration} routine</span>
            </div>

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Tips</h3>
            <ul className="space-y-4">
              {workout.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onClose}
              className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-gray-200"
            >
              Got it, let's go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
