import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout1 = () => {
  const location = useLocation();

  return (
    <div className="lg:flex h-screen bg-[#f6faf7]">
      <NavBar />
      <div className="flex-1 overflow-y-auto">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout1;
