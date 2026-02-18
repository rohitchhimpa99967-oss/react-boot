import React, { useEffect, useState } from "react";
import Btn1 from "../../components/buttons/Btn1";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import NavBar from "../../components/layout/NavBar";
import { toast } from "react-toastify";

const UserHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const getCategories = async () => {
    try {
      const res = await baseUrl.get("Category");
      console.log(res)
      setCategories(res.data.data);

      if (res.data.data.length > 0) {
        setSelectedCategory(res.data.data[0].id);
      }
    } catch (err) {
      console.log("Error");
    }
  };
  const cartAdd = async (prod) => {
    try {
      const payload = {
        productId: prod.id,
        quantity: 1
      };
      const response = await baseUrl.post("Cart/add", payload);
      console.log(response);
      toast.success("Item Added to cart")
    } catch (error) {
      toast.error("Error");
    }
    // const existingItem = cart.find((item) => item.id === prod.id);

    // if (existingItem) {
    //   cart = cart.map((item) =>
    //     item.id === prod.id ? { ...item, qty: item.qty + 1 } : item,
    //   );
    // } else {
    //   cart.push({
    //     productId: prod.id,
    //     quantity: 1,
    //   });
    // }
  };

  const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    getCategories();
    productGet();
  }, []);
  const handleCart = () => {
    navigate("/user3");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {/* <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-black text-white px-3 py-2 rounded 
          hover:bg-gray-800 hover:scale-110 transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button> */}

      {/* Sidebar */}
      {/* <div
          className={`
            w-40 h-screen bg-slate-100 border-r-2 border-white p-5 text-center 
            absolute top-0 left-0 z-40 transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
          `}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 20px",
          }}
        >
          <img src="../src/assets/images/Logo.png" alt="not found" />

          <div className="mt-20 flex flex-col gap-6">
            {["Home", "About", "Contact", "Rate Us"].map((item, i) => (
              <div
                key={i}
                className="border-b-[1.5px] cursor-pointer px-2 py-2 rounded
                hover:bg-black hover:text-white hover:translate-x-2 transition-all duration-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div> */}

      {/* Main Content */}
      <div className="flex flex-col flex-1 gap-10 p-4 ms-4">
        {/* Banner */}
        <div className="w-full h-52 sm:h-72 rounded-xl overflow-hidden group">
          <img
            src="../src/assets/images/Userdemo-home.avif"
            alt="not found"
            className="w-full h-full object-cover rounded-xl 
              group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Search + Button */}
        <div className="flex sm:flex-row justify-between items-center gap-6">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="border-b-2 ml-3 w-15 sm:w-64 focus:outline-none focus:border-black transition"
              placeholder="Search"
            />
          </div>

          <div className="hover:scale-110 hover:shadow-xl transition-all duration-300">
            <Btn1
              btntxt={"Go To Cart"}
              width="w-[120px]"
              onclick={handleCart}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:flex gap-6 justify-items-center">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedCategoryId(cat.id);
                console.log("clicked");
              }}
              className={`w-full border rounded-xl text-center overflow-hidden group
      cursor-pointer bg-white
      hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
      transition-all duration-500 
       ${
         selectedCategory === cat.id
           ? "bg-green-500 text-white border-green-500"
           : "bg-white border-green-200 hover:bg-green-100"
       }`}
            >
              <div className="overflow-hidden">
                <img
                  src={`https://apistudent2.codedonor.in${cat.imageUrl}`}
                  alt={cat.name}
                  className="w-full h-[160px] sm:h-[180px] object-cover
          group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <h1
                className="py-3 font-semibold text-base sm:text-lg
      text-gray-800 group-hover:text-green-600 transition"
              >
                {cat.name}
              </h1>
            </div>
          ))}
        </div>

        {/* Pizza Section */}
        <div className="w-full bg-slate-100 rounded-xl p-5">
          <h1 className="text-2xl font-bold mb-6">
            {categories.find((c) => c.id === selectedCategoryId)?.name} :-
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {products
              .filter(
                (p) => !selectedCategory || p.categoryId === selectedCategory,
              )
              .map((prod) => (
                <div
                  key={prod.id}
                  className="w-[280px] sm:w-[300px] border rounded-xl text-center p-2 overflow-hidden group
        cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500 bg-white"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={`https://apistudent2.codedonor.in${prod.imageUrl}`}
                      alt={prod.name}
                      className="w-full h-[160px] object-cover 
            group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <h1 className="mt-3 font-bold text-lg group-hover:text-red-600 transition">
                    {prod.name}
                  </h1>

                  <h2 className="mt-1 font-semibold text-green-600">
                    ₹ {prod.price}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {prod.description}
                  </p>

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

          {/* <div className="flex flex-wrap justify-center gap-6">
              {[399, 119, 229].map((price, i) => (
                <div
                  key={i}
                  className="w-[300px] h-[300px] border rounded-xl text-center p-2 overflow-hidden group
                  cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src="../src/assets/images/UserDemo1.jpg"
                      alt=""
                      className="w-full h-[150px] object-cover 
                      group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <h1 className="mt-2 font-bold group-hover:text-red-600 transition">
                    Corn Pizza
                  </h1>
                  <h1>Price: {price}</h1>
                  <h1>Cheese, Corn, Tomato</h1>

                  <button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg mt-3
                    hover:from-black hover:to-gray-800 hover:scale-110 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div> */}
        </div>
      </div>
    </>
  );
};

export default UserHome;
