import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Movie from "./pages/Movie";
import Users from "./pages/Users";

function AdminApp() {
 return (
  <Routes>
   <Route path="/dashboard" element={<Dashboard />} />
   <Route path="/schedule" element={<Schedule />} />
   <Route path="/movie" element={<Movie />} />
   <Route path="/users" element={<Users />} />
   <Route path="/" element={<Dashboard />} />
  </Routes>
 );
}

export default AdminApp;
