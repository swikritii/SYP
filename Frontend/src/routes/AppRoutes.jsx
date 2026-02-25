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

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

// User Pages
import PlayerDashboard from '../pages/user/PlayerDashboard';
import BookingConfirmation from '../pages/user/BookingConfirmation';

// Owner Pages
import OwnerDashboard from '../pages/owner/OwnerDashboard';

// Admin Pages
import AdminPanel from '../pages/admin/AdminPanel';

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
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
      </Route>

      {/* Auth Routes — no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Player Dashboard — DashboardLayout with player sidebar */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout role="player" />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Route>

      {/* Owner Dashboard */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout role="owner" />
          </PrivateRoute>
        }
      >
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      </Route>

      {/* Admin Panel */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout role="admin" />
          </PrivateRoute>
        }
      >
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
