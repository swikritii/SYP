import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import BrowsePage from '../pages/public/BrowsePage';
import CourtDetails from '../pages/public/CourtDetails';
import WorkoutHub from '../pages/public/WorkoutHub';
import AboutUs from '../pages/public/AboutUs';
import ContactUs from '../pages/public/ContactUs';
import TermsOfService from '../pages/public/TermsOfService';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import HelpCenter from '../pages/public/HelpCenter';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

// User Pages
import PlayerDashboard from '../pages/user/PlayerDashboard';
import BookingConfirmation from '../pages/user/BookingConfirmation';
import ChatPage from '../pages/user/ChatPage';
import ProfileSettings from '../pages/user/ProfileSettings';
import PlayerBookings from '../pages/user/PlayerBookings';

// Owner Pages
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import OwnerCourts from '../pages/owner/OwnerCourts';
import OwnerBookings from '../pages/owner/OwnerBookings';
import OwnerAnalytics from '../pages/owner/OwnerAnalytics';

// Admin Pages
import AdminPanel from '../pages/admin/AdminPanel';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminCourts from '../pages/admin/AdminCourts';
import AdminBookings from '../pages/admin/AdminBookings';
import AdminAnalytics from '../pages/admin/AdminAnalytics';

// Private Route wrapper
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes — wrapped in MainLayout (Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-courts" element={<BrowsePage />} />
        <Route path="/court/:id" element={<CourtDetails />} />
        <Route path="/workout-hub" element={<WorkoutHub />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/help-center" element={<HelpCenter />} />
      </Route>

      {/* Auth Routes — no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Player Dashboard — DashboardLayout with player sidebar */}
      <Route
        element={
          <PrivateRoute allowedRoles={['player']}>
            <DashboardLayout role="player" />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/dashboard/bookings" element={<PlayerBookings />} />
        <Route path="/dashboard/settings" element={<ProfileSettings />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>

      {/* Owner Dashboard */}
      <Route
        element={
          <PrivateRoute allowedRoles={['owner']}>
            <DashboardLayout role="owner" />
          </PrivateRoute>
        }
      >
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/courts" element={<OwnerCourts />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />
        <Route path="/owner/analytics" element={<OwnerAnalytics />} />
        <Route path="/owner/settings" element={<ProfileSettings />} />
      </Route>

      {/* Admin Panel */}
      <Route
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <DashboardLayout role="admin" />
          </PrivateRoute>
        }
      >
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courts" element={<AdminCourts />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<ProfileSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
