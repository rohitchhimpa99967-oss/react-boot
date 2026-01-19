

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoardBar from "./components/DashBoardBar";

export default function ProductAdd() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product Added Successfully ✅");
    navigate("/products"); // product list page
  };

  return (
    <div className="flex min-h-screen bg-[#f6faf7]">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1">
        <DashBoardBar name="Products" />

        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-10">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 mb-6 text-white bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
          >
            <i className="fa-solid fa-angle-left"></i> Back
          </button>

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Add a Product
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Name + Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Product Name"
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Description"
                className="border rounded-lg px-4 py-2"
              />
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select className="border rounded-lg px-4 py-2" required>
                <option value="">Choose Category</option>
                <option>Pizza</option>
                <option>Shake</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>

            {/* Image Upload */}
            <label className="flex items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg cursor-pointer">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-400">Upload Image</span>
              )}
              <input type="file" hidden onChange={handleFileChange} />
            </label>

            {/* ✅ ADD PRODUCT BUTTON */}
            <button
  type="submit"
  className="self-center bg-green-600 hover:bg-green-700 text-white 
             px-6 py-2 rounded-md font-semibold shadow-md 
             transition text-sm min-w-[200px] "
>
  ➕ Add Product
</button>


          </form>
        </div>
      </div>
    </div>
  );
}
