
import { Outlet, useLocation } from "react-router-dom";
import NavBar1 from "./NavBar1";
import DashBoardBar1 from "./DashBoardBar1";

const titleMap = {
  "/admin": "Dashboard",
  "/category": "Categories",
  "/category/add": "Categories",
  "/products": "Products",
  "/products/add": "Products",
  "/orders": "Orders",
  "/sales": "Sales",
  "/bill": "Bills",
  "/profile": "Profile",
};

const Layout = () => {
  const location = useLocation();
  const title = titleMap[location.pathname] || "Dashboard";

  return (
    <div className="lg:flex h-screen bg-[#f6faf7]">
      <NavBar1 />
      <div className="flex-1 overflow-y-auto">
        <DashBoardBar1 name={title} />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
