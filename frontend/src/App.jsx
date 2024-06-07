import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/pages/Dashboard";
import Schedule from "./admin/pages/Schedule";
import Sidebar from "./admin/components/Sidebar";
import Navbar from "./admin/components/Navbar";
import Movie from "./admin/pages/Movie";
import Users from "./admin/pages/Users";
import HomePage from "./user/pages/HomePages";
import MoviePage from "./user/pages/MoviePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="/admin/movie" element={<Movie />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MoviePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
