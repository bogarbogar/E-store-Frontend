import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../css/auth.css";
import { loginSuccess } from "../../slices/authSlice";

const STATIC_USERS = [
  { email: "admin@shop.com", password: "admin@123", role: "admin" as const, name: "Admin" },
  { email: "user@shop.com",  password: "user@123",  role: "user"  as const, name: "User"  },
];

const Login: React.FC = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const matched = STATIC_USERS.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (matched) {
        dispatch(
          loginSuccess({
            role:  matched.role,
            name:  matched.name,
            email: matched.email,
            token: `static-token-${matched.role}`,
          })
        );
        navigate(matched.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo / brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">🛍️</div>
          <h1 className="auth-brand-name">ShopZone</h1>
          <p className="auth-brand-sub">Sign in to your account</p>
        </div>

        {/* Hint */}
        <div className="auth-hint-row">
          <div className="auth-hint">
            <span className="auth-hint-label">Admin</span>
            <span className="auth-hint-val">admin@shop.com / admin123</span>
          </div>
          <div className="auth-hint">
            <span className="auth-hint-label">User</span>
            <span className="auth-hint-val">user@shop.com / user123</span>
          </div>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;