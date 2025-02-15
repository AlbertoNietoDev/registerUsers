import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const logged = sessionStorage.getItem("token");

  if (!logged) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
};
