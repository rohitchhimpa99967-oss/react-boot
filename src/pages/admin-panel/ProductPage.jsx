
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
  const [loading, setLoading] = useState(true);

  const cateGet = async () => {
    try {
      const res = await baseUrl.get("category");
      setCategories(res.data.data); 

      if (res.data.data.length > 0) {
        setSelectedCategory(res.data.data[0].id);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to load categories");
    }
  };

  const productGet = async () => {
    try {
      setLoading(true);
      const res = await baseUrl.get("product");
      setProducts(res.data.data);
      console.log(res.data.data)
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await baseUrl.delete(`product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((prod) => prod.id !== id));
      toast.success("Product Deleted ✅");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    cateGet();
    productGet();
  }, []);

  const filteredProducts = products.filter(
    (p) => !selectedCategory || p.category.id === selectedCategory,
  );
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

      {categories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No categories found. Please add categories first.
        </div>
      ) : categories.length <= 4 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
                ${
                  selectedCategory === cat.id
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "bg-white border-green-200 hover:bg-green-100 hover:shadow-md"
                }`}
            >
              {cat.profile ? (
                <img
                  src={`https://myrestaurentclean.runasp.net//${cat.profile}`}
                  alt={cat.name}
                  className="w-12 h-12 object-cover rounded-full mb-2"
                />
              ) : (
                <i className="fa-solid fa-box text-2xl mb-2"></i>
              )}
              <span className="font-semibold text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 w-full overflow-x-auto">
          <div className="flex gap-4 min-w-max px-2 pb-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-w-[120px] flex-shrink-0 flex flex-col items-center p-4 rounded-xl cursor-pointer border transition
                  ${
                    selectedCategory === cat.id
                      ? "bg-green-500 text-white border-green-500 shadow-lg"
                      : "bg-white border-green-200 hover:bg-green-100 hover:shadow-md"
                  }`}
              >
                {cat.profile ? (
                  <img
                    src={`https://myrestaurentclean.runasp.net//${cat.profile}`}
                    alt={cat.name}
                    className="w-12 h-12 object-cover rounded-full mb-2"
                  />
                ) : (
                  <i className="fa-solid fa-box text-2xl mb-2"></i>
                )}
                <span className="font-semibold text-sm text-center">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500">No products found</p>
          <p className="text-gray-400 mt-2">
            {selectedCategory
              ? "No products in this category"
              : "Add your first product to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                {prod.profile ? (
                  <img
                    
                    src={`https://myrestaurentclean.runasp.net//${prod.profile}`}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23d1d5db' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fa-solid fa-image text-6xl text-gray-300"></i>
                  </div>
                )}
              </div>

              <div className="flex-1 mt-3">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {prod.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {prod.description}
                </p>
                <p className="text-xl font-bold text-green-600 mt-2">
                  ₹{prod.price?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <EditButton
                  onClick={() => navigate(`/products/edit/${prod.id}`)}
                  className="flex-1"
                />
                <DeleteButton
                  onClick={() => onDelete(prod.id)}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
