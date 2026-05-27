import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../css/user.css";
import { removeFromCart, updateQuantity } from "../../slices/productSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart     = useSelector((state: any) => state.products.cart);

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <h2 className="user-page-title">Cart</h2>
        </div>
        <div className="user-empty">
          <p>Your cart is empty.</p>
          <Link to="/user/dashboard" className="user-primary-btn">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <h2 className="user-page-title">Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})</h2>
        <Link to="/user/dashboard" className="user-back-link">← Continue shopping</Link>
      </div>

      <div className="cart-layout">
        {/* Item list */}
        <div className="cart-items">
          {cart.map((item: any) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cat">{item.category}</div>
                <div className="cart-item-price">${item.price.toFixed(2)} each</div>
              </div>
              <div className="cart-item-qty">
                <button
                  className="qty-btn"
                  onClick={() =>
                    item.quantity > 1
                      ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                      : dispatch(removeFromCart(item.id))
                  }
                >
                  −
                </button>
                <span className="qty-val">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
              </div>
              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span className="cart-free">Free</span>
          </div>
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="user-primary-btn"
            style={{ width: "100%", marginTop: 16 }}
            onClick={() => navigate("/user/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;