

 
import { document } from "postcss";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const menuItems = [
    { name: "Home", icon: "fa-solid fa-house", path: "/" },
    { name: "Category", icon: "fa-solid fa-list", path: "/category" },
    { name: "Products", icon: "fa-solid fa-bowl-food", path: "/products" },
    // { name: "Staff", icon: "fa-solid fa-users", path: "/staff" },
    { name: "Orders", icon: "fa-solid fa-barcode", path: "/orders" },
    { name: "Sales", icon: "fa-solid fa-receipt", path: "/sales" },
    { name: "Bill", icon: "fa-solid fa-receipt", path: "/bill" },

    // { name: "Settings", icon: "fa-solid fa-gear", path: "/settings" },
  ];
  // const showNav=()=>
  // {
  //   const divShow=document.get
  // }

  return (
    <div className=""><div  className="border border-black p-4 w-14 text-center m-4 sm:hidden">*</div>
    <div className="hidden sm:block w-72 min-h-screen bg-white shadow-lg flex flex-col" >
      {/* Logo */}
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

      {/* Menu */}
      <div className="flex-1 overflow-y-auto mt-6 px-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 w-full px-5 py-3 mb-2 text-lg font-medium rounded-xl transition-all
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

      {/* Profile */}
      <div className="p-5 border-t">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/photo1.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-green-300"
          />
          <div>
            <p className="font-semibold text-gray-800">Demo Vik</p>
            <p className="text-sm text-green-600">Manager</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
