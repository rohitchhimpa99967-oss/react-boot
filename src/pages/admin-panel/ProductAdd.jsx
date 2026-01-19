
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";
import { useForm } from "react-hook-form";
import { productService } from "../../services/product.service";

export default function ProductAdd() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { create } = productService;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const result = { ...data, id: Date.now() };
    create(result);

    alert("Product Added Successfully ✅");
    reset();
    setPreview(null);
    navigate("/products");
  };

  return (
    <div className="lg:flex min-h-screen bg-[#f6faf7]">
      <NavBar1 />

      <div className="flex-1">
        <DashBoardBar1 name="Products" />

        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-10">
          {/* Header */}
          <div className="flex gap-8">
            {" "}
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 mb-6 bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              <i className="fa-solid fa-angle-left"></i> Back
            </button>
            <span className="text-3xl font-bold text-center mb-8">
              Add a Product
            </span>
          </div>

         <form
  onSubmit={handleSubmit(onSubmit)}
  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
>
  {/* IMAGE — LEFT */}
  <div className="lg:col-span-1">
    <label className="block mb-3 font-medium text-gray-700">
      Product Image
    </label>

    <label
      className="flex items-center justify-center
      w-full h-56
      border-2 border-dashed border-gray-300
      rounded-xl cursor-pointer
      hover:bg-gray-50 transition"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="text-center text-gray-400">
          <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
          <p className="text-sm font-medium">Upload product image</p>
          <p className="text-xs">PNG, JPG</p>
        </div>
      )}
      <input type="file" hidden onChange={handleFileChange} />
    </label>
  </div>

  {/* FORM — RIGHT (SINGLE COLUMN) */}
  <div className="lg:col-span-2 flex flex-col gap-5">
    {/* PRODUCT NAME */}
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600">
        Product Name
      </label>
      <input
        {...register("productName", {
          required: "Product name is required",
        })}
        placeholder="e.g. Margherita Pizza"
        className="border px-4 py-2.5 rounded-lg w-full
                   focus:ring-2 focus:ring-green-500 outline-none"
      />
      {errors.productName && (
        <p className="text-red-500 text-sm mt-1">
          {errors.productName.message}
        </p>
      )}
    </div>

    {/* DESCRIPTION */}
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600">
        Description
      </label>
      <input
        {...register("description", {
          required: "Description is required",
        })}
        placeholder="Short description"
        className="border px-4 py-2.5 rounded-lg w-full
                   focus:ring-2 focus:ring-green-500 outline-none"
      />
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}
    </div>

    {/* CATEGORY */}
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600">
        Category
      </label>
      <select
        {...register("category", {
          required: "Please select a category",
        })}
        className="border px-4 py-2.5 rounded-lg w-full
                   focus:ring-2 focus:ring-green-500 outline-none"
      >
        <option value="">Choose Category</option>
        <option value="Pizza">Pizza</option>
        <option value="Shake">Shake</option>
      </select>
      {errors.category && (
        <p className="text-red-500 text-sm mt-1">
          {errors.category.message}
        </p>
      )}
    </div>

    {/* PRICE */}
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600">
        Price
      </label>
      <input
        type="text"
        {...register("price", {
          required: "Price is required",
        })}
        placeholder="₹ 199"
        className="border px-4 py-2.5 rounded-lg w-full no-spinner
                   focus:ring-2 focus:ring-green-500 outline-none"
      />
      {errors.price && (
        <p className="text-red-500 text-sm mt-1">
          {errors.price.message}
        </p>
      )}
    </div>

    {/* BUTTON */}
    <div className="flex justify-end pt-4">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white
                   px-10 py-3 rounded-lg text-sm font-semibold shadow-md"
      >
        ➕ Add Product
      </button>
    </div>
  </div>
</form>

        </div>
      </div>
    </div>
  );
}
