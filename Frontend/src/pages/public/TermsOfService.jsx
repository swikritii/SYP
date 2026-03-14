import React from 'react';

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="prose prose-indigo max-w-none text-gray-700">
          <p>Last updated: March 14, 2026</p>
          <p>Please read these terms of service carefully before using FutsalFlow.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using our platform, you agree to be bound by these terms.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. User Accounts</h2>
          <p>You must provide accurate and complete information when creating an account.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Bookings and Payments</h2>
          <p>All bookings are subject to availability. Payments must be processed through valid gateways. Cancellations follow the specific court's policy.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Prohibited Conduct</h2>
          <p>You agree not to misuse the service or help anyone else do so.</p>
        </div>
      </div>
    </div>
  );
}
