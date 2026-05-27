
import { useState } from "react";
// import "../../css/men.css";

const MensFashion = () => {
  const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     HttpLogin.axios()
//       .get("/api/products/men")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

  console.log(products);
  return (
    <div>
      <h1>Men's Fashion</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((item: any) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img src={item.image} alt={item.name} width="100%" />
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
            <div>
              <button className="btn buy-btn" style={{ marginRight: "10px" }}>
                BUY
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensFashion;
