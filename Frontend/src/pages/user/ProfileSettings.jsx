import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera } from 'lucide-react';

export default function ProfileSettings() {
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : {
      name: 'User Name',
      email: 'user@example.com',
      phone: '+977 9800000000',
      address: 'Kathmandu, Nepal',
      role: 'player'
    };
  });

  const getInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.split(' ');
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API call and save to local storage
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8 flex items-end">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-900 text-3xl font-bold shadow-md">
                {getInitials()}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="ml-4 mb-2">
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-50 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm mt-1 capitalize">
                <Shield className="w-3 h-3" />
                {user.role} role
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="pt-20 p-8">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Personal Information</h3>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed" 
              />
              <p className="text-xs text-gray-400">Email cannot be changed directly.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                value={user.phone || ''} 
                onChange={(e) => setUser({...user, phone: e.target.value})}
                placeholder="+977 9800000000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Address Location
              </label>
              <input 
                type="text" 
                value={user.address || ''} 
                onChange={(e) => setUser({...user, address: e.target.value})}
                placeholder="Kathmandu, Nepal"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
              />
            </div>

            <div className="md:col-span-2 pt-4 flex justify-end gap-3 border-t border-gray-50 mt-2">
              <button 
                type="button" 
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border-none cursor-pointer transition-colors"
                onClick={() => {
                  const saved = localStorage.getItem('user');
                  if (saved) setUser(JSON.parse(saved));
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm border-none cursor-pointer transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
