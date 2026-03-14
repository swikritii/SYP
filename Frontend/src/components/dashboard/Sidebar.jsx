import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Settings, LogOut, BarChart3, MapPin
} from 'lucide-react';

export default function Sidebar({ role = 'player' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = {
    player: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'My Bookings', icon: Calendar, path: '/dashboard/bookings' },
      { label: 'Browse Courts', icon: MapPin, path: '/browse-courts' },
      { label: 'Chat Hub', icon: Users, path: '/chat' },
      { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ],
    owner: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/owner/dashboard' },
      { label: 'My Courts', icon: MapPin, path: '/owner/courts' },
      { label: 'Bookings', icon: Calendar, path: '/owner/bookings' },
      { label: 'Analytics', icon: BarChart3, path: '/owner/analytics' },
      { label: 'Settings', icon: Settings, path: '/owner/settings' },
    ],
    admin: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { label: 'Users', icon: Users, path: '/admin/users' },
      { label: 'Courts', icon: MapPin, path: '/admin/courts' },
      { label: 'Bookings', icon: Calendar, path: '/admin/bookings' },
      { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  };

  const items = menuItems[role] || menuItems.player;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900 capitalize">{role} Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition bg-transparent border-none cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition bg-transparent border-none cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
