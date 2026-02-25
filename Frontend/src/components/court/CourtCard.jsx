import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

export default function CourtCard({ court }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/court/${court.id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/1e3a8a/white?text=${encodeURIComponent(court.name)}`;
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{court.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{court.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{court.rating || '4.5'}</span>
          </div>
          <div className="text-gray-900 font-bold text-lg">
            ${court.price}
            <span className="text-sm text-gray-600 font-normal">/hr</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/court/${court.id}`);
          }}
          className="w-full bg-indigo-900 text-white py-2 rounded-lg font-medium hover:bg-indigo-800 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
