

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";
import { useForm } from "react-hook-form";
import { categoryService } from "../../services/category.service";


export default function CategoryAdd() {
  const [preview, setPreview] = useState(null);
  // const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const {create}=categoryService;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();


  const onSubmit = (data) => {
   const result={...data,id:Date.now()}
    create(result)
    alert("Category Added Successfully ✅");
    navigate("/category"); // product list page
  };

  return (
    <div className="lg:flex min-h-screen bg-[#f6faf7]">
      <NavBar1 />

      <div className="flex-1">
        <DashBoardBar1 name="Add Category" />

        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10 border border-green-100">
          {/* Back Button */}
             <div className="flex gap-8"> <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-2 mb-6 bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            <i className="fa-solid fa-angle-left"></i> Back
          </button>

          <span className="text-3xl font-bold text-center mb-8">
            Create New Category
          </span>
          </div>
         

       <form
  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
  onSubmit={handleSubmit(onSubmit)}
>
  {/* IMAGE — LEFT (SMALLER) */}
  <div className="lg:col-span-1">
    <label className="block mb-3 font-medium text-gray-700">
      Category Image
    </label>

    <label
      className="flex items-center justify-center
      w-full h-56
      border-2 border-dashed border-green-300 rounded-xl
      cursor-pointer hover:bg-green-50 transition"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="text-center text-green-600">
          <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
          <p className="font-medium">Upload image</p>
          <p className="text-xs text-gray-500">PNG / JPG</p>
        </div>
      )}

      <input
        type="file"
        className="hidden"
        {...register("image", {
          required: "Category image is required",
        })}
        onChange={handleFileChange}
      />
    </label>

    {errors.image && (
      <p className="text-red-500 text-sm mt-2">
        {errors.image.message}
      </p>
    )}
  </div>

  {/* RIGHT SIDE FORM */}
  <div className="lg:col-span-2 space-y-6">
    {/* CATEGORY NAME */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Category Name
      </label>
      <div className="relative">
        <i className="fa-solid fa-tag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="e.g. Pizza"
          {...register("catName", {
            required: "Category name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters required",
            },
          })}
          className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      {errors.catName && (
        <p className="text-red-500 text-sm mt-1">
          {errors.catName.message}
        </p>
      )}
    </div>

    {/* DESCRIPTION */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Description
      </label>
      <div className="relative">
        <i className="fa-solid fa-align-left absolute left-3 top-4 text-gray-400"></i>
        <textarea
          rows="4"
          placeholder="Short description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Minimum 5 characters required",
            },
          })}
          className="w-full border border-gray-300 rounded-lg px-10 py-3 resize-none focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}
    </div>

    {/* BUTTON */}
    <div className="flex justify-end pt-4">
      <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-lg font-semibold shadow-md">
        Add Category
      </button>
    </div>
  </div>
</form>


        </div>
      </div>
    </div>
  );
}
