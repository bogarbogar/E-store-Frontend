import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/user.css";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Accessories"];

const UserDashboard: React.FC = () => {
  const dispatch   = useDispatch();
  const products   = useSelector((state: any) => state.products.items);
  const cartCount  = useSelector((state: any) =>
    state.products.cart.reduce((sum: number, i: any) => sum + i.quantity, 0)
  );
  const { user }   = useSelector((state: any) => state.auth);

  const [activeCategory, setActiveCategory] = useState("All");
  const [added, setAdded] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p: any) => p.category === activeCategory);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div className="user-page">
      {/* Page header */}
      <div className="user-page-header">
        <div>
          <h2 className="user-page-title">Shop</h2>
          <p className="user-page-sub">Hi {user?.name}, find something you love 🛍️</p>
        </div>
        <Link to="/user/cart" className="user-cart-link">
          🛒 Cart
          {cartCount > 0 && (
            <span className="user-cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>

      {/* Category filter */}
      <div className="user-category-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`user-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="user-empty">No products in this category.</div>
      ) : (
        <div className="user-product-grid">
          {filtered.map((p: any) => (
            <div key={p.id} className="user-product-card">
              <div className="user-product-img-wrap">
                <img src={p.image} alt={p.name} className="user-product-img" />
                <span className="user-product-cat">{p.category}</span>
              </div>
              <div className="user-product-body">
                <div className="user-product-name">{p.name}</div>
                <div className="user-product-desc">{p.description}</div>
                <div className="user-product-footer">
                  <span className="user-product-price">
                    ${p.price.toFixed(2)}
                  </span>
                  <button
                    className={`user-add-btn ${added === p.id ? "added" : ""}`}
                    onClick={() => handleAddToCart(p)}
                    disabled={p.stock === 0}
                  >
                    {added === p.id ? "✓ Added" : p.stock === 0 ? "Out of stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

function addToCart(product: any): any {
  throw new Error("Function not implemented.");
}
