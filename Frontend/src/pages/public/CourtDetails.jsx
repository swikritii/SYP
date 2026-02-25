import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Star, Clock, Phone, Mail, ChevronLeft, ChevronRight,
  Wifi, Car, Coffee, Droplets, ShowerHead, Shield, Users, Calendar
} from 'lucide-react';
import BookingForm from '../../components/booking/BookingForm';

// Mock data — replace with API call later
const courtsData = {
  1: {
    id: 1,
    name: 'Urban Arena Futsal',
    location: 'Jakarta, Indonesia',
    address: '123 Sport Street, Central Jakarta, DKI Jakarta 10110',
    price: 75,
    rating: 4.8,
    reviewCount: 128,
    hours: '09:00 AM - 11:00 PM',
    phone: '+62 21 1234 5678',
    email: 'info@urbanarena.com',
    description:
      'Urban Arena Futsal is a state-of-the-art indoor futsal facility located in the heart of Jakarta. Featuring FIFA-quality synthetic turf, professional lighting systems, and climate-controlled environments, we provide the ultimate futsal experience for both recreational and competitive players.',
    amenities: ['Locker Room', 'Parking', 'Cafe', 'WiFi', 'Water Fountain'],
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    ],
    rules: [
      'Proper futsal shoes required (no outdoor cleats)',
      'Maximum 12 players per court',
      'No food or drinks on the court',
      'Cancellation must be made 24 hours in advance',
    ],
    reviews: [
      { id: 1, user: 'Adi Pratama', rating: 5, date: '2025-02-10', comment: 'Excellent facility! The turf quality is top-notch and the staff is very friendly.' },
      { id: 2, user: 'Sarah Lee', rating: 4, date: '2025-02-05', comment: 'Great location and amenities. Parking was easy to find.' },
      { id: 3, user: 'Budi Santoso', rating: 5, date: '2025-01-28', comment: 'Best futsal court in Jakarta. We play here every weekend!' },
    ],
  },
  2: {
    id: 2,
    name: 'Elite Futsal Center',
    location: 'Bandung, Indonesia',
    address: '456 Champions Ave, Bandung, West Java 40115',
    price: 90,
    rating: 4.7,
    reviewCount: 95,
    hours: '08:00 AM - 10:00 PM',
    phone: '+62 22 9876 5432',
    email: 'book@elitefutsal.id',
    description:
      'Elite Futsal Center offers premium indoor courts with professional-grade facilities. Perfect for tournaments, team practices, and friendly matches.',
    amenities: ['Locker Room', 'Water Fountain', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
    ],
    rules: ['Proper futsal shoes required', 'Maximum 10 players per court', 'Cancellation 12 hours in advance'],
    reviews: [
      { id: 1, user: 'Rina K.', rating: 5, date: '2025-02-12', comment: 'Amazing court quality!' },
      { id: 2, user: 'Dino M.', rating: 4, date: '2025-02-01', comment: 'Good place but a bit pricey.' },
    ],
  },
};

// Default for any id not in mock
const defaultCourt = {
  id: 0,
  name: 'Futsal Court',
  location: 'Location',
  address: 'Address not available',
  price: 50,
  rating: 4.5,
  reviewCount: 0,
  hours: '09:00 AM - 10:00 PM',
  phone: 'N/A',
  email: 'N/A',
  description: 'A great futsal court. More details coming soon!',
  amenities: ['Parking'],
  images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80'],
  rules: ['Please follow court rules.'],
  reviews: [],
};

const amenityIcons = {
  'Locker Room': ShowerHead,
  'Parking': Car,
  'Water Fountain': Droplets,
  'Cafe': Coffee,
  'WiFi': Wifi,
};

export default function CourtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const court = courtsData[id] || { ...defaultCourt, id: Number(id), name: `Court #${id}` };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % court.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + court.images.length) % court.images.length);
  };

  const handleBooking = (bookingData) => {
    alert(`Booking submitted!\n\nCourt: ${court.name}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nDuration: ${bookingData.duration}h\nTotal: Rs. ${bookingData.totalPrice}`);
  };

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'reviews', label: `Reviews (${court.reviews?.length || 0})` },
    { key: 'rules', label: 'Rules' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 text-sm text-gray-500">
        <span onClick={() => navigate('/')} className="cursor-pointer text-indigo-900 hover:underline">Home</span>
        {' / '}
        <span onClick={() => navigate('/browse-courts')} className="cursor-pointer text-indigo-900 hover:underline">Browse Courts</span>
        {' / '}
        <span className="text-gray-700 font-medium">{court.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[16/9]">
              <img
                src={court.images[currentImageIndex]}
                alt={`${court.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x450/1e3a8a/white?text=${encodeURIComponent(court.name)}`;
                }}
              />
              {court.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {court.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition ${
                          i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              {/* Thumbnail strip */}
              {court.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                  <div className="flex gap-2 justify-center">
                    {court.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                          i === currentImageIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Court Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{court.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{court.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{court.rating}</span>
                      <span className="text-gray-500">({court.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{court.hours}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-900">
                    Rs. {court.price}
                    <span className="text-base text-gray-500 font-normal">/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-4 text-sm font-medium transition border-b-2 ${
                      activeTab === tab.key
                        ? 'text-indigo-900 border-indigo-900 bg-indigo-50/50'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About This Court</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{court.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {court.amenities.map((amenity) => {
                          const Icon = amenityIcons[amenity] || Coffee;
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                            >
                              <div className="p-2 bg-indigo-50 rounded-lg">
                                <Icon className="w-5 h-5 text-indigo-900" />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-indigo-900" />
                          {court.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-indigo-900" />
                          {court.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {court.reviews.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No reviews yet.</p>
                    ) : (
                      court.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold text-sm">
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{review.user}</p>
                                <p className="text-xs text-gray-400">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 ml-13">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Rules Tab */}
                {activeTab === 'rules' && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-indigo-900" />
                      <h3 className="font-semibold text-gray-900">Court Rules & Guidelines</h3>
                    </div>
                    <ul className="space-y-3">
                      {court.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xs flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar — Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <BookingForm court={court} onSubmit={handleBooking} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
