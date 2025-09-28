import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Adminrole = ({ children, allowedRoles }) => {
const location = useLocation();
const user = JSON.parse(localStorage.getItem("user"));

// Agar user login hi nahi hai → login page
if (!user) {
return <Navigate to="/login" state={{ from: location }} replace />;
}

// Agar role allowed list me nahi hai → login page
if (!allowedRoles.includes(user.role)) {
return <Navigate to="/login" replace />;
}

// Agar sab sahi hai → child render karo
return children;
};

export default Adminrole;
