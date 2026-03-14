import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import { apiClient } from '../../services/apiClient';

export default function PlayerDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiClient.get('/bookings/me');
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  const totalBookings = bookings.length;
  // Unique courts visited
  const uniqueCourts = new Set(bookings.map(b => b.court_id)).size;
  // Approximate hours played (assuming 1 hour per booking if start/end times aren't parsed)
  const hoursPlayed = bookings.reduce((total, b) => {
    // Basic calculation if we have times
    try {
        const start = new Date(`1970-01-01T${b.start_time}`);
        const end = new Date(`1970-01-01T${b.end_time}`);
        const hours = (end - start) / (1000 * 60 * 60);
        return total + Math.max(0, hours);
    } catch {
        return total + 1;
    }
  }, 0);

  const upcomingBookings = bookings.filter(b => new Date(b.date) >= new Date()).slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user.name || 'Player'}!</h1>
      <p className="text-gray-500 mb-8">Here's an overview of your activity.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Bookings" value={totalBookings} icon={Calendar} color="indigo" />
        <StatsCard title="Courts Visited" value={uniqueCourts} icon={MapPin} color="green" />
        <StatsCard title="Hours Played" value={Math.round(hoursPlayed)} icon={Clock} color="blue" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        <h2 className="font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
        
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming bookings. Browse courts to book your next game!</p>
        ) : (
          <div className="divide-y divide-gray-100 -mx-6 px-6">
             {upcomingBookings.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{b.court_name}</h3>
                    <p className="text-xs text-gray-500">{new Date(b.date).toLocaleDateString()} at {b.start_time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {b.status}
                  </span>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
