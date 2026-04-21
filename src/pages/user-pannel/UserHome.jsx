
import React, { useEffect, useRef, useState } from "react";
import Btn1 from "../../components/buttons/Btn1";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

const UserHome = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  
  const productRefs = useRef({});


  const getCategories = async () => {
    try {
      const res = await baseUrl.get("category");
      setCategories(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedCategory(res.data.data[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const productGet = async () => {
    try {
      const res = await baseUrl.get("product");
      const result=res.data.data;
      setProducts(result)
      console.log(result)
     
    } catch (err) {
      console.log(err.response);
    }
  };



const getCartItems = async () => {
  try {
    const res = await baseUrl.get("cart");
    setCart(res.data.data);
  } catch (err) {
    console.log(err);
  }
};


const getOrCreateCart = async () => {
  try {
    const res = await baseUrl.get("cart");
    const carts = res.data.data;

    if (carts && carts.length > 0) {
      return carts[0].id; 
    }

    const createRes = await baseUrl.post("cart", {
      tableId: 1,
      note: ""
    });
    return createRes.data.data.id; 
  } catch (err) {
    console.error(err);
    toast.error("Cart error");
    return null;
  }
};

const cartAdd = async (prod) => {
  try {
    const currentCartId = await getOrCreateCart();
    if (!currentCartId) return;

    const items = cart[0]?.items ?? [];

    const existing = items.find(
      (i) => i.product?.id === prod.id && i.cartId === currentCartId
    );

    if (existing) {
      await baseUrl.put(`cart-item/${existing.id}`, {
        cartId: existing.cartId,
        productId: existing.product.id,
        quantity: existing.quantity + 1,
        unitPrice: prod.price,
      });
      toast.success("Quantity Updated ✅");
    } else {
      await baseUrl.post("cart-item", {
        cartId: currentCartId,
        productId: prod.id,
        quantity: 1,
        unitPrice: prod.price,
      });
      toast.success("Added to Cart 🛒");
    }

    await getCartItems();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};
  useEffect(() => {
    getCategories();
    productGet();
    getCartItems();
  }, []);

  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = (prod) => {
    setSelectedCategory(prod.categoryId);
    setSearchQuery("");
    setTimeout(() => {
      const ref = productRefs.current[prod.id];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.classList.add("ring-4", "ring-green-400");
        setTimeout(() => ref.classList.remove("ring-4", "ring-green-400"), 2000);
      }
    }, 100);
  };

  const filteredProducts = products.filter(
    (p) => !selectedCategory || p.category?.id === selectedCategory
  );

  return (
    <div className="flex flex-col flex-1 gap-10 p-4 ms-4">
      
      <div className="w-full h-52 sm:h-72 rounded-xl overflow-hidden group">
        <img
          src="../src/assets/images/Userdemo-home.avif"
          alt="banner"
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="flex sm:flex-row justify-between items-center gap-6">
        
        <div className="relative">
          <div className="flex items-center gap-2 border-b-2 pb-1">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              type="text"
              className="w-48 sm:w-64 focus:outline-none transition"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && searchedProducts.length > 0 && (
            <div className="absolute top-10 left-0 w-72 bg-white shadow-xl rounded-xl z-50 border border-green-100 max-h-60 overflow-y-auto">
              {searchedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSearchClick(prod)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-green-50 cursor-pointer transition"
                >
                  <img
                    // src={`https://apistudent2.codedonor.in${prod.profile}`}
                    src={`https://myrestaurentclean.runasp.net//${prod.profile}`}
                    className="w-10 h-10 rounded-lg object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div>
                    <p className="font-semibold text-sm">{prod.name}</p>
                    <p className="text-xs text-green-600">₹ {prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && searchedProducts.length === 0 && (
            <div className="absolute top-10 left-0 w-72 bg-white shadow-xl rounded-xl z-50 border border-red-100 px-4 py-3 text-sm text-red-400">
              Koi product nahi mila 😕
            </div>
          )}
        </div>

        <div className="hover:scale-110 hover:shadow-xl transition-all duration-300">
          <Btn1
            btntxt={"Go To Cart"}
            width="w-[120px]"
            onclick={() => navigate("/cart")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-6 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`w-full border rounded-xl text-center overflow-hidden group
              cursor-pointer bg-white
              hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
              transition-all duration-500
              ${selectedCategory === cat.id
                ? "bg-green-500 text-white border-green-500"
                : "bg-white border-green-200 hover:bg-green-100"
              }`}
          >
            <div className="overflow-hidden">
              <img
                src={`https://myrestaurentclean.runasp.net//${cat.profile}`}
                alt={cat.name}
                className="w-full h-[160px] sm:h-[180px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h1 className="py-3 font-semibold text-base sm:text-lg text-gray-800 group-hover:text-green-600 transition">
              {cat.name}
            </h1>
          </div>
        ))}
      </div>

      <div className="w-full bg-slate-100 rounded-xl p-5">
        <h1 className="text-2xl font-bold mb-6">
          {categories.find((c) => c.id === selectedCategory)?.name} :-
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              ref={(el) => (productRefs.current[prod.id] = el)}
              className="w-[280px] sm:w-[300px] border rounded-xl text-center p-2 overflow-hidden group
                cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                transition-all duration-500 bg-white"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={`https://myrestaurentclean.runasp.net//${prod.profile}`}
                  alt={prod.name}
                  className="w-full h-[160px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h1 className="mt-3 font-bold text-lg group-hover:text-red-600 transition">
                {prod.name}
              </h1>
              <h2 className="mt-1 font-semibold text-green-600">₹ {prod.price}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{prod.description}</p>
              <button
                onClick={() => cartAdd(prod)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg mt-4
                  hover:from-black hover:to-gray-800 hover:scale-110 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;