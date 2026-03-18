import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { Calendar, Clock, MapPin, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function PlayerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await bookingService.cancelBooking(id);
      alert('Booking cancelled successfully');
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
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your bookings...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your court reservations and history.</p>
        </div>
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
          <p className="text-gray-500 mt-1 max-w-xs mx-auto">Once you book a court, it will appear here for you to manage.</p>
          <button 
            onClick={() => window.location.href = '/browse-courts'}
            className="mt-6 bg-indigo-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-800 transition"
          >
            Browse Courts
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img 
                       src={booking.court_image || 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&q=80'} 
                       alt={booking.court_name}
                       className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-900 transition">{booking.court_name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin className="w-3.5 h-3.5" />
                            {booking.location}
                        </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)} uppercase tracking-wider`}>
                    {booking.status}
                  </span>
                  
                  {booking.status === 'pending' || booking.status === 'confirmed' ? (
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                      title="Cancel Booking"
                    >
                      <XCircle className="w-5 h-5" />
                      <span className="md:hidden lg:inline">Cancel</span>
                    </button>
                  ) : booking.status === 'cancelled' && (
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-400 p-2">
                        <XCircle className="w-5 h-5" />
                        Cancelled
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
