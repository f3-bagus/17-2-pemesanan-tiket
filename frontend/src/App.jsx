import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/pages/Dashboard";
import Schedule from "./admin/pages/Schedule";
import Sidebar from "./admin/components/Sidebar";
import Navbar from "./admin/components/Navbar";
import Movie from "./admin/pages/Movie";
import Users from "./admin/pages/Users";
import HomePage from "./user/pages/HomePages";
import MoviePage from "./user/pages/MoviePage";
import UserLayout from "./user/layout/UserLayout";
import TheaterPage from "./user/pages/TheaterPages";
import TicketPage from "./user/pages/TicketPages";
import AccountPage from "./user/pages/AccountPages";

function App() {
 return (
  <>
   <Router>
    <Routes>
     {/* Admin Routes */}
     <Route path="/admin" element={<Dashboard />} />
     <Route path="/admin/dashboard" element={<Dashboard />} />
     <Route path="/admin/schedule" element={<Schedule />} />
     <Route path="/admin/movie" element={<Movie />} />
     <Route path="/admin/users" element={<Users />} />

     {/* User Routes */}
     <Route path="/" element={<UserLayout />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="movie" element={<MoviePage />} />
      <Route path="theater" element={<TheaterPage />} />
      <Route path="ticket" element={<TicketPage />} />
      <Route path="account" element={<AccountPage />} />
     </Route>
    </Routes>
   </Router>
  </>
 );
}

export default App;
