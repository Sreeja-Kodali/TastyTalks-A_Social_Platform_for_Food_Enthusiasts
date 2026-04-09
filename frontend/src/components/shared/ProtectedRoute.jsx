import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, token, loading } = useAuth();

  console.log("ProtectedRoute - currentUser:", currentUser);
  console.log("ProtectedRoute - token:", token);
  console.log("ProtectedRoute - loading:", loading);
  console.log("ProtectedRoute - allowedRoles:", allowedRoles);

  if (loading) {
    console.log("ProtectedRoute - still loading, showing spinner");
    return <LoadingSpinner fullScreen />;
  }

  if (!token && !currentUser) {
    console.log("ProtectedRoute - no token or user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(currentUser?.role)
  ) {
    console.log("ProtectedRoute - user role not allowed, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("ProtectedRoute - access granted, rendering children");
  return children;
};

export default ProtectedRoute;
