import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourtCard from '../../components/court/CourtCard';
import MapComponent from '../../components/Map';
import { apiClient } from '../../services/apiClient';

const StarRating = ({ filled }) => (
  <span style={{ color: filled ? '#f59e0b' : '#d1d5db', fontSize: 14 }}>★</span>
);

export default function BrowsePage() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(2500); // Max reasonable price in RS
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [location, setLocation] = useState('All Locations');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await apiClient.get('/courts');
        // If your images are stored as JSON strings in the db, parse them here
        const parsedCourts = data.map(c => ({
            ...c,
            price: Number(c.price_per_hour),
            // Map common amenities or provide consistent mocks matching filter labels
            amenities: c.amenities || ['Locker Room', 'Parking', 'Cafe'], 
            image: Array.isArray(c.images) 
                    ? c.images[0]
                    : (typeof c.images === 'string' && c.images.startsWith('[') 
                        ? JSON.parse(c.images)[0] 
                        : (c.images || `https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=300&sig=${c.id}`)),
            rating: 4.5
        }));
        setCourts(parsedCourts);
      } catch (err) {
        console.error('Failed to fetch courts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  const toggleAmenity = (a) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filteredCourts = courts.filter((c) => {
    // 0. Search Filter
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search')?.toLowerCase();
    if (search && !c.name.toLowerCase().includes(search) && !c.location.toLowerCase().includes(search)) {
        return false;
    }

    // 1. Price Filter
    if (c.price > priceRange) return false;

    // 2. Location Filter
    if (location !== 'All Locations' && !c.location.includes(location)) return false;

    // 3. Amenities Filter
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(a => 
        c.amenities.some(ca => ca.toLowerCase() === a.toLowerCase())
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  if (loading) {
      return <div className="text-center py-20 text-gray-500">Loading courts...</div>;
  }

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
              {['All Locations', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Dharan', 'Biratnagar', 'Butwal', 'Chitwan', 'Hetauda', 'Kirtipur', 'Itahari', 'Bhairahawa', 'Nepalgunj'].map(
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
              min={500}
              max={2500}
              step={100}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-900"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Rs. 500</span>
              <span className="font-semibold text-indigo-900">Rs. {priceRange}</span>
              <span>Rs. 2500</span>
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Discover Futsal Courts</h2>
            <button 
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-indigo-50 text-indigo-900 rounded-lg font-semibold text-sm hover:bg-indigo-100 transition flex items-center gap-2"
            >
              {showMap ? 'Show List only' : 'Show Map view'}
              <span>{showMap ? '📋' : '🗺️'}</span>
            </button>
          </div>

          {showMap && (
            <div className="mb-8">
              <MapComponent courts={filteredCourts} height="500px" />
            </div>
          )}

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
