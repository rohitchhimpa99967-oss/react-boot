

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoardBar from "./components/DashBoardBar";
import { useForm } from "react-hook-form";
import { categoryService } from "./services/category.service";


export default function CategoryAdd() {
  const [preview, setPreview] = useState(null);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const {create}=categoryService;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
   const result={...data,id:Date.now()}
    create(result)
    
  };

  return (
    <div className="flex min-h-screen bg-[#f6faf7]">
      <NavBar />

      <div className="flex-1">
        <DashBoardBar name="Add Category" />

        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10 border border-green-100">
          {/* Back Button */}
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-2 mb-6 bg-green-100 text-green-700 hover:bg-green-200 px-5 py-2 rounded-lg font-semibold transition"
          >
            <i className="fa-solid fa-angle-left"></i>
            Back
          </button>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Create New Category
          </h2>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category Name
              </label>
              <div className="relative">
                <i className="fa-solid fa-tag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="e.g. Pizza"
                  {...register("catName")}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <div className="relative">
                <i className="fa-solid fa-align-left absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  {...register("description")}
                  placeholder="Short description"
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-10">
              <label className="block mb-3 font-medium text-gray-700">
                Category Image
              </label>

              <label className="flex flex-col items-center justify-center w-full md:w-64 h-48 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-green-600">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
                    <p className="text-sm font-medium">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="mt-12 text-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-lg font-semibold shadow-md">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
