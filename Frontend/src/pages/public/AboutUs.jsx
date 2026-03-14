import React from 'react';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Swikriti Mishra',
    role: 'Lead Developer & Architect',
    bio: 'Passionate about creating scalable and beautiful web applications.',
    image: 'https://ui-avatars.com/api/?name=Swikriti+Mishra&background=random',
    social: {
      instagram: 'https://www.instagram.com/swikritimishra___/',
      facebook: 'https://www.facebook.com/swikriti.mishra.147428'
    }
  },
  {
    name: 'Aayush Adhikari',
    role: 'Frontend Engineer',
    bio: 'Crafting intuitive and responsive user interfaces for modern web.',
    image: 'https://ui-avatars.com/api/?name=Aayush+Adhikari&background=random',
    social: {
      instagram: '#',
      facebook: '#'
    }
  },
  {
    name: 'Aayush Khadka',
    role: 'Backend Specialist',
    bio: 'Ensuring robust logic and optimized database architecture.',
    image: 'https://ui-avatars.com/api/?name=Aayush+Khadka&background=random',
    social: {
      instagram: '#',
      facebook: '#'
    }
  },
  {
    name: 'Sujal Bantawa Rai',
    role: 'UI/UX Designer',
    bio: 'Focusing on user-centric design to maximize engagement.',
    image: 'https://ui-avatars.com/api/?name=Sujal+Bantawa+Rai&background=random',
    social: {
      instagram: '#',
      facebook: '#'
    }
  }
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-indigo-900 text-white py-20 px-6 sm:px-12 lg:px-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About FutsalFlow</h1>
        <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto">
          We are a dedicated team of four passionate developers and designers from Nepal. 
          Our mission is to bridge the gap between futsal enthusiasts and owners, providing a seamless booking experience.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            The brilliant minds behind FutsalFlow working hard to make sports accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-50"
              />
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm font-medium text-indigo-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-500 mb-6 flex-grow">{member.bio}</p>
              
              <div className="flex gap-4 mt-auto">
                <a 
                  href={member.social.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={member.social.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Snippet Section */}
      <div className="bg-white border-t border-gray-200 py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or want to partner with us? Reach out directly!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>contact@futsalflow.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
