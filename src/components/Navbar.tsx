import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../css/navbar.css";
import { logout } from "../slices/authSlice";

const NavigationBar: React.FC = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { isLoggedIn, role, user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const homeRoute =
    role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <header className="navbar">
      {/* Left — logo */}
      <div className="navbar-left">
        <Link to={isLoggedIn ? homeRoute : "/"} className="navbar-logo">
          🛍️ ShopZone
        </Link>
      </div>

      {/* Right — user info + logout */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className={`navbar-role-badge ${role}`}>
              {role === "admin" ? "Admin" : "User"}
            </span>

            {role === "user" && (
              <Link to="/user/cart" className="navbar-cart-link">
                🛒 Cart
              </Link>
            )}

            <div className="navbar-user">
              <div className="navbar-avatar">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <span className="navbar-user-name">{user?.name}</span>
            </div>

            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"  className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link navbar-link-primary">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;