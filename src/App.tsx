import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Authendication/Login";
import Signup from "./pages/Authendication/Signup";
import MainLayout from "./hooks/mainLayout";
import MensFashion from "./pages/Fashion/men";
import WomensFashion from "./pages/Fashion/women";
import UserDashboard from "./pages/User/Userdashboard";
import KidsFashion from "./pages/Fashion/kidsFashion";
import BabyFashion from "./pages/Fashion/babyFashion";
import Mobiles from "./pages/Fashion/mobiles";
import AirConditioner from "./pages/Fashion/Airconditioner";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/Addproduct";
import ProductList from "./pages/Admin/ProductList";

function App() {
  return (
    <Routes>
      {/* Auth pages - no layout */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* App pages - with layout */}
      <Route
        path="/admin/dashboard"
        element={
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        }
      />
      <Route
        path="/admin/add-product"
        element={
          <MainLayout>
            <AddProduct />
          </MainLayout>
        }
      />
      <Route
        path="/admin/products"
        element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        }
      />
      <Route
        path="/user/dashboard"
        element={
          <MainLayout>
            <UserDashboard />
          </MainLayout>
        }
      />
      <Route
        path="/mensFashion"
        element={
          <MainLayout>
            <MensFashion />
          </MainLayout>
        }
      />
      <Route
        path="/womensFashion"
        element={
          <MainLayout>
            <WomensFashion />
          </MainLayout>
        }
      />
      <Route
        path="/kidsFashion"
        element={
          <MainLayout>
            <KidsFashion />
          </MainLayout>
        }
      />
      <Route
        path="/babyFashion"
        element={
          <MainLayout>
            <BabyFashion />
          </MainLayout>
        }
      />
      <Route
        path="/mobiles"
        element={
          <MainLayout>
            <Mobiles />
          </MainLayout>
        }
      />
      <Route
        path="/airConditioner"
        element={
          <MainLayout>
            <AirConditioner />
          </MainLayout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
