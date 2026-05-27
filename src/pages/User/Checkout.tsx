import React, { useState } from "react";
import "../../css/user.css"
import { clearCart } from "../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart     = useSelector((state: any) => state.products.cart);
  const { user } = useSelector((state: any) => state.auth);

  const [placed, setPlaced]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({
    name:    user?.name  ?? "",
    email:   user?.email ?? "",
    address: "",
    city:    "",
    zip:     "",
    card:    "",
  });

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(clearCart());
      setPlaced(true);
      setLoading(false);
    }, 1000);
  };

  if (placed) {
    return (
      <div className="user-page">
        <div className="checkout-success">
          <div className="checkout-success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p>Thank you, {user?.name}. Your order is being processed.</p>
          <button
            className="user-primary-btn"
            onClick={() => navigate("/user/dashboard")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <h2 className="user-page-title">Checkout</h2>
      </div>

      <div className="checkout-layout">
        {/* Form */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <div className="checkout-section-title">Shipping Details</div>
          <div className="checkout-row">
            <div className="admin-field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="admin-field">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St" required />
          </div>
          <div className="checkout-row">
            <div className="admin-field">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>ZIP Code</label>
              <input name="zip" value={form.zip} onChange={handleChange} required />
            </div>
          </div>

          <div className="checkout-section-title" style={{ marginTop: 20 }}>
            Payment
          </div>
          <div className="admin-field">
            <label>Card Number</label>
            <input
              name="card"
              value={form.card}
              onChange={handleChange}
              placeholder="**** **** **** ****"
              maxLength={19}
              required
            />
          </div>

          <button
            type="submit"
            className="user-primary-btn"
            style={{ marginTop: 20, width: "100%" }}
            disabled={loading}
          >
            {loading ? "Placing order…" : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary */}
        <div className="cart-summary">
          <h3 className="cart-summary-title">Your Items</h3>
          {cart.map((item: any) => (
            <div key={item.id} className="checkout-item-row">
              <span className="checkout-item-name">
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;