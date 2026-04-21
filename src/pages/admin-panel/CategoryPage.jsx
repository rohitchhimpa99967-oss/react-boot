import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../components/layout/NavBar1";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const onDelete = async (id) => {
    try {
      const response = await baseUrl.delete(`category/${id}`);
      console.log(response.data);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));

      toast.success("Category deleted ✅");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const getCategories = async () => {
    const response = await baseUrl.get("category");
    console.log(response)
    setCategories(response.data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);



  return (
    <div className="p-6 max-w-full">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-green-100 p-4 flex flex-col"
          >
            <div className="w-full h-56 rounded-xl overflow-hidden border">
              <img
                // src={`https://apistudent2.codedonor.in${cat.profile}`}
                src={`https://myrestaurentclean.runasp.net/${cat.profile}`}
                alt={cat.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            <h3 className="text-center text-base font-semibold mt-3">
              {cat.name}
            </h3>

            <div className="flex sm:flex-col xl:flex-row justify-center gap-2 mt-3">
              <EditButton
                onClick={() => navigate(`/category/edit/${cat.id}`)}
              />
              <DeleteButton onClick={() => onDelete(cat.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
