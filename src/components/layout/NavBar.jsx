import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserDetail } from "../../pages/hooks/useUserDetail";

export default function NavBar1() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
 

 

  const menuItems = [
    { name: "Home", icon: "fa-solid fa-house", path: "/home" },
    { name: "About", icon: "fa-solid fa-house", path: "/home" },
    { name: "Contact", icon: "fa-solid fa-house", path: "/home" },
    { name: "Rate Us", icon: "fa-solid fa-house", path: "/home" },
   
  ];

  return (
    <>
      <div className=" top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden">
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-green-600">
            My Restaurant
          </span>
        </div>
        <button onClick={() => setOpen(!open)}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>
      <div
        className={`
          fixed lg:static top-0 left-0 z-40
          h-screen w-54 bg-white shadow-xl
          flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 p-5
        `}
      >
        <div className=" items-center gap-2">
            <div className="flex justify-center">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-20 h-20"
          /></div>
          <span className="text-xl font-bold text-green-600">
            My Restaurant
          </span>
        </div>

        <div className="mt-20 flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b-[1.5px] cursor-pointer px-2 py-2 rounded w-36
                hover:bg-purple-50  hover:translate-x-2 transition-all duration-300
                ${
                  isActive
                    ? "  shadow-md"
                    : " hover:bg-gray-100 "
                }`
              }
            >
             
              {item.name}
            </NavLink>
          ))}
        </div>

        
      </div>
    </>
  );
}
