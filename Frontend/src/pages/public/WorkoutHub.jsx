import React, { useState, useEffect } from 'react';
import WorkoutFilter from '../../components/workout/WorkoutFilter';
import WorkoutCard from '../../components/workout/WorkoutCard';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { Play } from 'lucide-react';

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
    thumbnail: 'https://www.runnersworld.com/uk/training/beginners/a33455616/running-track/',
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
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <section className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} pt-12 pb-16 px-4`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Pre-Match <span className="text-blue-600">Warm-Up</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Prepare your body for peak performance and minimize injury risk. Access our curated collection of pro-level football drills and routines.
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
            <div className="aspect-video relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/watch?v=TFSYNWPYujQ"
                title="Featured Workout"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dynamic Futsal Warm-Up: Full Body Activation</h2>
                        <p className="text-gray-500 max-w-xl">A comprehensive routine to activate all major muscle groups and boost cardiovascular readiness before your match.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 group-hover:scale-105 active:scale-95">
                        <Play fill="white" size={20} />
                        Get Started
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Filter Section */}
        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <WorkoutFilter activeFilter={activeFilter} setFilter={setActiveFilter} />
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredWorkouts.map((workout, index) => (
            <div 
              key={workout.id} 
              className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <WorkoutCard 
                workout={workout} 
                onQuickTips={handleQuickTips} 
              />
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No drills found in this category. Check back soon!</p>
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
