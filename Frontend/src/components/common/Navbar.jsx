import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, Search, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = (() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  })();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDropdownOpen(false);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse Courts', path: '/browse-courts' },
    { label: 'Workout Hub', path: '/workout-hub' },
  ];

  const isActive = (path) => location.pathname === path;

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.split(' ');
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-9 h-9 bg-indigo-900 rounded-lg flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">FutsalFlow</span>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`text-sm font-medium transition bg-transparent border-none cursor-pointer p-0 ${
                    isActive(link.path)
                      ? 'text-indigo-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer rounded-lg hover:bg-gray-100 transition">
              <Search className="w-5 h-5" />
            </button>

            {token ? (
              /* Logged-in: Avatar + Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold text-sm border-2 border-indigo-200">
                    {getInitials()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>

                    <button
                      onClick={() => { 
                        const role = user?.role || 'player';
                        if (role === 'admin') navigate('/admin');
                        else if (role === 'owner') navigate('/owner/dashboard');
                        else navigate('/dashboard');
                        setDropdownOpen(false); 
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 bg-transparent border-none cursor-pointer transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('/dashboard/settings'); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 bg-transparent border-none cursor-pointer transition"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 bg-transparent border-none cursor-pointer transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in: Login + Sign Up */
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium bg-transparent border-none cursor-pointer px-3 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-800 transition text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-indigo-900 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.path); setMobileOpen(false); }}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium bg-transparent border-none cursor-pointer ${
                    isActive(link.path)
                      ? 'text-indigo-900 bg-indigo-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-1">
                {token ? (
                  <>
                    <div className="px-3 py-2 flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xs">
                        {getInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                      className="text-left px-3 py-2.5 text-sm text-gray-700 font-medium bg-transparent border-none cursor-pointer hover:bg-gray-50 rounded-lg"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="text-left px-3 py-2.5 text-sm text-red-600 font-medium bg-transparent border-none cursor-pointer hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { navigate('/login'); setMobileOpen(false); }}
                      className="text-left px-3 py-2.5 text-sm text-gray-700 font-medium bg-transparent border-none cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { navigate('/signup'); setMobileOpen(false); }}
                      className="mx-3 py-2.5 bg-indigo-900 text-white rounded-lg font-semibold text-sm border-none cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
