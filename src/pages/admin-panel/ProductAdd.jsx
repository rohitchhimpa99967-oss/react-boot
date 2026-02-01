import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function ProductAdd() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    console.log(file);
    if (file) setPreview(URL.createObjectURL(file));
  };
  const cateGet = async () => {
    try {
      const response = await baseUrl.get("Category");
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    cateGet();
  }, []);
  const handleCatSelect = (e) => {
    const catId = e.target.value;
    setCatId(e.target.value);
    console.log("Selected Category ID:", catId);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("categoryId", catId);
      formData.append("price", data.price);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }
      const token = localStorage.getItem("token");
console.log(data.name)
      const response = await baseUrl.post(
        "Product/create-with-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      navigate("/products");
      toast.success("Product Added Successfully ✅");
      reset();
      setPreview(null);
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.title || "Bad Request");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-10">
      <div className="flex gap-8">
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
            <input
              type="file"
              className="hidden"
              {...register("image", {
                required: "Category image is required",
              })}
              onChange={handleFileChange}
            />
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
              {...register("name", {
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
              onChange={handleCatSelect}
              className="border px-4 py-2.5 rounded-lg w-full
         focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Choose Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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
  );
}
