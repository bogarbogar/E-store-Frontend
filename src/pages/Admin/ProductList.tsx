import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/admin.css";
import { useAppDispatch } from "../../hooks/redux";
import { deleteProduct, fetchProducts } from "../../slices/productSlice";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: any) => state.products.items);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    const handlefetchproducts = async () => {
      const res = await dispatch(fetchProducts()).unwrap();
      setProductsData(res.data);
      console.log("res", res);
    };
    handlefetchproducts();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">All Products</h2>
          <p className="admin-page-sub">
            {products.length} product{products.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Link to="/admin/add-product" className="admin-primary-btn">
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="admin-empty">
          <p>No products yet.</p>
          <Link to="/admin/add-product" className="admin-primary-btn">
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="admin-product-table-wrap">
          <table className="admin-product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((p: any) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="admin-product-thumb"
                    />
                  </td>
                  <td className="admin-product-name">{p.name}</td>
                  <td>
                    <span className="admin-category-badge">{p.category}</span>
                  </td>
                  <td className="admin-product-price">${p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => dispatch(deleteProduct(p._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
