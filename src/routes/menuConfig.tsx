import {
  FaMale, FaBaby, FaChild, FaFemale, FaTv,
} from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdAcUnit, MdDashboard, MdPhoneIphone } from "react-icons/md";

export const getMenuConfig = (role: string | null) =>{
  console.log("role",role)
  return [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    items: [
      {
        path: role === "admin" ? "/admin/dashboard" : "/user/dashboard",
        icon: <MdDashboard />,
        label: "Dashboard",
      },
    ],
  },
  // ...(role === "admin"
  //   ? [
  //       {
  //         label: "Das",
  //         icon: <MdDashboard />,
  //         items: [
  //           {
  //             path: "/admin/dashboard",
  //             icon: <MdDashboard />,
  //             label: "Admin Dashboard",
  //           },
  //           {
  //             path: "/admin/products",
  //             icon: <MdDashboard />,
  //             label: "Products",
  //           },
  //           {
  //             path: "/admin/add-product",
  //             icon: <MdDashboard />,
  //             label: "Add Product",
  //           },
  //         ],
  //       },
  //     ]
  //   : []),
  {
    label: "Fashion",
    icon: <GiClothes />,
    items: [
      { label: "Mens",   path: "/mensFashion",   icon: <FaMale />   },
      { label: "Kids",   path: "/kidsFashion",   icon: <FaChild />  },
      { label: "Womens", path: "/womensFashion", icon: <FaFemale /> },
      { label: "Baby",   path: "/babyFashion",   icon: <FaBaby />   },
    ],
  },
  {
    label: "Electronics",
    icon: <FaTv />,
    items: [
      { label: "Mobiles",          path: "/mobiles",          icon: <MdPhoneIphone /> },
      { label: "Air Conditioner",  path: "/airConditioner",   icon: <MdAcUnit />      },
    ],
  },
];
} 