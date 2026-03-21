import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { bookingService } from '../../services/bookingService';
import { Calendar, Clock, User, Shield, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change this booking status to ${newStatus}?`)) return;
    try {
      await bookingService.updateBookingStatus(id, newStatus);
      alert('Status updated successfully');
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.court_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            Global Bookings
          </h1>
          <p className="text-gray-600 mt-1">Monitor and manage all bookings across the platform.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by court, player, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none appearance-none shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
            </select>
        </div>
        <div className="flex items-center justify-end text-sm text-gray-500 font-medium">
            Found {filteredBookings.length} bookings
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading && bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center shadow-sm">
             <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
             <p className="text-gray-500">Fetching global bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center shadow-sm">
          <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No matching bookings found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-bottom border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Court</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 text-xs font-mono text-gray-400">#{booking.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{booking.court_name}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                        <div className="font-medium">{booking.user_name}</div>
                        <div className="text-[11px] text-gray-400">{booking.user_email}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <div>{new Date(booking.date).toLocaleDateString()}</div>
                      <div className="text-[11px] text-gray-400">{booking.start_time.slice(0,5)} - {booking.end_time.slice(0,5)}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(booking.status)} uppercase tracking-wider`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                        <select 
                            className="text-xs border border-gray-200 rounded-lg p-1 outline-none hover:border-indigo-300 transition"
                            value={booking.status}
                            onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                        >
                            <option value="pending">Set Pending</option>
                            <option value="confirmed">Set Confirmed</option>
                            <option value="cancelled">Set Cancelled</option>
                            <option value="completed">Set Completed</option>
                        </select>
                    </td>
                  </tr>
                ))}
            </tbody>
           </table>
          </div>
        </div>
      )}
    </div>
  );
}
