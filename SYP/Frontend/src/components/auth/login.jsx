import React, { useState } from "react";
import "./login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Add your login API call here
  };

  return (
    <div className="login-container">
      {/* Dots decoration */}
      <div className="dots">
        <span className="dot1"></span>
        <span className="dot2"></span>
        <span className="dot3"></span>
        <span className="dot4"></span>
      </div>

      <div className="login-box">
        {/* Title */}
        <h2>Sign In to FutsalFlow</h2>
        <p>Welcome back! Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label>Email</label>
          <div className="input-container">
            <span>📧</span>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <label>Password</label>
          <div className="input-container">
            <span>🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            
            <button type="button">Forgot password?</button>
          </div>

          {/* Sign In Button */}
          <button type="submit">Sign In</button>

          <p className="signup-text">
            Don’t have an account?
            <span>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
