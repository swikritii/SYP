import React, { useState, useEffect } from 'react';
import { Users, MapPin, BarChart3, DollarSign, Activity, Settings, ShieldAlert, ArrowRight } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import { apiClient } from '../../services/apiClient';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchStats = async () => {
          try {
              const data = await apiClient.get('/admin/dashboard');
              setStats(data);
          } catch (err) {
              console.error('Failed to load admin stats:', err);
          } finally {
              setLoading(false);
          }
      };
      fetchStats();
  }, []);

  if (loading) return (
      <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  // Mock system health data
  const systemHealth = [
      { name: 'Database Status', status: 'Healthy', ping: '12ms', color: 'bg-green-500' },
      { name: 'API Latency', status: 'Optimal', ping: '45ms', color: 'bg-green-500' },
      { name: 'Active WebSockets', status: 'High Traffic', ping: '24ms', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">Admin Command Center</h1>
          <p className="text-gray-500">Platform-wide overview and system management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value={stats?.totalUsers || 0} icon={Users} color="indigo" trend={5} />
        <StatsCard title="Total Courts" value={stats?.totalCourts || 0} icon={MapPin} color="green" trend={3} />
        <StatsCard title="Total Bookings" value={stats?.totalBookings || 0} icon={BarChart3} color="blue" trend={15} />
        <StatsCard title="Total Revenue" value={`Rs. ${stats?.totalRevenue || 0}`} icon={DollarSign} color="amber" trend={24} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* System Health */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">System Health</h2>
                <Activity className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-6 flex-1">
                {systemHealth.map((sys, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${sys.color} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${sys.color}`}></span>
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{sys.name}</p>
                                <p className="text-xs text-gray-500">{sys.status}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{sys.ping}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 py-2.5 rounded-xl transition-colors">
                    <Settings className="w-4 h-4" /> System Settings
                </button>
            </div>
        </div>

        {/* Quick Actions & Modules */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Management Modules</h2>
                <ShieldAlert className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50 hover:border-indigo-100 transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Manage Users</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">Update roles, ban accounts, and monitor user behavior across the platform.</p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600">
                        Access Module <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>

                <div className="group p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-green-50 hover:border-green-100 transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Manage Courts</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">Verify new courts, suspend listings, and oversee owner compliance.</p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-semibold text-green-600">
                        Access Module <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>

                <div className="group p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer flex flex-col justify-between hidden sm:flex">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Global Bookings</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">View every single booking happening right now in the ecosystem.</p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-semibold text-blue-600">
                        Access Module <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
