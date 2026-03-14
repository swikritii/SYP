import React from 'react';
import { HelpCircle, Book, MessageSquare } from 'lucide-react';

export default function HelpCenter() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">How can we help you?</h1>
        <p className="text-lg text-gray-600">Search for articles or browse the frequently asked questions below.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Book className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Getting Started</h3>
          <p className="text-gray-500 text-sm">Learn the basics of creating an account and finding courts.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Booking FAQs</h3>
          <p className="text-gray-500 text-sm">Answers to common questions about payments and cancellations.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Support</h3>
          <p className="text-gray-500 text-sm">Still need help? Reach out to our support team directly.</p>
        </div>
      </div>
    </div>
  );
}
