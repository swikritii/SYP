import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getOwnerBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const action = newStatus === 'confirmed' ? 'confirm' : 'cancel';
    if (!window.confirm(`Are you sure you want to ${action} this booking?`)) return;
    
    try {
      await bookingService.updateBookingStatus(id, newStatus);
      alert(`Booking ${newStatus} successfully`);
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Court Bookings</h1>
          <p className="text-gray-600 mt-1">Manage reservations for all your courts.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"
          title="Refresh Bookings"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
          <p className="text-gray-500 mt-1">When players book your courts, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-bottom border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Court</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{booking.court_name}</div>
                      <div className="text-xs text-gray-500">{booking.location}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{booking.user_name}</div>
                          <div className="text-xs text-gray-500">{booking.user_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(booking.status)} uppercase tracking-wider`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {booking.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Confirm Booking"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                         <button 
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition text-xs font-bold"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                      )}
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
