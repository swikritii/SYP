import { useState, useEffect } from 'react';
import { courtService } from '../../services/courtService';
import { Plus, Edit2, Trash2, MapPin, DollarSign, Image as ImageIcon, Video, X, Save } from 'lucide-react';

export default function OwnerCourts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price_per_hour: '',
    description: '',
    images: '',
    video_url: ''
  });

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const data = await courtService.getAllCourts();
      // Filter for courts owned by the current user (this should ideally be done in the backend /owner endpoint if it exists)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const myCourts = data.filter(c => c.owner_id === user.id);
      setCourts(myCourts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        images: formData.images.split(',').map(s => s.trim()).filter(s => s !== '')
      };

      if (editingCourt) {
        await courtService.updateCourt(editingCourt.id, dataToSubmit);
      } else {
        await courtService.createCourt(dataToSubmit);
      }

      setShowModal(false);
      setEditingCourt(null);
      resetForm();
      fetchCourts();
      alert(`Court ${editingCourt ? 'updated' : 'added'} successfully`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (court) => {
    setEditingCourt(court);
    let parsedImages = [];
    try {
      parsedImages = Array.isArray(court.images) ? court.images : JSON.parse(court.images || '[]');
    } catch (e) {
      parsedImages = [];
    }

    setFormData({
      name: court.name,
      location: court.location,
      price_per_hour: court.price_per_hour,
      description: court.description || '',
      images: Array.isArray(parsedImages) ? parsedImages.join(', ') : '',
      video_url: court.video_url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this court?')) return;
    try {
      await courtService.deleteCourt(id);
      fetchCourts();
      alert('Court deleted successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      price_per_hour: '',
      description: '',
      images: '',
      video_url: ''
    });
  };

  if (loading && courts.length === 0) return <div className="p-10 text-center">Loading courts...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courts</h1>
          <p className="text-gray-500 mt-1">Manage your court listings and availability.</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingCourt(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-indigo-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-800 transition shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Court
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
               <img 
                 src={(Array.isArray(court.images) ? court.images[0] : (typeof court.images === 'string' && court.images.startsWith('[') ? JSON.parse(court.images)[0] : court.images)) || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=300'} 
                 alt={court.name}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute top-3 right-3 flex gap-2">
                 <button onClick={() => handleEdit(court)} className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white hover:text-indigo-600 transition shadow-sm">
                   <Edit2 className="w-4 h-4" />
                 </button>
                 <button onClick={() => handleDelete(court)} className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white hover:text-red-600 transition shadow-sm">
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1">{court.name}</h3>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                <MapPin className="w-4 h-4" />
                {court.location}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1 text-indigo-900 font-bold">
                  <DollarSign className="w-4 h-4" />
                  <span>{court.price_per_hour} <span className="text-[10px] text-gray-400 font-medium">/ hr</span></span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">{editingCourt ? 'Edit Court' : 'Add New Court'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Court Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Dream Futsal Arena"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Kathmandu, Nepal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Price / Hour (Rs.)</label>
                    <input
                      required
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                      value={formData.price_per_hour}
                      onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
                      placeholder="e.g. 1500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 italic">Images (Comma separated URLs)</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                        value={formData.images}
                        onChange={(e) => setFormData({...formData, images: e.target.value})}
                        placeholder="https://image1.jpg, https://image2.jpg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Video URL (Optional)</label>
                    <div className="relative">
                      <Video className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                        value={formData.video_url}
                        onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                        placeholder="YouTube link"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Briefly describe your court..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-800 transition shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  {editingCourt ? 'Update Court' : 'Save Court'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
