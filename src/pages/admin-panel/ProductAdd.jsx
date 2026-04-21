
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await baseUrl.get("category");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to load categories");
    }
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (data) => {
    
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("categoryId", data.categoryId);
      formData.append("profile", selectedFile);  // ✅ Changed: image -> profile

      const token = localStorage.getItem("token");

      await baseUrl.post("product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Added Successfully ✅");
      navigate("/products");
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error(error.response?.data?.title || "Failed to add product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10">
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
      
        <div>
          <label className="block mb-3 font-medium">Product Image *</label>
          <label className="flex items-center justify-center w-full h-56 border-2 border-dashed rounded-xl cursor-pointer hover:border-green-500 transition overflow-hidden bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-center text-gray-400">
                <i className="fa-solid fa-cloud-arrow-up text-4xl mb-2"></i>
                <p className="text-sm font-medium">Upload product image</p>
                <p className="text-xs">PNG, JPG, JPEG</p>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {!selectedFile && (
            <p className="text-gray-500 text-xs mt-2">* Image is required</p>
          )}
        </div>

    
        <div className="lg:col-span-2 space-y-6">
          
          <div>
            <label className="block mb-2 font-medium">Product Name *</label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Description *</label>
            <textarea
              rows="3"
              {...register("description", { required: "Description is required" })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Price *</label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Category *</label>
            <select
              {...register("categoryId", { required: "Category is required" })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

        
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-12 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}