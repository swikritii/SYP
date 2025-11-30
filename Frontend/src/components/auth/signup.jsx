import React, { useState } from 'react';

export default function SignupPage({ onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    // Validate inputs
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          password: formData.password
        })
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || 'Signup failed');
        setLoading(false);
        return;
      }
      
      // Store token and user info in localStorage
      if (json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
      }
      
      setSuccess(true);
      // Wait a moment to show success message, then navigate
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 500);
    } catch (err) {
      console.error('Signup request failed:', err);
      setError(err.message || 'Network error. Please check if the server is running.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold">
                FF
              </div>
              <span className="text-xl font-bold text-gray-900">FutsalFlow</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-indigo-900 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-indigo-900 font-medium">Browse Courts</a>
              <a href="#" className="text-gray-700 hover:text-indigo-900 font-medium">Workout Hub</a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-700 hover:text-indigo-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-indigo-900 font-medium">Login</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
                Sign Up
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700 hover:text-indigo-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[650px] lg:min-h-[750px]">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Menu Icon */}
              <div className="flex justify-start mb-10">
                <div className="grid grid-cols-3 gap-1.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                  ))}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10">
                Create Your FutsalFlow Account
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-900 text-white py-4 text-base rounded-lg font-semibold hover:bg-indigo-800 transition duration-200 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Sign Up'}
                </button>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm">Account created successfully! Redirecting...</p>
                  </div>
                )}
              </form>

              <p className="text-center text-gray-600 text-base mt-8">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-indigo-900 font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
                  onClick={() => onBack && onBack()}
                >
                  Sign In
                </button>
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
              <div className="h-full bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center p-12">
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop"
                  alt="People playing futsal"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}