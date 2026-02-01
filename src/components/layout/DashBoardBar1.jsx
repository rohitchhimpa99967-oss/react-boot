


import React from "react";

export default function DashBoardBar1({ name }) {
  return (
    <div className="hidden  lg:flex items-center justify-between p-4 md:p-6 bg-white shadow-sm border-b border-green-100 w-full">
      
      {/* Left Side */}
      <div className="text-xl font-semibold flex items-center gap-3 text-green-700">
        <i className="fa-solid fa-bars-progress"></i>
        <span>{name}</span>
      </div>

     
      <div className="flex items-center gap-4 md:gap-6">
        
      </div>
    </div>
  );
}
