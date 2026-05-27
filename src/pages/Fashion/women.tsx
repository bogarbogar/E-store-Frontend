import { useRef, useState } from "react";
// import "../../css/women.css";
import TextField from "@mui/material/TextField";

export interface Product {
  id: any;
  name: string;
  price: number;
  image: string;
}

export const ProductData: Product = {
  id: "",
  name: "",
  price: 0,
  image: "",
};

const WomensFashion = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputData, setInputData] = useState<Product>(ProductData);
  const [photo, setPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setPhoto(base64);
      setInputData((prev) => ({
        ...prev,
        image: base64,
      }));
    };

    reader.readAsDataURL(file);
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setInputData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // const handleSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("name", inputData.name);
  //   formData.append("price", String(inputData.price));
  //   if (fileInputRef.current?.files?.[0]) {
  //     formData.append("image", fileInputRef.current.files[0]);
  //   }

  //   HttpLogin.axios()
  //     .post("/api/products", formData)
  //     .then((res) => {
  //       setProducts(res.data);
  //     });
  // };

  const handleSubmit = () => {
    // HttpLogin.axios()
    //   .post("/api/products/men", inputData)
    //   .then((res) => {
    //     alert("Product added successfully!");
    //     setProducts(res.data);
    //     setInputData(ProductData);
    //     setPhoto("");
    //   })
    //   .catch((err) => console.log(err));
  };

  console.log(products);
  return (
    <div>
      <h1>Women's Fashion</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          size="small"
          value={inputData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          size="small"
          value={inputData.price}
          onChange={handleChange}
        />

        <div className="segment-1">
          <div onClick={handleAvatarClick}>
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-photo"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageUpload}
          />
        </div>
        <button onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default WomensFashion;
