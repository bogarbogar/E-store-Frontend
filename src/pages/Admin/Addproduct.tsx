import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/admin.css";
import { createProduct } from "../../slices/productSlice";
import type { AppDispatch } from "../../store/store"; // add this

const CATEGORIES = ["Men", "Women", "Kids", "Accessories"];

const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // fix this
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:        "",
    price:       "",
    category:    "",
    description: "",
    image:       "",
    stock:       "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(
      createProduct({
        name:        form.name,
        price:       parseFloat(form.price),
        category:    form.category,
        description: form.description,
        image:       form.image || "https://placehold.co/300x300?text=Product",
        stock:       parseInt(form.stock) || 0,
      })
    );
console.log("res",res)
    setSuccess(true);
    setForm({ 
      name: "", 
      price: "", 
      category: "", 
      description: "", 
      image: "", 
      stock: "" 
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Add Product</h2>
          <p className="admin-page-sub">Fill in the details below</p>
        </div>
      </div>

      <div className="admin-form-card">
        {success && (
          <div className="admin-success-banner">
            ✅ Product added successfully!{" "}
            <span
              className="admin-link"
              onClick={() => navigate("/admin/products")}
            >
              View all products →
            </span>
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Classic White Shirt"
                required
              />
            </div>
            <div className="admin-field">
              <label>Price ($) *</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 29.99"
                required
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label>Category *</label>
              <select 
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Stock Quantity</label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="e.g. 50"
              />
            </div>
          </div>

          <div className="admin-field">
            <label>Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://... (leave blank for placeholder)"
            />
          </div>

          <div className="admin-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Short product description…"
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-btn">
              Save Product
            </button>
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;