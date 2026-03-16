const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

const sendCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  };
  res.cookie('token', token, cookieOptions);
};

// Register
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ fullName, email, password, phone, role });
    const token = createToken(user);
    sendCookie(res, token);
    res.status(201).json({ message: 'Registered', user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Provide credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(user);
    sendCookie(res, token);
    res.json({ message: 'Logged in', user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0, httpOnly: true });
  res.json({ message: 'Logged out' });
};

// Protected example: get current user
exports.getMe = async (req, res) => {
  try {
    // req.user set by middleware
    const user = await User.findById(req.user.id).select('-password -resetOTP -resetOTPExpiry');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot password -> generate OTP and send
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user with that email' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
    user.resetOTP = crypto.createHash('sha256').update(otp).digest('hex');
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    // Send OTP via SMTP if configured, otherwise console.log
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Your password reset OTP',
        text: `Your OTP: ${otp}. It expires in 10 minutes.`
      });
      res.json({ message: 'OTP sent to email' });
    } else {
      console.log('OTP for', user.email, 'is', otp);
      res.json({ message: 'OTP generated (check server console in dev)' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP & reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: 'Missing fields' });

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    const user = await User.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.password = newPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
