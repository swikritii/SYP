import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields'); return;
    }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match!'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      const json = await authService.signup(
        `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        formData.email.trim(),
        formData.password
      );
      
      if (json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      setError(err.message || 'Network error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[650px]">
          {/* Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex justify-start mb-8">
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
                ))}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Create Your FutsalFlow Account</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
                { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'your.email@example.com' },
                { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <input
                    type={field.type} name={field.name} value={formData[field.name]}
                    onChange={handleChange} placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
              ))}

              <button
                type="submit" disabled={loading}
                className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{error}</p></div>}
              {success && <div className="p-3 bg-green-50 border border-green-200 rounded-lg"><p className="text-green-600 text-sm">Account created! Redirecting...</p></div>}
            </form>

            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-indigo-900 font-semibold hover:underline bg-transparent border-none cursor-pointer">Sign In</button>
            </p>
          </div>

          {/* Image */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="h-full bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center p-12">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop"
                alt="Futsal"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
