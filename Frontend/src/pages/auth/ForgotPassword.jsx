import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await authService.forgotPassword(email.trim());
      setMessage(response.message || 'If an account exists, a reset link will be logged in the backend (or sent via email).');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">Forgot Password?</h1>
        <p className="text-gray-600 mb-6 text-center text-sm">
          Enter the email address associated with your account and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">{message}</div>}
        {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">{error}</div>}

        <p className="mt-6 text-center text-sm">
          Remembered your password?{' '}
          <button onClick={() => navigate('/login')} className="text-indigo-900 font-semibold hover:underline bg-transparent border-none cursor-pointer">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
