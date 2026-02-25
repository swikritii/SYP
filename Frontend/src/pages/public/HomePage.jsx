import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import CourtCard from '../../components/court/CourtCard';

export default function HomePage() {
  const navigate = useNavigate();

  const courts = [
    {
      id: 1,
      name: 'Thunderdome Futsal Arena',
      location: 'Sporty Heights, CA',
      rating: 4.8,
      price: 35,
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Urban Kicks Futsal Club',
      location: 'Downtown City, NY',
      rating: 4.7,
      price: 40,
      image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'The Pitch Pro Centre',
      location: 'Green Meadows, TX',
      rating: 4.9,
      price: 30,
      image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Goals Galore',
      location: 'East Side, IL',
      rating: 4.6,
      price: 28,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Game Starts Here
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover, Book, and Play at the Best Futsal Courts Near You. Join thousands of players
              finding their perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/browse-courts')}
                className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                Book Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/browse-courts')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-900 transition"
              >
                Browse Courts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courts Section */}
      <section className="py-16 bg-gray-50">
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
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/browse-courts')}
              className="inline-flex items-center gap-2 bg-indigo-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              View All Courts
              <ArrowRight className="w-4 h-4" />
            </button>
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
    </div>
  );
}
