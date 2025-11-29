import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Add your login API call here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffffff]">
      {/* Dots decoration */}
      <div className="absolute top-10 left-10 flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        <span className="w-3 h-3 rounded-full bg-gray-500"></span>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-10 w-[400px] border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Sign In to FutsalFlow
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please enter your details to sign in.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="block font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 mb-4">
            <span className="text-gray-400 mr-2">📧</span>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <label className="block font-medium mb-1">Password</label>
          <div className="flex items-center border rounded-lg px-3 mb-1">
            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full py-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-5">
            <button className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?
            <span className="text-blue-600 cursor-pointer hover:underline ml-1">
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;