import React from 'react';
import { Dumbbell, Timer, Flame, ArrowRight } from 'lucide-react';

const workouts = [
  {
    title: 'Agility Drills',
    description: 'Improve your footwork and reaction time with ladder and cone drills.',
    icon: Timer,
    duration: '20 min',
    difficulty: 'Intermediate',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    title: 'Strength Training',
    description: 'Build core and leg strength essential for futsal performance.',
    icon: Dumbbell,
    duration: '30 min',
    difficulty: 'Advanced',
    color: 'bg-orange-50 text-orange-700',
  },
  {
    title: 'Cardio Endurance',
    description: 'High-intensity interval training designed for match fitness.',
    icon: Flame,
    duration: '25 min',
    difficulty: 'Beginner',
    color: 'bg-red-50 text-red-700',
  },
];

export default function WorkoutHub() {
  return (
    <div className="bg-white">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Workout Hub</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your futsal game with curated workout routines designed by professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workouts.map((workout) => {
              const Icon = workout.icon;
              return (
                <div
                  key={workout.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer"
                >
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${workout.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{workout.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{workout.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {workout.duration}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {workout.difficulty}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
