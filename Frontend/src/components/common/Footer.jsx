import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const columns = [
    { title: 'Company', links: [{name: 'About Us', path: '/about-us'}, {name: 'Careers', path: '#'}, {name: 'Press', path: '#'}] },
    {
      title: 'Support',
      links: [{name: 'Help Center', path: '/help-center'}, {name: 'Contact Us', path: '/contact-us'}, {name: 'Privacy Policy', path: '/privacy-policy'}, {name: 'Terms of Service', path: '/terms-of-service'}],
    },
    { title: 'For Owners', links: [{name: 'List Your Court', path: '/owner/courts'}, {name: 'Owner Dashboard', path: '/owner/dashboard'}] },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-indigo-900 rounded-lg flex items-center justify-center text-white">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">FutsalFlow</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your ultimate platform for booking futsal courts and staying active.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-indigo-900 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-900 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-900 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-900 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-bold text-gray-900 mb-4">{col.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.path.startsWith('/') ? (
                      <Link to={link.path} className="hover:text-indigo-900 transition flex items-center gap-1">
                        {link.name}
                      </Link>
                    ) : (
                      <a href={link.path} className="hover:text-indigo-900 transition flex items-center gap-1">
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © 2025 FutsalFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
