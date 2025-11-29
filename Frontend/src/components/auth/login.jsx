import React, { useState } from "react";
import "./login.css"; // Match file name casing

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Add your login API call here
  };

  return (
    <div className="login-responsive-container">
      {/* Dots decoration */}
      <div className="dots-decoration">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
      </div>

      <div className="login-responsive-card">
        {/* Title */}
        <h2 className="login-responsive-title">
          Sign In to FutsalFlow
        </h2>
        <p className="login-responsive-subtitle">
          Welcome back! Please enter your details to sign in.
        </p>

        <form onSubmit={handleSubmit} className="login-responsive-form">
          {/* Email */}
          <div className="form-group-responsive">
            <label className="form-label-responsive">Email</label>
            <div className="input-container-responsive">
              <span className="input-icon-responsive">📧</span>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="form-input-responsive"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group-responsive">
            <label className="form-label-responsive">Password</label>
            <div className="input-container-responsive">
              <span className="input-icon-responsive">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input-responsive"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="forgot-password-responsive">
            <button type="button" className="forgot-password-btn-responsive">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="submit-button-responsive"
          >
            Sign In
          </button>

          <p className="signup-text-responsive">
            Don't have an account?
            <span className="signup-link-responsive">
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;