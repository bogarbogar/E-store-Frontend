import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/AppLayout.css";
import { logout } from "../slices/authSlice";

interface AppLayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/* ── Sidebar nav items per role ─────────────────── */
const ADMIN_NAV = [
  { path: "/admin/dashboard", icon: "📊", label: "Dashboard"   },
  { path: "/admin/products",  icon: "📦", label: "Products"    },
  { path: "/admin/add-product", icon: "➕", label: "Add Product" },
];

const USER_NAV = [
  { path: "/user/dashboard", icon: "🏠", label: "Home"     },
  { path: "/mensFashion",    icon: "👔", label: "Men"      },
  { path: "/womensFashion",  icon: "👗", label: "Women"    },
  { path: "/user/cart",      icon: "🛒", label: "Cart"     },
  { path: "/user/checkout",  icon: "💳", label: "Checkout" },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { role, user } = useSelector((state: any) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="app-shell">

      {/* ── Top Navbar ── */}
      <header className="app-navbar">
        <div className="app-navbar-left">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <span className="app-logo">🛍️ ShopZone</span>
        </div>

        <div className="app-navbar-right">
          <span className="app-role-badge" data-role={role}>
            {role === "admin" ? "Admin" : "User"}
          </span>
          <div className="app-user-info">
            <div className="app-avatar">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <span className="app-user-name">{user?.name}</span>
          </div>
          <button className="app-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="app-body">

        {/* ── Sidebar ── */}
        <aside className={`app-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {sidebarOpen && (
                  <span className="sidebar-label">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="app-main">{children}</main>

      </div>
    </div>
  );
};

export default AppLayout;