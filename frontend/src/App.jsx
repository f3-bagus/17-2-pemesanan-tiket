import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/pages/Dashboard";
import Schedule from "./admin/pages/Schedule";
import Sidebar from "./admin/components/Sidebar";
import Navbar from "./admin/components/Navbar";
import Movie from "./admin/pages/Movie";
import Users from "./admin/pages/Users";

function App() {
  return (
    <>
      <Router>
        <div className="container-scroller">
          <Sidebar />
          <Navbar />
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/movie" element={<Movie />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
