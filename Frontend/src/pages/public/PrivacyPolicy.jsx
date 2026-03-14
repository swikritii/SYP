import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-indigo max-w-none text-gray-700">
          <p>Last updated: March 14, 2026</p>
          <p>At FutsalFlow, your privacy is our priority. This document outlines how we collect, use, and handle your data.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you register, such as your name, email, and booking history.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Information</h2>
          <p>We use the data to provide our services, process bookings, improve user experience, and communicate with you about your account.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share necessary information with Court Owners specifically to facilitate your bookings.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
        </div>
      </div>
    </div>
  );
}
