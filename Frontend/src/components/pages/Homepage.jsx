import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';

function Homepage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const courts = [
    {
      name: 'Thunderdome Futsal Arena',
      location: 'Sporty Heights, CA',
      rating: 4.8,
      price: 35,
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=300&fit=crop'
    },
    {
      name: 'Urban Kicks Futsal Club',
      location: 'Downtown City, NY',
      rating: 4.7,
      price: 40,
      image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=300&fit=crop'
    },
    {
      name: 'The Pitch Pro Centre',
      location: 'Green Meadows, TX',
      rating: 4.9,
      price: 30,
      image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=300&fit=crop'
    },
    {
      name: 'Goals Galore',
      location: 'East Side, IL',
      rating: 4.6,
      price: 28,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
    }
  ];

  const [user] = useState(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold">
                FF
              </div>
              <span className="text-xl font-bold text-gray-900">FutsalFlow</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-gray-700 hover:text-indigo-900 font-medium transition">Home</a>
              <a href="#courts" className="text-gray-700 hover:text-indigo-900 font-medium transition">Browse Courts</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-900 font-medium transition">About</a>
            </nav>

            <div className="flex items-center gap-4">
              {user && (
                <span className="hidden sm:block text-sm text-gray-600">Welcome, {user.name || user.email}</span>
              )}
              <button 
                onClick={handleLogout}
                className="bg-indigo-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Futsal Theme */}
      <section id="home" className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600&h=900&fit=crop)',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Game Starts Here
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover, Book, and Play at the Best Futsal Courts Near You. Join thousands of players finding their perfect match.
            </p>
            
            {/* Book Now Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition shadow-lg hover:shadow-xl flex items-center gap-2 group">
                Book Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-900 transition">
                Browse Courts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courts Section */}
      <section id="courts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Futsal Courts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the best futsal facilities around, handpicked for quality and player experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.map((court, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={court.image} 
                    alt={court.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{court.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{court.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{court.rating}</span>
                    </div>
                    <div className="text-gray-900 font-bold text-lg">
                      ${court.price}<span className="text-sm text-gray-600 font-normal">/hr</span>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-900 text-white py-2 rounded-lg font-medium hover:bg-indigo-800 transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-indigo-900 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Courts Listed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-indigo-900 mb-2">12K+</div>
              <div className="text-gray-600 text-lg">Matches Booked</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-indigo-900 mb-2">4.8</div>
              <div className="text-gray-600 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-900 font-bold">
                FF
              </div>
              <span className="text-xl font-bold">FutsalFlow</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Your ultimate platform for booking futsal courts and staying active.
            </p>
            <div className="border-t border-gray-800 pt-8 text-sm text-gray-400">
              © 2025 FutsalFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
