import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';

export default function BookingSummary({ booking }) {
  if (!booking) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-8 h-8 text-green-500" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">Booking Confirmed!</h3>
          <p className="text-sm text-gray-500">Your court has been reserved</p>
        </div>
      </div>

      <div className="space-y-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-indigo-900" />
          <div>
            <p className="text-xs text-gray-500">Court</p>
            <p className="font-medium text-gray-900">{booking.courtName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-indigo-900" />
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="font-medium text-gray-900">{booking.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-900" />
          <div>
            <p className="text-xs text-gray-500">Time & Duration</p>
            <p className="font-medium text-gray-900">
              {booking.time} · {booking.duration} hour{booking.duration > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
        <span className="text-gray-600">Total Paid</span>
        <span className="text-xl font-bold text-indigo-900">Rs. {booking.totalPrice}</span>
      </div>
    </div>
  );
}
