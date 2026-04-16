import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserDetail } from "../../pages/hooks/useUserDetail";

export default function NavBar1() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { decode } = useUserDetail();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const profileOpen = () => {
    navigate("/profile");
    setOpen(false);
  };

  const menuItems = [
    { name: "Home", icon: "fa-solid fa-house", path: "/admin" },
    { name: "Category", icon: "fa-solid fa-list", path: "/category" },
    { name: "Products", icon: "fa-solid fa-bowl-food", path: "/products" },
    { name: "Orders", icon: "fa-solid fa-barcode", path: "/orders" },
    // { name: "Sales", icon: "fa-solid fa-receipt", path: "/sales" },
    { name: "Bill", icon: "fa-solid fa-receipt", path: "/bill" },
    { name: "Tables", icon: "fa-solid fa-table", path: "/tables" },
  ];

  return (
    <>
      <div className="  top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden">
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-12 h-12"
          />
          <span className="text-xl font-bold text-green-600">
            My Restaurant
          </span>
        </div>
        <button onClick={() => setOpen(!open)}>
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
      </div>

      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72 bg-white shadow-lg
          flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-center h-24 border-b">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-14 h-14"
          />
          <span className="ml-2 text-2xl font-bold text-green-600">
            My Restaurant
          </span>
        </div>

        <div className="flex-1 overflow-y-auto mt-6 px-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 mb-2 text-lg font-medium rounded-xl transition-all
                ${
                  isActive
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`
              }
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="p-5 border-t">
          <div
            onClick={profileOpen}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/src/assets/images/photo1.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-green-300"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm break-all">
                {decode?.["username"]}
              </p>
              {/* <p className="text-sm text-green-600">{decode?.["Email"]}</p> */}
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center gap-2
                       bg-green-600 text-white px-3 py-2 rounded-lg
                       hover:bg-green-700 transition"
          >
            Log Out
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </>
  );
}
