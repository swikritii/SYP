import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Contact Info Form */}
        <div className="p-8 md:p-12 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-900 focus:outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-900 focus:outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-900 focus:outline-none" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-indigo-900 text-white font-semibold rounded-lg py-2.5 hover:bg-indigo-800 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details Panel */}
        <div className="bg-indigo-900 p-8 md:p-12 md:w-1/2 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-indigo-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-indigo-200 mt-1">Kathmandu, Nepal<br/>Bagmati Province</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-indigo-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Phone Number</h4>
                <p className="text-indigo-200 mt-1">+977 1234567890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-indigo-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Email Address</h4>
                <p className="text-indigo-200 mt-1">support@futsalflow.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
