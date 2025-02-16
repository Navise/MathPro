import React from "react";
import { Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles , children }) => {
  const token = localStorage.getItem("teacherToken");

  if (!token) {
    return <Navigate to="/teacherlogin" />;
  }

  try {
    const decodedToken = jwtDecode(token); 
    const userRole = decodedToken.role;

    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/teacherlogin" />;
  }
};

export default ProtectedRoute;
