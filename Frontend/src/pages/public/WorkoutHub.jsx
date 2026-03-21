import React, { useState, useEffect } from 'react';
import WorkoutFilter from '../../components/workout/WorkoutFilter';
import WorkoutCard from '../../components/workout/WorkoutCard';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { Play, Zap, Trophy, Target, ShieldCheck } from 'lucide-react';

const workoutData = [
  {
    id: 1,
    title: 'Dynamic Leg Swings',
    category: 'Warm-Up',
    duration: '5 min',
    difficulty: 'Beginner',
    description: 'Increase hip mobility and warm up the lower body with controlled leg swings.',
    thumbnail: 'https://img.freepik.com/premium-vector/leg-swings-exercise-woman-workout-fitness-aerobic-exercises_476141-2125.jpg?w=2000',
    videoUrl: 'https://www.youtube.com/watch?v=X00_gVwX8E4',
    shortId: 'X00_gVwX8E4',
    tips: [
      'Keep your core engaged throughout.',
      'Maintain a slight bend in the standing leg.',
      'Control the movement—don\'t just use momentum.',
      'Perform 15 swings per leg.'
    ]
  },
  {
    id: 2,
    title: 'Shuttle Runs (L-Drills)',
    category: 'Agility',
    duration: '10 min',
    difficulty: 'Intermediate',
    description: 'Enhance your rapid change of direction and explosive acceleration.',
    thumbnail: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=7M7v6vPzBGE',
    shortId: '7M7v6vPzBGE',
    tips: [
      'Stay low when approaching the turns.',
      'Use small, quick steps for better balance.',
      'Explode out of every turn.',
      'Keep your eyes up, not at the cones.'
    ]
  },
  {
    id: 3,
    title: '60m Speed Bursts',
    category: 'Speed',
    duration: '15 min',
    difficulty: 'Intermediate',
    description: 'Develop peak sprinting speed and explosive takeoff from a standstill.',
    thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=4L_V3Xq_5G0',
    shortId: '4L_V3Xq_5G0',
    tips: [
      'Drive your knees high during the sprint.',
      'Pump your arms vigorously.',
      'Rest for 60-90 seconds between sets.',
      'Focus on a powerful initial drive.'
    ]
  },
  {
    id: 4,
    title: 'Weighted Bulgarian Splits',
    category: 'Strength',
    duration: '20 min',
    difficulty: 'Advanced',
    description: 'Build unilateral leg strength and stability crucial for shooting power.',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=7M7v6vPzBGE',
    shortId: '7M7v6vPzBGE',
    tips: [
      'Maintain an upright torso.',
      'Your knee should track towards your second toe.',
      'Lower yourself slowly and controlled.',
      'Don\'t let your front knee pass your toes.'
    ]
  },
  {
    id: 5,
    title: 'Figure-8 Dribbling',
    category: 'Ball Control',
    duration: '12 min',
    difficulty: 'Beginner',
    description: 'Master tight ball control and close-quarter dribbling around obstacles.',
    thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=VIdmYv0Yh7c',
    shortId: 'VIdmYv0Yh7c',
    tips: [
      'Use both the inside and outside of your feet.',
      'Keep the ball close to your foot at all times.',
      'Take many small touches rather than few big ones.',
      'Try to keep your head up to see the field.'
    ]
  },
  {
    id: 6,
    title: 'Static Quad Stretch',
    category: 'Cool Down',
    duration: '5 min',
    difficulty: 'Beginner',
    description: 'Properly cool down and stretch your quads after high-intensity play.',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=eYEnsh466e0',
    shortId: 'eYEnsh466e0',
    tips: [
      'Find a wall for balance if needed.',
      'Keep your knees close together.',
      'Push your hips slightly forward for a deeper stretch.',
      'Hold each side for 30 seconds.'
    ]
  }
];

export default function WorkoutHub() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredWorkouts = activeFilter === 'All' 
    ? workoutData 
    : workoutData.filter(workout => workout.category === activeFilter);

  const handleQuickTips = (workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a0c10] text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[#0a0c10]/80"></div>
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-gray-300">Pro-Level Performance</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                TRAIN LIKE A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">CHAMPION</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium italic">
                "The game is won in the hours you spend when no one is watching."
            </p>

            <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-white/5">
                {[
                    { icon: Target, label: "Precision Drills", val: "20+" },
                    { icon: ShieldCheck, label: "Injury Prevention", val: "100%" },
                    { icon: Trophy, label: "Pro Coaching", val: "Elite" }
                ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <stat.icon className="w-5 h-5 text-indigo-400" />
                        <span className="text-2xl font-black leading-none">{stat.val}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-32">
        {/* Featured Video Section */}
        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 group">
            <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">
                <div className="lg:col-span-3 aspect-video relative">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/TFSYNWPYujQ"
                        title="Featured Workout"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="lg:col-span-2 p-10 md:p-14 flex flex-col justify-center bg-gray-50/50">
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                        <div className="w-6 h-[2px] bg-indigo-600"></div>
                        Monthly Focus
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-tight">Dynamic Futsal Warm-Up: <span className="text-indigo-900">Elite Activation</span></h2>
                    <p className="text-gray-500 font-medium leading-relaxed mb-10">
                        A scientifically-backed routine used by professional academies to prime the nervous system and increase tissue elasticity before high-intensity play.
                    </p>
                    <button className="flex items-center gap-3 bg-indigo-950 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-indigo-100 group-hover:scale-[1.02]">
                        <Play fill="white" size={18} />
                        Watch Full Session
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <WorkoutFilter activeFilter={activeFilter} setFilter={setActiveFilter} />
        </div>

        {/* Drills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {filteredWorkouts.map((workout, index) => (
            <div 
              key={workout.id} 
              className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <WorkoutCard 
                workout={workout} 
                onQuickTips={handleQuickTips} 
              />
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100">
            <Target className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No drills found in this category</h3>
            <p className="text-gray-400 mt-2 font-medium">Check back soon for new content!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedWorkout && (
        <WorkoutModal 
          workout={selectedWorkout} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
