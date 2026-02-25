import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = (() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  })();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse Courts', path: '/browse-courts' },
    { label: 'Workout Hub', path: '/workout-hub' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-indigo-900 rounded-lg flex items-center justify-center text-white">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">FutsalFlow</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`font-medium transition bg-transparent border-none cursor-pointer p-0 pb-0.5 ${
                  isActive(link.path)
                    ? 'text-indigo-900 border-b-2 border-indigo-900'
                    : 'text-gray-700 hover:text-indigo-900 border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-700 hover:text-indigo-900 bg-transparent border-none cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
            {token ? (
              <>
                {user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name || user.email}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-indigo-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-indigo-900 font-medium bg-transparent border-none cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition text-sm"
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
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    navigate(link.path);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg font-medium bg-transparent border-none cursor-pointer ${
                    isActive(link.path)
                      ? 'text-indigo-900 bg-indigo-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
                {token ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="text-left px-3 py-2 text-red-600 font-medium bg-transparent border-none cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setMobileOpen(false);
                      }}
                      className="text-left px-3 py-2 text-gray-700 font-medium bg-transparent border-none cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup');
                        setMobileOpen(false);
                      }}
                      className="text-left px-3 py-2 bg-indigo-900 text-white rounded-lg font-medium border-none cursor-pointer"
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
