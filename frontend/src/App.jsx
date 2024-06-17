import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserApp from './user/UserApp';
import Login from './auth/Login';
import Register from './auth/Register';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from './UserContext'; // Pastikan Anda mengimpor UserProvider
import Dashboard from './admin/pages/Dashboard';
import Schedule from './admin/pages/Schedule';
import Movie from './admin/pages/Movie';
import Users from './admin/pages/Users';

function App() {
  return (
    <UserProvider> {/* Sediakan UserProvider di tingkat paling atas aplikasi */}
      <Router>
        <Routes>
          {/* Rute untuk aplikasi User */}
          <Route path="/*" element={<UserApp />} />

          {/* Rute untuk halaman Login */}
          <Route path="/login" element={<Login />} />

          {/* Rute untuk halaman Register */}
          <Route path="/register" element={<Register />} />

          {/* Rute untuk aplikasi Admin yang dilindungi */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="movie" element={<Movie />} />
            <Route path="users" element={<Users />} />
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
