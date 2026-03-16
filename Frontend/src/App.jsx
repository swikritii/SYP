import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import SignupPage from "./components/auth/signup";
import Homepage from "./components/pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
