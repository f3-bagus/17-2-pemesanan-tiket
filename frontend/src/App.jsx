import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import UserApp from "./user/UserApp";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { UserProvider } from "./UserContext"; 

function App() {
 return (
  <UserProvider> 
   <Router>
    <Routes>
     {/* Rute untuk aplikasi Admin */}
     <Route path="/admin/*" element={<AdminApp />} />

     {/* Rute untuk aplikasi User */}
     <Route path="/*" element={<UserApp />} />

     {/* Rute untuk halaman Login */}
     <Route path="/login" element={<Login />} />

     {/* Rute untuk halaman Register */}
     <Route path="/register" element={<Register />} />
    </Routes>
   </Router>
  </UserProvider>
 );
}

export default App;