

import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import EditButton from "./components/buttons/EditButton";
import DeleteButton from "./components/buttons/DeleteButton";
import DashBoardBar from "./components/DashBoardBar";

export default function CategoryPage() {
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", img: "/src/assets/images/photo1.jpg" },
    { name: "Burger", img: "/src/assets/images/photo2.jpg" },
    { name: "Pasta", img: "/src/assets/images/photo3.jpg" },
    { name: "Dessert", img: "/src/assets/images/photo4.jpg" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6faf7]">
      <NavBar />

      <div className="flex-1">
        <DashBoardBar name="Categories" />

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Categories ({categories.length})
            </h2>

            <button
              onClick={() => navigate("/category/add")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              <i className="fa-solid fa-plus"></i>
              Add Category
            </button>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-green-100 p-4 flex flex-col"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden border">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                <h3 className="text-center text-xl font-semibold mt-4">
                  {cat.name}
                </h3>

                <div className="flex justify-center gap-3 mt-4">
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
