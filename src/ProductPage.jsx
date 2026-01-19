


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoardBar from "./components/DashBoardBar";
import EditButton from "./components/buttons/EditButton";
import DeleteButton from "./components/buttons/DeleteButton";

export default function ProductPage() {
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", icon: "fa-pizza-slice" },
    { name: "Burger", icon: "fa-hamburger" },
    { name: "Pasta", icon: "fa-bowl-food" },
    { name: "Dessert", icon: "fa-cake-candles" },
  ];

  const products = [
    { name: "Margarita Pizza", category: "Pizza", img: "/src/assets/images/photo1.jpg" },
    { name: "Pepperoni Pizza", category: "Pizza", img: "/src/assets/images/photo2.jpg" },
    { name: "Cheese Burger", category: "Burger", img: "/src/assets/images/photo3.jpg" },
    { name: "Veggie Burger", category: "Burger", img: "/src/assets/images/photo4.jpg" },
    { name: "Spaghetti", category: "Pasta", img: "/src/assets/images/photo1.jpg" },
    { name: "Mac & Cheese", category: "Pasta", img: "/src/assets/images/photo2.jpg" },
    { name: "Chocolate Cake", category: "Dessert", img: "/src/assets/images/photo5.jpg" },
    { name: "Ice Cream", category: "Dessert", img: "/src/assets/images/photo6.jpg" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Pizza");

  return (
    <div className="flex min-h-screen bg-[#f6faf7]">
      <NavBar />

      <div className="flex-1">
        <DashBoardBar name="Products" />

        <div className="p-5">

          {/* 🔥 Header Row */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Products
            </h1>

            {/* ➕ ADD PRODUCT BUTTON */}
            <button
              onClick={() => navigate("/products/add")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              <i className="fa-solid fa-plus"></i>
              Add Product
            </button>
          </div>

          {/* Category Tabs */}
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

          {/* Products */}
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
