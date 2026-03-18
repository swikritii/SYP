import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }


    setLoading(true);
    try {
      const json = await authService.login(formData.email.trim(), formData.password);
      
      if (json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify({ 
          id: json.id, 
          name: json.name, 
          email: json.email,
          role: json.role 
        }));
        
        // Redirect based on role
        if (json.role === 'admin') navigate('/admin');
        else if (json.role === 'owner') navigate('/owner/dashboard');
        else navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex justify-start mb-8">
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
                ))}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Sign In to FutsalFlow</h1>
            <p className="text-gray-600 mb-8">Welcome back! Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-900 transition bg-transparent border-none cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm text-indigo-900 font-semibold hover:underline bg-transparent border-none cursor-pointer">Forgot password?</button>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>

            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-indigo-900 font-semibold hover:underline bg-transparent border-none cursor-pointer">Sign Up</button>
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
