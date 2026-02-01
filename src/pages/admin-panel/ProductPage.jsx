//   // const categories = [
//   //   { name: "Pizza", icon: "fa-pizza-slice" },
//   //   { name: "Burger", icon: "fa-hamburger" },
//   //   { name: "Pasta", icon: "fa-bowl-food" },
//   //   { name: "Dessert", icon: "fa-cake-candles" },
//   //   { name: "Chinese", icon: "fa-bowl-rice" },
//   //   { name: "Drinks", icon: "fa-martini-glass" },
//   //   { name: "Snacks", icon: "fa-cookie" },
//   // ];

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import { toast } from "react-toastify";

export default function ProductPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cateGet = async () => {
    try {
      const res = await baseUrl.get("Category");
      setCategories(res.data);

      if (res.data.length > 0) {
        setSelectedCategory(res.data[0].id);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const onDelete = async (id) => {
    try {
      const response = await baseUrl.delete(`Product/${id}`);
      console.log(response.data);
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
      toast.success("Product Deleted");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    cateGet();
    productGet();
  }, []);

  return (
    <div className="p-5 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        <button
          onClick={() => navigate("/products/add")}
          className="flex w-[170px] items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
        >
          <i className="fa-solid fa-plus"></i>
          Add Product
        </button>
      </div>

      {categories.length <= 4 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
                ${
                  selectedCategory === cat.id
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white border-green-200 hover:bg-green-100"
                }`}
            >
              <i className="fa-solid fa-box text-2xl mb-1"></i>
              <span className="font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 w-full overflow-x-auto">
          <div className="flex gap-4 min-w-max px-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-w-[120px] flex-shrink-0 flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
                  ${
                    selectedCategory === cat.id
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white border-green-200 hover:bg-green-100"
                  }`}
              >
                <i className="fa-solid fa-box text-2xl mb-1"></i>
                <span className="font-semibold">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((p) => !selectedCategory || p.categoryId === selectedCategory)
          .map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden">
                <img
                  src={`https://apistudent2.codedonor.in${prod.imageUrl}`}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="mt-3 font-semibold text-lg text-center">
                {prod.name}
              </h2>

              <div className="flex md:flex-col lg:flex-row gap-2 mt-3">
                <EditButton />
                <DeleteButton onClick={()=>onDelete(prod.id)} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
