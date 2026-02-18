// import React from 'react'
// import Btn1 from '../../components/buttons/Btn1'
// import { useNavigate } from 'react-router-dom'

// const UserCart = () => {

//   const navigate = useNavigate()
//   const handleBack = () => {
//     navigate("/User-Home")
//   }

//   return (
//     <div className='flex flex-col lg:flex-row justify-center gap-2 p-6 sm:p-6 lg:p-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen'>

//       {/* LEFT : CART ITEMS */}
//       <div
//         className='w-full lg:w-[800px] bg-white border rounded-2xl flex flex-col overflow-hidden
//         hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-all duration-500'
//       >

//         {/* HEADER */}
//         <div className='flex sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b gap-4'>
//           <div className='flex items-center gap-1'>
//             <img src="../src/assets/images/Logo.png" alt="not found" width="80px"  className='sm:w-[120px]'/>
//             <h1 className='font-bold text-xl sm:text-2xl'>Taste Maker</h1>
//           </div>
//           <div className="hover:scale-110 transition-all duration-300">
//             <Btn1 btntxt={"Back"} onclick={handleBack} />
//           </div>
//         </div>

//         {/* ITEM CARDS */}
//         {[
//           { img: "Pizzacart.jpg", title: "Pizza", desc: "Corn, Capsicum, Cheese", qty: 2, price: "$18" },
//           { img: "DrinkCart.jpg", title: "Mojito", desc: "Mint leaves, Soda, Sugar", qty: 4, price: "$10" },
//           { img: "RiceCart.webp", title: "Veg Biryani", desc: "Rice, Soya, Paneer, Lemon", qty: 1, price: "$25" },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className='group flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-5 border-b gap-4
//             hover:bg-gradient-to-r hover:from-gray-50 hover:to-white
//             hover:-translate-y-1 transition-all duration-500'
//           >
//             <div className='flex items-center gap-4'>
//               <div className='overflow-hidden rounded-xl'>
//                 <img
//                   src={`../src/assets/images/${item.img}`}
//                   alt="not found"
//                   width="90px"
//                   className='rounded-xl group-hover:scale-110 transition-transform duration-500'
//                 />
//               </div>

//               <div>
//                 <h1 className='font-semibold text-lg group-hover:text-red-500 transition'>{item.title}</h1>
//                 <p className=' text-sm text-gray-500 '>{item.desc}</p>
//               </div>
//             </div>

//             <div className='flex items-center gap-6 mr-28 sm:mr-0'>

//               <div className='flex items-center justify-between border rounded-md w-[90px] h-[36px] px-2
//               hover:shadow-lg hover:scale-105 transition-all duration-300'>
//                 <button className="hover:text-red-600 transition"><i className="fa-solid fa-minus"></i></button>
//                 <span className='font-semibold'>{item.qty}</span>
//                 <button className="hover:text-green-600 transition"><i className="fa-solid fa-plus"></i></button>
//               </div>
//               <h1 className='font-semibold group-hover:text-green-600 transition'>{item.price}</h1>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT : BILL SUMMARY */}
//       <div className='w-full lg:w-[360px]'>

//         <div className='border rounded-2xl bg-white p-6
//         hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
//         transition-all duration-500'>

//           <h2 className='font-semibold text-lg border-b pb-3 mb-4'>
//             Bill Summary
//           </h2>

//           <div className='flex justify-between text-sm mb-3'>
//             <span className='text-gray-600'>Subtotal</span>
//             <span className='font-medium'>₹300</span>
//           </div>

//           <div className='flex justify-between text-sm mb-4'>
//             <span className='text-gray-600'>GST (5%)</span>
//             <span className='font-medium'>₹15</span>
//           </div>

//           <div className='flex justify-between border-t pt-4'>
//             <span className='font-semibold text-lg'>Total</span>
//             <span className='font-semibold text-lg text-green-600'>₹315</span>
//           </div>

//           <div className='flex justify-end border-t pt-6 hover:scale-110 transition-all duration-300'>
//             <Btn1 btntxt={"Place Order"} width='w-[150px]' />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserCart

import React, { useEffect, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import Btn1 from "../../components/buttons/Btn1";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log("clicked");
    navigate("/user2");
  };

  const [cart, setCart] = useState({ items: [] });

  const getCartItems = async () => {
    try {
      const response = await baseUrl.get("Cart/me");
      console.log(response);

      setCart(response.data);
    } catch (error) {
      toast.error("Error Item Loading");
    }
  };
  const updateQty = async (item, type) => {
    try {
      let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

      if (newQty === 0) {
        await baseUrl.delete(`Cart/item/${item.cartItemId}`);
      } else {
        await baseUrl.put(`Cart/item/${item.cartItemId}`, {
          quantity: newQty,
        });
      }

      getCartItems();
    } catch (err) {
      console.log(err);
    }
  };
  const orderPlacee = () => {
    toast.success("Order Placed");
  };

  const removeItem = async (id) => {
    console.log(id);
    try {
      const response = await baseUrl.delete(`Cart/item/${id}`);
      console.log(response);
      getCartItems();
      // response
      // setCart(updated);
    } catch (error) {
      console.log("error");
    }
  };
  console.log(cart);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="p-6">
       <button
          onClick={() => navigate("/user2")}
          className="flex w-[100px] justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 my-6 rounded-lg font-semibold shadow-md transition"
        >
          
         Back
        </button>
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty 🛒</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 bg-white shadow p-4 rounded-xl mb-4"
            >
              <img
                src={`https://apistudent2.codedonor.in${item.imageUrl}`}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-bold">{item.productName}</h2>

                <div className="flex items-center justify-between">
                  <p>₹ {item.price}</p>
                  {/* <p>Qty: {item.quantity}</p> */}
                  <div className="flex items-center gap-3 border rounded-lg px-3 py-1 w-[100px]">
                    <button
                      onClick={() => updateQty(item, "dec")}
                      className="text-xl font-bold"
                    >
                      −
                    </button>

                    <span className="font-semibold min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQty(item, "inc")}
                      className="text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.cartItemId)}
                className="text-red-600 font-semibold md:pt-6"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-6">Total: ₹ {totalPrice}</h2>
        </>
      )}
      <div className="flex justify-center">
        <button
          onClick={orderPlacee}
          className="w-full mt-6 py-3 rounded-xl
  bg-gradient-to-r from-green-600 to-emerald-600
  text-white text-lg font-semibold
  flex items-center justify-center gap-3
  hover:from-black hover:to-gray-800
  hover:scale-[1.02]
  transition-all duration-300 lg:w-[200px]"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default UserCart;
