import React from "react";
import { Navigate, useLocation } from "react-router-dom";
declare var abp: any;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  if (!abp.auth.getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
