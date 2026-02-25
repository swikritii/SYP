import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';

export default function PlayerDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user.name || 'Player'}!</h1>
      <p className="text-gray-500 mb-8">Here's an overview of your activity.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Bookings" value="12" icon={Calendar} color="indigo" trend={8} />
        <StatsCard title="Courts Visited" value="5" icon={MapPin} color="green" />
        <StatsCard title="Hours Played" value="24" icon={Clock} color="blue" trend={15} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
        <p className="text-gray-400 text-sm">No upcoming bookings. Browse courts to book your next game!</p>
      </div>
    </div>
  );
}
