// import React, { useEffect, useState } from "react";
// import Btn1 from "../../components/buttons/Btn1";
// import { useNavigate } from "react-router-dom";
// import { baseUrl } from "../../services/BaseUrl";
// import NavBar from "../../components/layout/NavBar";
// import { toast } from "react-toastify";

// const UserHome = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItem, setCartItem] = useState([]);
//     const [tables, setTables] = useState([]);
  
//    const tableNumberr=1;
//   const [selectedCategoryId, setSelectedCategoryId] = useState(6);
//   const [cart, setCart] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const getCategories = async () => {
//     try {
//       const res = await baseUrl.get("Category");
//       console.log(res)
//       setCategories(res.data.data);

//       if (res.data.data.length > 0) {
//         setSelectedCategory(res.data.data[0].id);
//       }
//     } catch (err) {
//       console.log("Error");
//     }
//   };
//     const getCartItems = async () => {
//       try {
//         const response = await baseUrl.get("Cart");
//         console.log(response.data.data);
  
//         setCart(response.data.data);
//       } catch (error) {
//         toast.error("Error Item Loading");
//       }
//     };
//  const cartAdd = async (prod) => {
//   try {
//     // Check karo already cart mein hai?
//     // const existing = cart.find((i) => i.productId === prod.id);

//     // if (existing) {
//     //   // Already hai → quantity badhao
//     //   await updateQty(existing, "inc");
//     //   toast.success("Quantity Updated");
//     //   return; // POST call mat karo
//     // }
//   const existing = cart.find((i) => i.productId === prod.id);

//     if (existing) {
//       // ← updateQty ki jagah directly PUT call karo
//       const formData = new FormData();
//       formData.append("Quantity", existing.quantity + 1);

//       await baseUrl.put(`Cart/${existing.id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Quantity Updated");
//       await getCartItems();
//       return;
//     }
//     // Naya item → POST karo
//     const formData = new FormData();
//     formData.append("ProductId", prod.id);
//     formData.append("Quantity", 1);
//     formData.append("TableId", 2);

//     await baseUrl.post("Cart", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     await getCartItems();
//     toast.success("Item Added to cart");
//   } catch (error) {
//     toast.error("Error");
//   }


//   // const cartAdd = async (prod) => {
//   //   try {
//   //      const formData = new FormData();
//   //   formData.append("ProductId", prod.id);
//   //   formData.append("Quantity", 1);
//   //   formData.append("TableId", 2);
//   //    const response = await baseUrl.post("Cart", formData, {
//   //     headers: {
//   //       "Content-Type": "multipart/form-data",
//   //     },
//   //   });
//   //     console.log(response.data);
//   //     getCartItems();
//   //     toast.success("Item Added to cart")
//   //   } catch (error) {
//   //     toast.error("Error");
//   //   }
//     // const existingItem = cart.find((item) => item.id === prod.id);

//     // if (existingItem) {
//     //   cart = cart.map((item) =>
//     //     item.id === prod.id ? { ...item, qty: item.qty + 1 } : item,
//     //   );
//     // } else {
//     //   cart.push({
//     //     productId: prod.id,
//     //     quantity: 1,
//     //   });
//     // }
//   };
  
//   const getTables = async () => {
//       try {
//         const res = await baseUrl.get("Table");
//         setTables(res.data.data);
//         console.log(res.data.data)
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   const productGet = async () => {
//     try {
//       const res = await baseUrl.get("Product");
//       setProducts(res.data.data);
//       console.log(res.data.data  )

//     } catch (err) {
//       console.log(err.response);
//     }
//   };
//   // console.log(tables)
//   useEffect(() => {
//     getCategories();
//     productGet();
//     getTables()
//   }, []);
//   const handleCart = () => {
//     navigate("/user3");
//   };
 

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       {/* <button
//           className="sm:hidden fixed top-4 left-4 z-50 bg-black text-white px-3 py-2 rounded 
//           hover:bg-gray-800 hover:scale-110 transition-all duration-200"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button> */}

//       {/* Sidebar */}
//       {/* <div
//           className={`
//             w-40 h-screen bg-slate-100 border-r-2 border-white p-5 text-center 
//             absolute top-0 left-0 z-40 transition-transform duration-300
//             ${open ? "translate-x-0" : "-translate-x-full"}
//             sm:translate-x-0
//           `}
//           style={{
//             boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 20px",
//           }}
//         >
//           <img src="../src/assets/images/Logo.png" alt="not found" />

//           <div className="mt-20 flex flex-col gap-6">
//             {["Home", "About", "Contact", "Rate Us"].map((item, i) => (
//               <div
//                 key={i}
//                 className="border-b-[1.5px] cursor-pointer px-2 py-2 rounded
//                 hover:bg-black hover:text-white hover:translate-x-2 transition-all duration-300"
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div> */}

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 gap-10 p-4 ms-4">
//         {/* Banner */}
//         <div className="w-full h-52 sm:h-72 rounded-xl overflow-hidden group">
//           <img
//             src="../src/assets/images/Userdemo-home.avif"
//             alt="not found"
//             className="w-full h-full object-cover rounded-xl 
//               group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>

//         {/* Search + Button */}
//         <div className="flex sm:flex-row justify-between items-center gap-6">
//           <div>
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <input
//               type="text"
//               className="border-b-2 ml-3 w-15 sm:w-64 focus:outline-none focus:border-black transition"
//               placeholder="Search"
//             />
//           </div>

//           <div className="hover:scale-110 hover:shadow-xl transition-all duration-300">
//             <Btn1
//               btntxt={"Go To Cart"}
//               width="w-[120px]"
//               onclick={handleCart}
//             />
//           </div>
//         </div>
// <div>1</div>
//         {/* Categories */}
//         <div className="grid grid-cols-2 sm:flex gap-6 justify-items-center">
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               onClick={() => {
//                 setSelectedCategory(cat.id);
//                 setSelectedCategoryId(cat.id);
//                 console.log("clicked");
//               }}
//               className={`w-full border rounded-xl text-center overflow-hidden group
//       cursor-pointer bg-white
//       hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
//       transition-all duration-500 
//        ${
//          selectedCategory === cat.id
//            ? "bg-green-500 text-white border-green-500"
//            : "bg-white border-green-200 hover:bg-green-100"
//        }`}
//             >
//               <div className="overflow-hidden">
//                 <img
//                   src={`https://apistudent2.codedonor.in${cat.profile}`}
//                   alt={cat.name}
//                   className="w-full h-[160px] sm:h-[180px] object-cover
//           group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>

//               <h1
//                 className="py-3 font-semibold text-base sm:text-lg
//       text-gray-800 group-hover:text-green-600 transition"
//               >
//                 {cat.name}
//               </h1>
//             </div>
//           ))}
//         </div>

//         {/* Pizza Section */}
//         <div className="w-full bg-slate-100 rounded-xl p-5">
//           <h1 className="text-2xl font-bold mb-6">
//             {categories.find((c) => c.id === selectedCategoryId)?.name} :-
//           </h1>
//           <div className="flex flex-wrap justify-center gap-6">
//             {products
//               .filter(
//                 (p) => !selectedCategory || p.categoryId === selectedCategory,
//               )
//               .map((prod) => (
//                 <div
//                   key={prod.id}
//                   className="w-[280px] sm:w-[300px] border rounded-xl text-center p-2 overflow-hidden group
//         cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500 bg-white"
//                 >
//                   <div className="overflow-hidden rounded-t-xl">
//                     <img
//                       src={`https://apistudent2.codedonor.in${prod.profile}`}
//                       alt={prod.name}
//                       className="w-full h-[160px] object-cover 
//             group-hover:scale-110 transition-transform duration-700"
//                     />
//                   </div>

//                   <h1 className="mt-3 font-bold text-lg group-hover:text-red-600 transition">
//                     {prod.name}
//                   </h1>

//                   <h2 className="mt-1 font-semibold text-green-600">
//                     ₹ {prod.price}
//                   </h2>

//                   <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                     {prod.description}
//                   </p>

//                   <button
//                     onClick={() => cartAdd(prod)}
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg mt-4
//   hover:from-black hover:to-gray-800 hover:scale-110 transition-all duration-300"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//           </div>

//           {/* <div className="flex flex-wrap justify-center gap-6">
//               {[399, 119, 229].map((price, i) => (
//                 <div
//                   key={i}
//                   className="w-[300px] h-[300px] border rounded-xl text-center p-2 overflow-hidden group
//                   cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500"
//                 >
//                   <div className="overflow-hidden rounded-t-xl">
//                     <img
//                       src="../src/assets/images/UserDemo1.jpg"
//                       alt=""
//                       className="w-full h-[150px] object-cover 
//                       group-hover:scale-110 transition-transform duration-700"
//                     />
//                   </div>

//                   <h1 className="mt-2 font-bold group-hover:text-red-600 transition">
//                     Corn Pizza
//                   </h1>
//                   <h1>Price: {price}</h1>
//                   <h1>Cheese, Corn, Tomato</h1>

//                   <button
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg mt-3
//                     hover:from-black hover:to-gray-800 hover:scale-110 transition-all duration-300"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserHome;











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

  // Har product ka ref — scroll ke liye
  const productRefs = useRef({});

  // ── Categories Fetch ──
  const getCategories = async () => {
    try {
      const res = await baseUrl.get("Category");
      setCategories(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedCategory(res.data.data[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ── Products Fetch ──
  const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  // ── Cart Fetch ──
  // const getCartItems = async () => {
  //   try {
  //     const response = await baseUrl.get("Cart");
  //     setCart(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ── Cart Add ──
  // const cartAdd = async (prod) => {
  //   try {
  //     const existing = cart.find((i) => i.productId === prod.id);

  //     if (existing) {
  //       const formData = new FormData();
  //       formData.append("Quantity", existing.quantity + 1);
  //       await baseUrl.put(`Cart/${existing.id}`, formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //       toast.success("Quantity Updated");
  //     } else {
  //       const formData = new FormData();
  //       formData.append("ProductId", prod.id);
  //       formData.append("Quantity", 1);
  //       formData.append("TableId", 2);
  //       await baseUrl.post("Cart", formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //       toast.success("Item Added to cart");
  //     }

  //     await getCartItems();
  //   } catch (error) {
  //     toast.error("Error");
  //   }
  // };
// ── Get or Create Cart ──
const getOrCreateCart = async () => {
  try {
    const res = await baseUrl.get("Cart");
    const carts = res.data.data;

    if (carts && carts.length > 0) {
      return carts[0].id;
    }

    // Create new cart with JSON (not FormData)
    const createRes = await baseUrl.post("Cart", {
      tableId: 1,
      note: ""
    });
    return createRes.data.data;  // returns the new cart id
  } catch (err) {
    console.error(err);
    toast.error("Cart error");
    return null;
  }
};

// ── Fetch CartItems ──
const getCartItems = async () => {
  try {
    const res = await baseUrl.get("CartItem");
    setCart(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

// ── Add to Cart ──
const cartAdd = async (prod) => {
  try {
    const currentCartId = await getOrCreateCart();
    if (!currentCartId) return;

    const existing = cart.find(
      (i) => i.productId === prod.id && i.cartId === currentCartId
    );

    if (existing) {
      // Update quantity with JSON
      await baseUrl.put(`CartItem/${existing.id}`, {
        cartId: existing.cartId,
        productId: existing.productId,
        quantity: existing.quantity + 1,
        unitPrice: prod.price,
      });
      toast.success("Quantity Updated ✅");
    } else {
      // Add new CartItem with JSON
      await baseUrl.post("CartItem", {
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

  // ── Search Logic ──
  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Search result pe click → scroll to product ──
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

  // ── Filtered Products by Category ──
  const filteredProducts = products.filter(
    (p) => !selectedCategory || p.categoryId === selectedCategory
  );

  return (
    <div className="flex flex-col flex-1 gap-10 p-4 ms-4">
      
      {/* ── Banner ── */}
      <div className="w-full h-52 sm:h-72 rounded-xl overflow-hidden group">
        <img
          src="../src/assets/images/Userdemo-home.avif"
          alt="banner"
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* ── Search + Cart Button ── */}
      <div className="flex sm:flex-row justify-between items-center gap-6">
        
        {/* Search with Dropdown */}
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

          {/* Search Dropdown */}
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

          {/* No results */}
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
            onclick={() => navigate("/user3")}
          />
        </div>
      </div>

      {/* ── Categories ── */}
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
                // src={`https://apistudent2.codedonor.in${cat.profile}`}
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

      {/* ── Products Section ── */}
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
                  // src={`https://apistudent2.codedonor.in${prod.profile}`}
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