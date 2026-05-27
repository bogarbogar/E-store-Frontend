import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
// import "../style/sidebar.css";
import { useState } from "react";
import {  getMenuConfig } from "../routes/menuConfig";
import { logout } from "../slices/authSlice";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

export default function AppSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { role, user, isLoggedIn } = useSelector((state: any) => state.auth);
  // const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  // const getIcon = (iconName: string) => {
  //     const IconComponent = (MuiIcons as any)[iconName];
  //     if (!IconComponent) {
  //       return <MuiIcons.HelpOutline fontSize="small" />;
  //     }
  //     return <IconComponent fontSize="small" />;
  //   };
  const { role } = useSelector((state: any) => state.auth);

  // Call the function with role
  const menuConfig = getMenuConfig(role);
  //   const handleLogout = async () => {
  //     const result = await dispatch(logoutUser());

  //     if (logoutUser.fulfilled.match(result)) {
  //       navigate("/");
  //       dispatch(logout());
  //       toast.success(result?.payload?.message);
  //     } else {
  //       toast.success("server side error !!");
  //     }
  //   };
  return (
    <div
      style={{
        position: "fixed",
        top: "65px",
        left: 0,
        width: collapsed ? "60px" : "200px",
        height: "91vh",
        transition: "all 0.3s ease",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#f094efff",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            transition: "width 0.3s ease",
            color: "#000000ff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "91vh",
          },
        }}
      >
        <Menu
          closeOnClick
          menuItemStyles={{
            button: ({ active }) => ({
              color: "#000000ff",
              backgroundColor: active ? "#f7bbf1ff" : "#f094efff",
              fontWeight: active ? "bold" : undefined,
              "&:hover": {
                backgroundColor: "#f094efff",
                color: "#fff",
              },
            }),
            icon: {
              color: "#000000ff",
            },
          }}
        >
          <MenuItem icon={<FaBars />} onClick={() => setCollapsed(!collapsed)}>
            {!collapsed && "E-Store"}
          </MenuItem>

          {menuConfig.map((menu, idx) => (
            <SubMenu key={idx} icon={menu.icon} label={menu.label}>
              {menu.items.map((item, i) => (
                <MenuItem
                  key={i}
                  icon={item.icon}
                  component={<Link to={item.path} />}
                  active={location.pathname === item.path}
                >
                  {item.label}
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={() => navigate("/")}>
            <FaSignOutAlt className="logout-icon" />
            {!collapsed && <span className="logout-text">Logout</span>}
          </button>

          {!collapsed && (
            <div className="organization-info">
              <div className="copyright">© 2025 E-Store.</div>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import "../css/sidebar.css";
// import { logout } from "../slices/authSlice";

// interface AppSidebarProps {
//   collapsed: boolean;
//   setCollapsed: (val: boolean) => void;
// }

// /* ── Nav items per role ────────────────────────── */
// const ADMIN_NAV = [
//   { path: "/admin/dashboard",   icon: "📊", label: "Dashboard"   },
//   { path: "/admin/products",    icon: "📦", label: "Products"    },
//   { path: "/admin/add-product", icon: "➕", label: "Add Product" },
// ];

// const USER_NAV = [
//   { path: "/user/dashboard",  icon: "🏠", label: "Home"      },
//   { path: "/mensFashion",     icon: "👔", label: "Men"       },
//   { path: "/womensFashion",   icon: "👗", label: "Women"     },
//   { path: "/user/cart",       icon: "🛒", label: "Cart"      },
//   { path: "/user/checkout",   icon: "💳", label: "Checkout"  },
// ];

// const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, setCollapsed }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { role, user, isLoggedIn } = useSelector((state: any) => state.auth);

//   const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
//       {/* ── Toggle button ── */}
//       <div className="sidebar-toggle-row">
//         <button
//           className="sidebar-toggle-btn"
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? "☰" : "✕"}
//         </button>
//         {!collapsed && (
//           <span className="sidebar-brand">🛍️ ShopZone</span>
//         )}
//       </div>

//       {/* ── User info ── */}
//       {isLoggedIn && !collapsed && (
//         <div className="sidebar-user">
//           <div className="sidebar-avatar">
//             {user?.name?.charAt(0).toUpperCase() ?? "U"}
//           </div>
//           <div className="sidebar-user-info">
//             <div className="sidebar-user-name">{user?.name}</div>
//             <div className={`sidebar-role-badge ${role}`}>{role}</div>
//           </div>
//         </div>
//       )}
//       {isLoggedIn && collapsed && (
//         <div className="sidebar-avatar sidebar-avatar-sm">
//           {user?.name?.charAt(0).toUpperCase() ?? "U"}
//         </div>
//       )}

//       {/* ── Nav items ── */}
//       <nav className="sidebar-nav">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`sidebar-nav-item ${
//               location.pathname === item.path ? "active" : ""
//             }`}
//             title={collapsed ? item.label : undefined}
//           >
//             <span className="sidebar-nav-icon">{item.icon}</span>
//             {!collapsed && (
//               <span className="sidebar-nav-label">{item.label}</span>
//             )}
//           </Link>
//         ))}
//       </nav>

//       {/* ── Logout ── */}
//       {isLoggedIn && (
//         <div className="sidebar-footer">
//           <button
//             className="sidebar-logout-btn"
//             onClick={handleLogout}
//             title={collapsed ? "Logout" : undefined}
//           >
//             <span className="sidebar-nav-icon">🚪</span>
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppSidebar;
