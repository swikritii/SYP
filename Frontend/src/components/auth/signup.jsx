import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage({ onBack, onSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // clears the red error on a field as soon as user starts typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  // checks how strong the password is based on length, numbers, symbols etc
  const getPasswordStrength = (password) => {
    if (!password) return null;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: 'Weak', color: '#ef4444', width: '33%' };
    if (score <= 3) return { label: 'Medium', color: '#f97316', width: '66%' };
    return { label: 'Strong', color: '#22c55e', width: '100%' };
  };

  // eye open - password is visible
  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  // eye closed - password is hidden
  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // check each field and collect all errors at once
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match!' });
      return;
    }

    if (formData.password.length < 6) {
      setFieldErrors({ password: 'Password must be at least 6 characters' });
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

      // save to localStorage so the user stays logged in on refresh
      if (json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
      }

      setSuccess(true);
      // small delay so user actually sees the success message before moving on
      setTimeout(() => {
        onSuccess ? onSuccess() : navigate('/home');
      }, 500);

    } catch (err) {
      console.error('Signup request failed:', err);
      setError(err.message || 'Network error. Please check if the server is running.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold">
                FF
              </div>
              <span className="text-xl font-bold text-gray-900">FutsalFlow</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* on signup page login gets the filled style, signup gets plain */}
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button className="text-gray-700 hover:text-indigo-900 font-medium">
                Sign Up
              </button>
            </div>

            <button className="md:hidden text-gray-700 hover:text-indigo-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[650px] lg:min-h-[750px]">

            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
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
                  <label className="block text-base font-medium text-gray-700 mb-2.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    // turns red if user tried to submit without filling this
                    className={`w-full px-5 py-4 text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                      fieldErrors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {fieldErrors.firstName && <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className={`w-full px-5 py-4 text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                      fieldErrors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {fieldErrors.lastName && <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-5 py-4 text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                      fieldErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full px-5 py-4 pr-14 text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                        fieldErrors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {/* toggles between showing and hiding the password */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200 focus:outline-none"
                    >
                      {showPassword ? <EyeOpen /> : <EyeClosed />}
                    </button>
                  </div>

                  {/* strength bar only shows up once user starts typing */}
                  {formData.password && (() => {
                    const strength = getPasswordStrength(formData.password);
                    return (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{ width: strength.width, backgroundColor: strength.color }}
                          />
                        </div>
                        <p className="text-xs mt-1" style={{ color: strength.color }}>{strength.label}</p>
                      </div>
                    );
                  })()}
                  {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`w-full px-5 py-4 pr-14 text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                        fieldErrors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200 focus:outline-none"
                    >
                      {showConfirm ? <EyeOpen /> : <EyeClosed />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-900 text-white py-4 text-base rounded-lg font-semibold hover:bg-indigo-800 transition duration-200 mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creating account...
                    </>
                  ) : 'Sign Up'}
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
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
              </p>
            </div>

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