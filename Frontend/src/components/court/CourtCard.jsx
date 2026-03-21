import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export default function CourtCard({ court }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/court/${court.id}`)}
      className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-gray-100 flex flex-col h-full hover:-translate-y-2"
    >
      <div className="h-56 bg-gray-100 relative overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=300&fit=crop`;
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm border border-white/50">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-gray-900">{court.rating || '4.5'}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-auto">
            <h3 className="font-black text-xl text-gray-900 mb-2 leading-tight uppercase tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{court.name}</h3>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>{court.location}</span>
            </div>
        </div>
        
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="text-gray-900 font-black text-xl">
            Rs. {court.price}
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1.5">/ hr</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
