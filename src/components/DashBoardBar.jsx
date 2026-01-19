// import React from "react";

// export default function DashBoardBar(props) {
//   return (
//     <div className="flex items-center justify-between p-6 bg-white shadow-md ml-1 w-[1250px] ">
      
     
//       <div className="text-xl font-semibold flex items-center gap-2">
//         <i className="fa-solid fa-bars-progress"></i>
//         <span>{props.name}</span>
//       </div>

     
//       <div className="flex items-center gap-6">
        
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
//         />

//         <i className="fa-solid fa-bell text-xl cursor-pointer"></i>

//         <span className="text-sm text-gray-600">user1@gmail.com</span>
//         <button>Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
//       </div>
//     </div>
//   );
// }



// import React from "react";

// export default function DashBoardBar({ name }) {
//   return (
//     <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-md w-full">
//       {/* Left Side */}
//       <div className="text-xl font-semibold flex items-center gap-3">
//         <i className="fa-solid fa-bars-progress"></i>
//         <span>{name}</span>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-4 md:gap-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-3 md:px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 w-32 md:w-48"
//         />

//         {/* Notifications */}
//         <i className="fa-solid fa-bell text-xl cursor-pointer hover:text-orange-400 transition-colors duration-200"></i>

//         {/* User Info */}
//         <div className="flex items-center gap-2 md:gap-3">
//           <span className="text-sm text-gray-600 hidden md:inline">user1@gmail.com</span>
//           <button className="flex items-center gap-2 bg-orange-400 text-white px-3 py-1 rounded-lg hover:bg-orange-500 transition-colors duration-200">
//             Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";

export default function DashBoardBar({ name }) {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm border-b border-green-100 w-full">
      
      {/* Left Side */}
      <div className="text-xl font-semibold flex items-center gap-3 text-green-700">
        <i className="fa-solid fa-bars-progress"></i>
        <span>{name}</span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border border-green-200 px-3 md:px-4 py-2 rounded-lg
                     outline-none focus:ring-2 focus:ring-green-400
                     transition-all duration-200 w-32 md:w-48"
        />

        {/* Notifications */}
        <i className="fa-solid fa-bell text-xl cursor-pointer text-gray-600 hover:text-green-600 transition-colors duration-200"></i>

        {/* User Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-sm text-gray-600 hidden md:inline">
            user1@gmail.com
          </span>

          <button
            className="flex items-center gap-2 bg-green-600 text-white
                       px-3 py-1 rounded-lg hover:bg-green-700
                       transition-colors duration-200"
          >
            Log Out
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
