import { useState, useEffect } from 'react';
import { courtService } from '../../services/courtService';
import { Search, MapPin, DollarSign, Shield, Trash2, Edit2, Filter, RefreshCw, User } from 'lucide-react';

export default function AdminCourts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const data = await courtService.getAllCourts();
      setCourts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ADMIN ACTION: Are you sure you want to PERMANENTLY delete this court? This cannot be undone.')) return;
    try {
      await courtService.deleteCourt(id);
      fetchCourts();
      alert('Court deleted successfully by Admin');
    } catch (err) {
      alert(err.message);
    }
  };

  const locations = ['All', ...new Set(courts.map(c => c.location.split(',').pop().trim()))];

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         court.owner_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All' || court.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  if (loading && courts.length === 0) return <div className="p-10 text-center">Loading all system courts...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            System Courts
          </h1>
          <p className="text-gray-600 mt-1">Global oversight of all futsal court listings.</p>
        </div>
        <button 
          onClick={fetchCourts}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by name, location, or owner..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none appearance-none shadow-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
            >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-bottom border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Court Info</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price/hr</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCourts.map((court) => (
              <tr key={court.id} className="hover:bg-gray-50/50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={(Array.isArray(court.images) ? court.images[0] : (typeof court.images === 'string' && court.images.startsWith('[') ? JSON.parse(court.images)[0] : court.images)) || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=200&h=150'} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{court.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {court.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    {court.owner_name || 'System'}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-bold text-indigo-900">
                    <DollarSign className="w-4 h-4" />
                    {court.price_per_hour}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-wider">
                    Verified
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit Court (Coming Soon)">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(court.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Court">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCourts.length === 0 && (
          <div className="p-20 text-center text-gray-400">
             <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p>No courts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
