


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar1 from "./components/NavBar1";
// import DashBoardBar1 from "./components/DashBoardBar1";
// import EditButton from "./components/buttons/EditButton";
// import DeleteButton from "./components/buttons/DeleteButton";

// export default function ProductPage() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Pizza", icon: "fa-pizza-slice" },
//     { name: "Burger", icon: "fa-hamburger" },
//     { name: "Pasta", icon: "fa-bowl-food" },
//     { name: "Dessert", icon: "fa-cake-candles" },
//     { name: "Dessert", icon: "fa-cake-candles" },
//     { name: "Dessert", icon: "fa-cake-candles" },
//     { name: "Dessert", icon: "fa-cake-candles" },
//     { name: "Dessert", icon: "fa-cake-candles" },
     
//   ];

//   const products = [
//     { name: "Margarita Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
//     { name: "Pepperoni Pizza", category: "Pizza", img: "/src/assets/images/photo2.jpg" },
//     { name: "Cheese Burger", category: "Burger", img: "/src/assets/images/photo3.jpg" },
//     { name: "Veggie Burger", category: "Burger", img: "/src/assets/images/photo4.jpg" },
//     { name: "Spaghetti", category: "Pasta", img: "/src/assets/images/photo1.jpg" },
//     { name: "Mac & Cheese", category: "Pasta", img: "/src/assets/images/photo2.jpg" },
//     { name: "Chocolate Cake", category: "Dessert", img: "/src/assets/images/photo5.jpg" },
//     { name: "Ice Cream", category: "Dessert", img: "/src/assets/images/photo6.jpg" },
//   ];

//   const [selectedCategory, setSelectedCategory] = useState("Pizza");

//   return (
//     <div className="lg:flex min-h-screen bg-[#f6faf7]">
//       <NavBar1 />

//       <div className="flex-1">
//         <DashBoardBar1 name="Products" />

//         <div className="p-5">

//           {/* 🔥 Header Row */}
//           <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//             <h1 className="text-2xl font-bold text-gray-800">
//               Products
//             </h1>

//             {/* ➕ ADD PRODUCT BUTTON */}
//             <button
//               onClick={() => navigate("/products/add")}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
//             >
//               <i className="fa-solid fa-plus"></i>
//               Add Product
//             </button>
//           </div>

//           {/* Category Tabs */}
//           {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             {categories.map((cat) => (
//               <div
//                 key={cat.name}
//                 onClick={() => setSelectedCategory(cat.name)}
//                 className={`flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
//                   ${
//                     selectedCategory === cat.name
//                       ? "bg-green-500 text-white border-green-500"
//                       : "bg-white border-green-200 hover:bg-green-100"
//                   }`}
//               >
//                 <i className={`fa-solid ${cat.icon} text-2xl mb-1`}></i>
//                 <span className="font-semibold">{cat.name}</span>
//               </div>
//             ))}
//           </div> */}
//           {/* CATEGORY SECTION */}
// {categories.length <= 4 ? (
//   /* ===== NORMAL GRID (≤4) ===== */
//   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ">
//     {categories.map((cat) => (
//       <div
//         key={cat.name}
//         onClick={() => setSelectedCategory(cat.name)}
//         className={`flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
//           ${
//             selectedCategory === cat.name
//               ? "bg-green-500 text-white border-green-500"
//               : "bg-white border-green-200 hover:bg-green-100"
//           }`}
//       >
//         <i className={`fa-solid ${cat.icon} text-2xl mb-1`}></i>
//         <span className="font-semibold">{cat.name}</span>
//       </div>
//     ))}
//   </div>
// ) : (
//   /* ===== SCROLLABLE ( >4 ) ===== */
//   <div className="relative mb-8">
//     {/* LEFT */}
//     <button
//       onClick={() =>
//         document.getElementById("cat-scroll").scrollBy({
//           left: -200,
//           behavior: "smooth",
//         })
//       }
//       className="hidden absolute -left-3 top-1/2 -translate-y-1/2 
//                  bg-white shadow-md rounded-full w-8 h-8 
//                  lg:flex items-center justify-center z-10"
//     >
//       <i className="fa-solid fa-angle-left"></i>
//     </button>

//     {/* LIST */}
//     <div
//       id="cat-scroll"
//       className="flex gap-4 overflow-x-auto scrollbar-hide px-2"
//     >
//       {categories.map((cat) => (
//         <div
//           key={cat.name}
//           onClick={() => setSelectedCategory(cat.name)}
//           className={`min-w-[120px] flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
//             ${
//               selectedCategory === cat.name
//                 ? "bg-green-500 text-white border-green-500"
//                 : "bg-white border-green-200 hover:bg-green-100"
//             }`}
//         >
//           <i className={`fa-solid ${cat.icon} text-2xl mb-1`}></i>
//           <span className="font-semibold">{cat.name}</span>
//         </div>
//       ))}
//     </div>

//     {/* RIGHT */}
//     <button
//       onClick={() =>
//         document.getElementById("cat-scroll").scrollBy({
//           left: 200,
//           behavior: "smooth",
//         })
//       }
//       className="hidden  absolute -right-3 top-1/2 -translate-y-1/2 
//                  bg-white shadow-md rounded-full w-8 h-8 
//                  lg:flex items-center justify-center z-10"
//     >
//       <i className="fa-solid fa-angle-right"></i>
//     </button>
//   </div>
// )}


//           {/* Products */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products
//               .filter((p) => p.category === selectedCategory)
//               .map((prod, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md"
//                 >
//                   <div className="w-full aspect-square rounded-lg overflow-hidden">
//                     <img
//                       src={prod.img}
//                       alt={prod.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <h2 className="mt-3 font-semibold text-lg text-center">
//                     {prod.name}
//                   </h2>

//                   <div className="flex gap-2 mt-3">
//                     <EditButton />
//                     <DeleteButton />
//                   </div>
//                 </div>
//               ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";

export default function ProductPage() {
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", icon: "fa-pizza-slice" },
    { name: "Burger", icon: "fa-hamburger" },
    { name: "Pasta", icon: "fa-bowl-food" },
    { name: "Dessert", icon: "fa-cake-candles" },
    { name: "Chinese", icon: "fa-bowl-rice" },
    { name: "Drinks", icon: "fa-martini-glass" },
    { name: "Snacks", icon: "fa-cookie" },
  ];

const products = [
  // 🍕 Pizza
  { name: "Margherita Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
  { name: "Pepperoni Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
  { name: "Farmhouse Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
  { name: "Cheese Burst Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
  { name: "Veg Supreme Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },

  // 🍔 Burger
  { name: "Classic Veg Burger", category: "Burger", img: "/src/assets/images/photo2.jpg" },
  { name: "Cheese Burger", category: "Burger", img: "/src/assets/images/photo2.jpg" },
  { name: "Paneer Burger", category: "Burger", img: "/src/assets/images/photo2.jpg" },
  { name: "Double Patty Burger", category: "Burger", img: "/src/assets/images/photo2.jpg" },
  { name: "Crispy Veg Burger", category: "Burger", img: "/src/assets/images/photo2.jpg" },

  // 🍝 Pasta
  { name: "White Sauce Pasta", category: "Pasta", img: "/src/assets/images/photo3.jpg" },
  { name: "Red Sauce Pasta", category: "Pasta", img: "/src/assets/images/photo3.jpg" },
  { name: "Cheese Pasta", category: "Pasta", img: "/src/assets/images/photo3.jpg" },
  { name: "Penne Alfredo", category: "Pasta", img: "/src/assets/images/photo3.jpg" },
  { name: "Spaghetti Aglio", category: "Pasta", img: "/src/assets/images/photo3.jpg" },

  // 🍰 Dessert
  { name: "Chocolate Cake", category: "Dessert", img: "/src/assets/images/photo4.jpg" },
  { name: "Vanilla Ice Cream", category: "Dessert", img: "/src/assets/images/photo4.jpg" },
  { name: "Brownie", category: "Dessert", img: "/src/assets/images/photo4.jpg" },
  { name: "Gulab Jamun", category: "Dessert", img: "/src/assets/images/photo4.jpg" },
  { name: "Strawberry Pastry", category: "Dessert", img: "/src/assets/images/photo4.jpg" },

  // 🥡 Chinese
  { name: "Veg Chowmein", category: "Chinese", img: "/src/assets/images/photo5.jpg" },
  { name: "Hakka Noodles", category: "Chinese", img: "/src/assets/images/photo5.jpg" },
  { name: "Manchurian", category: "Chinese", img: "/src/assets/images/photo5.jpg" },
  { name: "Fried Rice", category: "Chinese", img: "/src/assets/images/photo5.jpg" },
  { name: "Spring Rolls", category: "Chinese", img: "/src/assets/images/photo5.jpg" },

  // 🥤 Drinks
  { name: "Cold Coffee", category: "Drinks", img: "/src/assets/images/photo6.jpg" },
  { name: "Fresh Lime Soda", category: "Drinks", img: "/src/assets/images/photo6.jpg" },
  { name: "Mango Shake", category: "Drinks", img: "/src/assets/images/photo6.jpg" },
  { name: "Chocolate Shake", category: "Drinks", img: "/src/assets/images/photo6.jpg" },
  { name: "Soft Drink", category: "Drinks", img: "/src/assets/images/photo6.jpg" },

  // 🍪 Snacks
  { name: "French Fries", category: "Snacks", img: "/src/assets/images/photo7.jpg" },
  { name: "Garlic Bread", category: "Snacks", img: "/src/assets/images/photo7.jpg" },
  { name: "Cheese Balls", category: "Snacks", img: "/src/assets/images/photo7.jpg" },
  { name: "Nachos", category: "Snacks", img: "/src/assets/images/photo7.jpg" },
  { name: "Veg Nuggets", category: "Snacks", img: "/src/assets/images/photo7.jpg" },
];


  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  return (
    <div className="lg:flex min-h-screen bg-[#f6faf7] overflow-hidden">
      <NavBar1 />

      <div className="flex-1 overflow-hidden">
        <DashBoardBar1 name="Products" />

        <div className="p-5 max-w-full overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>

            <button
              onClick={() => navigate("/products/add")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              <i className="fa-solid fa-plus"></i>
              Add Product
            </button>
          </div>

          {/* ================= CATEGORY SECTION ================= */}
          {categories.length <= 4 ? (
            /* ---- GRID (≤4) ---- */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
                    ${
                      selectedCategory === cat.name
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white border-green-200 hover:bg-green-100"
                    }`}
                >
                  <i className={`fa-solid ${cat.icon} text-2xl mb-1`}></i>
                  <span className="font-semibold">{cat.name}</span>
                </div>
              ))}
            </div>
          ) : (
            /* ---- SCROLLABLE (>4) ---- */
            <div className="relative mb-8 w-full overflow-hidden">
              
              {/* LEFT BUTTON */}
              {/* <button
                onClick={() =>
                  document.getElementById("cat-scroll").scrollBy({
                    left: -200,
                    behavior: "smooth",
                  })
                }
                className="hidden  absolute -left-3 top-1/2 -translate-y-1/2 
                           bg-white shadow-md rounded-full w-8 h-8 
                           items-center justify-center z-10"
              >
                <i className="fa-solid fa-angle-left"></i>
              </button> */}

              {/* SCROLL AREA */}
              <div
                id="cat-scroll"
                className="flex gap-4 overflow-x-auto max-w-full px-2 scrollbar-hide"
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`min-w-[120px] flex-shrink-0 flex flex-col items-center 
                      p-4 rounded-xl cursor-pointer border transition
                      ${
                        selectedCategory === cat.name
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white border-green-200 hover:bg-green-100"
                      }`}
                  >
                    <i className={`fa-solid ${cat.icon} text-2xl mb-1`}></i>
                    <span className="font-semibold">{cat.name}</span>
                  </div>
                ))}
              </div>

              {/* RIGHT BUTTON */}
              {/* <button
                onClick={() =>
                  document.getElementById("cat-scroll").scrollBy({
                    left: 200,
                    behavior: "smooth",
                  })
                }
                className="hidden absolute -right-3 top-1/2 -translate-y-1/2 
                           bg-white shadow-md rounded-full w-8 h-8 
                           items-center justify-center z-10"
              >
                <i className="fa-solid fa-angle-right"></i>
              </button> */}
            </div>
          )}

          {/* ================= PRODUCTS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === selectedCategory)
              .map((prod, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="mt-3 font-semibold text-lg text-center">
                    {prod.name}
                  </h2>

                  <div className="flex gap-2 mt-3">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}
