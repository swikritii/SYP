import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Button from '../common/Button';

export default function BookingForm({ court, onSubmit }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
    '09:00 PM', '10:00 PM',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        courtId: court?.id,
        date: selectedDate,
        time: selectedTime,
        duration,
        totalPrice: (court?.price || 0) * duration,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Book This Court</h3>
      <p className="text-sm text-gray-500 mb-6">Select your preferred date and time</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4" />
            Time Slot
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            required
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Duration (hours)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map((hr) => (
              <button
                key={hr}
                type="button"
                onClick={() => setDuration(hr)}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition ${
                  duration === hr
                    ? 'bg-indigo-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {hr}h
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>${court?.price || 0} × {duration} hour{duration > 1 ? 's' : ''}</span>
            <span>${(court?.price || 0) * duration}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200 pt-2 mt-2">
            <span>Total</span>
            <span className="text-indigo-900">${(court?.price || 0) * duration}</span>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Book Now
        </Button>
      </form>
    </div>
  );
}
