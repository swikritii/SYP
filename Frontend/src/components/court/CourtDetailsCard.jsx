import React from 'react';
import { MapPin, Clock, Star, Wifi, Car, Coffee, Droplets, ShowerHead } from 'lucide-react';

const amenityIcons = {
  'Locker Room': ShowerHead,
  'Parking': Car,
  'Water Fountain': Droplets,
  'Cafe': Coffee,
  'WiFi': Wifi,
};

export default function CourtDetailsCard({ court }) {
  if (!court) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://placehold.co/800x400/1e3a8a/white?text=${encodeURIComponent(court.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">{court.name}</h2>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{court.location}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{court.rating || '4.5'}</span>
            <span className="text-sm text-gray-500">({court.reviewCount || 0} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{court.hours || '09:00 AM - 11:00 PM'}</span>
          </div>
          <div className="text-indigo-900 font-bold text-xl">
            Rs. {court.price}
            <span className="text-sm text-gray-600 font-normal">/hr</span>
          </div>
        </div>

        {/* Description */}
        {court.description && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{court.description}</p>
          </div>
        )}

        {/* Amenities */}
        {court.amenities && court.amenities.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {court.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || Coffee;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
                  >
                    <Icon className="w-4 h-4 text-indigo-900" />
                    {amenity}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
