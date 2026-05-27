import AddProduct from "../pages/Admin/Addproduct";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProductList from "../pages/Admin/ProductList";
import Login from "../pages/Authendication/Login";
import Signup from "../pages/Authendication/Signup";
import Dashboard from "../pages/dashboard";
import MensFashion from "../pages/Fashion/men";
import WomensFashion from "../pages/Fashion/women";
import Cart from "../pages/User/Cart";
import Checkout from "../pages/User/Checkout";

const authProtectedRoutes = [
  /* ── Admin routes ── */
  {
    path: "/admin/dashboard",
    component: <AdminDashboard />,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/add-product",
    component: <AddProduct />,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/products",
    component: <ProductList />,
    allowedRoles: ["admin"],
  },

  /* ── User routes ── */
  {
    path: "/user/dashboard",
    component: <Dashboard />,
    allowedRoles: ["user"],
  },
  {
    path: "/user/cart",
    component: <Cart />,
    allowedRoles: ["user"],
  },
  {
    path: "/user/checkout",
    component: <Checkout />,
    allowedRoles: ["user"],
  },
];

const authPageRoutes = [
  { path: "/",       component: <Login />  },
  { path: "/login",  component: <Login />  },
  { path: "/signup", component: <Signup /> },
];

const publicRoutes = [
  { path: "/mensFashion",   component: <MensFashion />   },
  { path: "/womensFashion", component: <WomensFashion /> },
];

// const publicRoutes = [
//   { path: "/",              component: <Login />   },
//   { path: "/login",         component: <Login />   },
//   { path: "/signup",        component: <Signup />  },
//   { path: "/mensFashion",   component: <MensFashion />   },
//   { path: "/womensFashion", component: <WomensFashion /> },
// ];

export { authProtectedRoutes, publicRoutes, authPageRoutes };
