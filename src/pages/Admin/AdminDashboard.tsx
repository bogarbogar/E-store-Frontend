import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../css/admin.css";

const AdminDashboard: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  const stats = [
    { label: "Total Products", value: "24",  icon: "📦", color: "#E6F1FB" },
    { label: "Total Orders",   value: "138", icon: "🛒", color: "#E1F5EE" },
    { label: "Revenue",        value: "$4,820", icon: "💰", color: "#FAEEDA" },
    { label: "Customers",      value: "61",  icon: "👥", color: "#EEEDFE" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Dashboard</h2>
          <p className="admin-page-sub">Welcome back, {user?.name} 👋</p>
        </div>
        <Link to="/admin/add-product" className="admin-primary-btn">
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className="admin-stat-card"
            style={{ borderTop: `3px solid ${s.color}` }}
          >
            <div
              className="admin-stat-icon"
              style={{ background: s.color }}
            >
              {s.icon}
            </div>
            <div>
              <div className="admin-stat-value">{s.value}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="admin-section-title">Quick Actions</div>
      <div className="admin-quick-actions">
        <Link to="/admin/add-product" className="admin-action-card">
          <span className="admin-action-icon">➕</span>
          <span>Add New Product</span>
        </Link>
        <Link to="/admin/products" className="admin-action-card">
          <span className="admin-action-icon">📋</span>
          <span>View All Products</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;