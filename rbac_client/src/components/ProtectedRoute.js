import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(Cookies.get('role'))) {
    // Redirect to unauthorized page if the user role doesn't match
    return <Navigate to="/unauthorized" />;
  }

  // If authenticated and has the right role, render the component
  return <Component />;
};

export default ProtectedRoute;
