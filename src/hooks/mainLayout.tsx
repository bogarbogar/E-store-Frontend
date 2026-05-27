import { useEffect, useState } from "react";
import useMediaQuery from "./mediaQuery";
import AppSidebar from "../components/sidebar";

import { useLocation } from "react-router-dom";

const AUTH_PATHS = ["/", "/login", "/signup"];

// const MainLayout = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const isAuthPage = AUTH_PATHS.includes(location.pathname);

//   // Auth pages — render children directly, no sidebar
//   if (isAuthPage) {
//     return <>{children}</>;
//   }

//   // All other pages — full layout
//   const [collapsed, setCollapsed] = useState(false);
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   // ... rest of your existing MainLayout code

//   useEffect(() => {
//     setCollapsed(isMobile);
//   }, [isMobile]);

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       <div
//         style={{
//           marginLeft: !isMobile ? (collapsed ? "80px" : "250px") : "0px",
//           flex: 1,
//           paddingTop: "64px",
//           overflowY: "scroll",
//           transition: "all 0.3s ease-in-out",
//         }}
//       >
//         <main className="app-content" style={{ padding: "1rem" }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
import NavigationBar from "../components/Navbar";

/* Pages that should render with NO sidebar / navbar */
const NO_LAYOUT_PATHS = ["/", "/login", "/signup"];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location  = useLocation();
  const isMobile  = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  /* Auth pages — render children full-screen, no chrome */
  if (NO_LAYOUT_PATHS.includes(location.pathname)) {
    return <>{children}</>;
  }

  /* All other pages — full layout */
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Right column */}
      <div
        style={{
          marginLeft: !isMobile ? (collapsed ? "80px" : "250px") : "0px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Top navbar */}
        <NavigationBar />

        {/* Page content */}
        <main
          className="app-content"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            paddingTop: "80px", /* 64px navbar + 16px breathing room */
            background: "#f4f5f7",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;