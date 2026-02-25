import React from 'react';
import { Users, MapPin, BarChart3 } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';

export default function AdminPanel() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Panel</h1>
      <p className="text-gray-500 mb-8">System overview and management.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Users" value="1,248" icon={Users} color="indigo" trend={5} />
        <StatsCard title="Total Courts" value="52" icon={MapPin} color="green" trend={3} />
        <StatsCard title="Active Bookings" value="87" icon={BarChart3} color="blue" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">System Activity</h2>
        <p className="text-gray-400 text-sm">Activity logs will appear here.</p>
      </div>
    </div>
  );
}
