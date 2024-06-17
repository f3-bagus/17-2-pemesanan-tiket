import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Movie from "./pages/Movie";
import Users from "./pages/Users";

function AdminApp() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/schedule" element={<Schedule />} />
      <Route path="/admin/movie" element={<Movie />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
}

export default AdminApp;
