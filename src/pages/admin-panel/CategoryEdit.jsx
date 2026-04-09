// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { baseUrl } from "../../services/BaseUrl";
// import { toast } from "react-toastify";

// export default function CategoryEdit() {
//   const [preview, setPreview] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // 🔹 Fetch category by id
//   useEffect(() => {
//     if (id) {
//       getCategoryById();
//     }
//   }, [id]);

//   const getCategoryById = async () => {
//     try {
//       const response = await baseUrl.get(`Category/${id}`);
//       const data = response.data;

//       // 🔹 Prefill form (IMPORTANT FIX)
//       reset({
//         catName: data.name,
//         description: data.description,
//       });
//       console.log(data);

//       // 🔹 profile preview if exists
//       if (data.profileUrl) {
//         setPreview(`https://apistudent2.codedonor.in${data.profileUrl}`); // backend full profile URL
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to load category");
//     }
//   };

//   // 🔹 profile change handler
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // 🔹 Submit update
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("id", id);
//       formData.append("name", data.catName);
//       formData.append("description", data.description);

//       if (data.profile?.[0]) {
//         formData.append("profile", data.profile[0]);
//       }

//       const token = localStorage.getItem("token");

//       await baseUrl.put(`Category/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Category Updated ✅");
//       navigate("/category");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.title || "Update failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10 border border-green-100">
//       <div className="flex items-center gap-6 mb-8">
//         <button
//           onClick={() => navigate("/category")}
//           className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg"
//         >
//           <i className="fa-solid fa-angle-left"></i> Back
//         </button>
//         <h1 className="text-3xl font-bold">Edit Category</h1>
//       </div>

//       <form
//         className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         {/* profile */}
//         <div>
//           <label className="block mb-3 font-medium">Category profile</label>

//           <label className="flex items-center justify-center w-full h-56 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-50">
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             ) : (
//               <div className="text-center text-green-600">
//                 <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
//                 <p>Upload profile</p>
//                 <p className="text-xs text-gray-500">PNG / JPG</p>
//               </div>
//             )}

//             <input
//               type="file"
//               className="hidden"
//               accept="profile/*"
//               {...register("profile")}
//               onChange={handleFileChange}
//             />
//           </label>
//         </div>

//         {/* FORM */}
//         <div className="lg:col-span-2 space-y-6">
//           <div>
//             <label className="block mb-2 font-medium">Category Name</label>
//             <input
//               type="text"
//               {...register("catName", {
//                 required: "Category name is required",
//                 minLength: { value: 3, message: "Min 3 characters" },
//               })}
//               className="w-full border rounded-lg px-4 py-3"
//             />
//             {errors.catName && (
//               <p className="text-red-500 text-sm">{errors.catName.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Description</label>
//             <textarea
//               rows="4"
//               {...register("description", {
//                 required: "Description is required",
//                 minLength: { value: 5, message: "Min 5 characters" },
//               })}
//               className="w-full border rounded-lg px-4 py-3 resize-none"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           <div className="flex justify-end pt-4">
//             <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-lg font-semibold">
//               Update Category
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
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
    setValue, // ✅ setValue use karenge instead of reset
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      catName: "",
      description: "",
    },
  });

  // 🔹 FETCH BY ID
  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await baseUrl.get(`Category/${id}`);
      const data = res.data;

      console.log("API Response:", data);

      // ✅ setValue se manually set karo
      setValue("catName", data.data.name || "");
      setValue("description", data.data.description || "");

      // ✅ Profile image set karo
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

  // 🔹 PROFILE CHANGE
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

      // ✅ Agar nayi file select hui hai to wo bhejo
      if (selectedFile) {
        formData.append("profile", selectedFile);
      }

      const token = localStorage.getItem("token");

      await baseUrl.put(`Category/${id}`, formData, {
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
