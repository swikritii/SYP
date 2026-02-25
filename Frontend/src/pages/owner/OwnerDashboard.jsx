import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';

export default function OwnerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Owner Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage your courts and view analytics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Bookings" value="142" icon={Calendar} color="indigo" trend={12} />
        <StatsCard title="Active Courts" value="3" icon={MapPin} color="green" />
        <StatsCard title="Revenue" value="Rs. 4,250" icon={DollarSign} color="orange" trend={18} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Bookings</h2>
        <p className="text-gray-400 text-sm">Recent bookings will appear here.</p>
      </div>
    </div>
  );
}
