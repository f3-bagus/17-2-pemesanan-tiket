import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = () => {
  const { state } = useContext(UserContext);

  return state.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
