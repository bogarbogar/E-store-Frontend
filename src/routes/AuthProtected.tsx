import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthProtectedProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthProtected: React.FC<AuthProtectedProps> = ({
  children,
  allowedRoles,
}) => {
  const { isLoggedIn, role } = useSelector((state: any) => state.auth);

  /* Not logged in → go to login */
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  /* Logged in but wrong role → go to own dashboard */
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AuthProtected;