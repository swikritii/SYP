import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users, TrendingUp, BarChart3 } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import { apiClient } from '../../services/apiClient';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await apiClient.get('/bookings/owner');
        setBookings(books);
      } catch (err) {
        console.error('Failed to fetch owner logic', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const totalBookings = bookings.length;
  const activeCourts = new Set(bookings.map(b => b.court_id)).size;
  
  const revenue = bookings.reduce((total, b) => {
      try {
          const start = new Date(`1970-01-01T${b.start_time}`);
          const end = new Date(`1970-01-01T${b.end_time}`);
          const hours = (end - start) / (1000 * 60 * 60);
          return total + (b.price_per_hour || 50) * Math.max(0, hours);
      } catch {
          return total + (b.price_per_hour || 50);
      }
  }, 0);

  const recentBookings = bookings.slice(0, 5);

  // Mock data for the chart
  const weeklyData = [
      { day: 'Mon', value: 45 }, { day: 'Tue', value: 52 }, 
      { day: 'Wed', value: 38 }, { day: 'Thu', value: 65 }, 
      { day: 'Fri', value: 89 }, { day: 'Sat', value: 120 }, { day: 'Sun', value: 110 }
  ];
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600 mb-2">Owner Analytics</h1>
          <p className="text-gray-500">Welcome back. Here's what's happening with your properties today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Bookings" value={totalBookings} icon={Calendar} color="indigo" trend={12} />
        <StatsCard title="Active Courts" value={activeCourts} icon={MapPin} color="green" trend={-2} />
        <StatsCard title="Revenue (Est.)" value={`Rs. ${Math.round(revenue)}`} icon={DollarSign} color="amber" trend={18} />
        <StatsCard title="Conversion Rate" value="24%" icon={TrendingUp} color="blue" trend={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                  <button onClick={() => navigate('/owner/courts')} className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 transition group border-none cursor-pointer">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-indigo-100"><MapPin className="w-4 h-4" /></div>
                          <span className="text-sm font-semibold">Add New Court</span>
                      </div>
                      <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button onClick={() => navigate('/owner/bookings')} className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 transition group border-none cursor-pointer">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-100"><Calendar className="w-4 h-4" /></div>
                          <span className="text-sm font-semibold">View Bookings</span>
                      </div>
                      <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button onClick={() => navigate('/owner/analytics')} className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-amber-50 hover:text-amber-700 transition group border-none cursor-pointer">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-amber-100"><BarChart3 className="w-4 h-4" /></div>
                          <span className="text-sm font-semibold">Detailed Reports</span>
                      </div>
                      <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
              </div>
          </div>

          {/* Revenue Chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-6">
                  <div>
                      <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
                      <p className="text-sm text-gray-500">Weekly earnings across all courts</p>
                  </div>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                  </div>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2 pt-4">
                  {weeklyData.map((data, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="relative w-full rounded-t-lg bg-indigo-50 flex items-end overflow-hidden h-full group-hover:bg-indigo-100 transition-colors">
                              <div 
                                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-1000 ease-out"
                                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                              >
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                      Rs.{data.value}
                                  </div>
                              </div>
                          </div>
                          <span className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">{data.day}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {recentBookings.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-sm">No recent bookings found for your courts.</p>
                </div>
                ) : (
                <div className="space-y-6">
                    {recentBookings.map((b, idx) => (
                        <div key={idx} className="flex gap-4 relative">
                            {idx !== recentBookings.length - 1 && (
                                <div className="absolute top-8 left-5 bottom-[-24px] w-px bg-gray-100"></div>
                            )}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center flex-shrink-0 z-10 border-2 border-white shadow-sm">
                                <Users className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{b.user_name} <span className="font-normal text-gray-500">booked</span> {b.court_name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {new Date(b.date).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs text-gray-400">{b.start_time} - {b.end_time}</span>
                                </div>
                                <div className="mt-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                                        b.status === 'confirmed' ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}>
                                        {b.status === 'confirmed' ? <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> : <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
                                        {b.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
          </div>
      </div>
    </div>
  );
}
