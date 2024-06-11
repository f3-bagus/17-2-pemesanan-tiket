import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePages";
import MoviePage from "./pages/MoviePage";
import TheaterPage from "./pages/TheaterPages";
import TicketPage from "./pages/TicketPages";
import AccountPage from "./pages/AccountPages";

function UserApp() {
 return (
  <Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/movie" element={<MoviePage />} />
   <Route path="/theater" element={<TheaterPage />} />
   <Route path="/ticket" element={<TicketPage />} />
   <Route path="/account" element={<AccountPage />} />
  </Routes>
 );
}

export default UserApp;
