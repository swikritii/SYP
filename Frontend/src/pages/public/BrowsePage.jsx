import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourtCard from '../../components/court/CourtCard';

const courts = [
  {
    id: 1,
    name: 'Urban Arena Futsal',
    location: 'Jakarta, Indonesia',
    price: 75,
    hours: '09:00 AM - 11:00 PM',
    amenities: ['Locker Room', 'Parking', 'Cafe', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Elite Futsal Center',
    location: 'Bandung, Indonesia',
    price: 90,
    hours: '08:00 AM - 10:00 PM',
    amenities: ['Locker Room', 'Water Fountain', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&q=80',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Greenlight Sports Arena',
    location: 'Surabaya, Indonesia',
    price: 60,
    hours: '07:00 AM - 09:00 PM',
    amenities: ['Parking', 'Water Fountain'],
    image: 'https://images.unsplash.com/photo-1551958219-acbc608fda15?w=400&q=80',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Victory Futsal Court',
    location: 'Medan, Indonesia',
    price: 80,
    hours: '10:00 AM - 12:00 AM',
    amenities: ['Locker Room', 'Cafe', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Pekanbaru Sport Hall',
    location: 'Pekanbaru, Indonesia',
    price: 70,
    hours: '09:00 AM - 10:00 PM',
    amenities: ['Parking', 'Locker Room'],
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&q=80',
    rating: 4.2,
  },
  {
    id: 6,
    name: 'Mega Futsal Arena',
    location: 'Jakarta, Indonesia',
    price: 95,
    hours: '08:30 AM - 11:30 PM',
    amenities: ['Locker Room', 'Parking', 'Cafe', 'WiFi', 'Water Fountain'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
    rating: 4.9,
  },
];

const StarRating = ({ filled }) => (
  <span style={{ color: filled ? '#f59e0b' : '#d1d5db', fontSize: 14 }}>★</span>
);

export default function BrowsePage() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(150);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [location, setLocation] = useState('All Locations');

  const toggleAmenity = (a) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filteredCourts = courts.filter((c) => {
    if (c.price > priceRange) return false;
    if (location !== 'All Locations' && !c.location.includes(location)) return false;
    if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => c.amenities.includes(a)))
      return false;
    return true;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 text-sm text-gray-500">
        <span
          onClick={() => navigate('/')}
          className="cursor-pointer text-indigo-900 hover:underline"
        >
          Home
        </span>
        {' / '}
        <span className="text-gray-700 font-medium">Browse Courts</span>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-56 flex-shrink-0 bg-white rounded-xl p-5 border border-gray-200 sticky top-20 self-start">
          <h3 className="text-base font-bold text-gray-900 mb-5">Filters</h3>

          {/* Location */}
          <div className="mb-5">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              {['All Locations', 'Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Pekanbaru'].map(
                (l) => (
                  <option key={l}>{l}</option>
                )
              )}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-5">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Price Range</span>
            <input
              type="range"
              min={50}
              max={150}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-900"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$50</span>
              <span className="font-semibold text-indigo-900">${priceRange}</span>
              <span>$150</span>
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-5">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Ratings</span>
            {[5, 4].map((r) => (
              <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                <input type="radio" name="rating" className="accent-indigo-900" />
                <span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarRating key={i} filled={i < r} />
                  ))}
                  {' & Up'}
                </span>
              </label>
            ))}
          </div>

          {/* Amenities */}
          <div className="mb-5">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Amenities</span>
            {['Locker Room', 'Parking', 'Water Fountain', 'Cafe'].map((a) => (
              <label key={a} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  className="accent-indigo-900"
                />
                {a}
              </label>
            ))}
          </div>

          <button className="w-full bg-indigo-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-800 transition">
            Apply Filters
          </button>
        </aside>

        {/* Court listings */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Futsal Courts</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>

          {filteredCourts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">⚽</div>
              <p>No courts match your filters. Try adjusting them!</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 text-sm">
              ← Previous
            </button>
            <span className="text-sm text-gray-700 font-medium">Page 1 of 2</span>
            <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
