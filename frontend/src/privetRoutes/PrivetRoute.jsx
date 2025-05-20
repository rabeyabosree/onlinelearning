import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log(role, user.role)

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;  // Redirect to unauthorized page
  }

  return children;
}

export default PrivateRoute;



