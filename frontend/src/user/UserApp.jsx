import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePages";
import MoviePage from "./pages/MoviePage";
import TicketPage from "./pages/TicketPages";
import AccountPage from "./pages/AccountPages";
import SeatPage from "./pages/SeatPage";
import PaymentPage from "./pages/PaymentPage";
import NavbarComponents from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

function UserApp() {
 return (
  <div>
   <NavbarComponents />

   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movie" element={<MoviePage />} />
    <Route path="/ticket" element={<TicketPage />} />
    <Route path="/seat-picker" element={<SeatPage />} />
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/account" element={<AccountPage />} />
   </Routes>

   <FooterComponent />
  </div>
 );
}

export default UserApp;
