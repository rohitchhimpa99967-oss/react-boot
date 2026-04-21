
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    setValue,  
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      catName: "",
      description: "",
    },
  });
 
  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await baseUrl.get(`category/${id}`);
      const data = res.data;

      console.log("API Response:", data);

   
      setValue("catName", data.data.name || "");
      setValue("description", data.data.description || "");

       
      if (data.data.profile) {
        setPreview(`https://myrestaurentclean.runasp.net/${data.data.profile}`);
        // setPreview(`https://apistudent2.codedonor.in${data.data.profile}`);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching category:", err);
      toast.error("Failed to load category");
      setLoading(false);
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
    try {
      const formData = new FormData();

      formData.append("name", data.catName);
      formData.append("description", data.description);
 
      if (selectedFile) {
        formData.append("profile", selectedFile);
      }

      const token = localStorage.getItem("token");

      await baseUrl.put(`category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category Updated ✅");
      navigate("/category");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.title || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-500">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10">
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={() => navigate("/category")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Edit Category</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* PROFILE IMAGE */}
        <div>
          <label className="block mb-3 font-medium">Category Profile</label>
          <label className="flex items-center justify-center w-full h-56 border-2 border-dashed rounded-xl cursor-pointer hover:border-green-500 transition overflow-hidden bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="Category Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-500">Upload Profile</span>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            {preview ? "Click to change image" : "Click to upload image"}
          </p>
        </div>

        {/* FIELDS */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block mb-2 font-medium">Category Name</label>
            <input
              {...register("catName", {
                required: "Category name is required",
              })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter category name"
            />
            {errors.catName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.catName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter category description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-12 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
