import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Element, ...rest }) => {
  const user = localStorage.getItem('user')// Replace with your actual user selector

  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
