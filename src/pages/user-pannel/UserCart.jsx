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

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  // const getCartItems = async () => {
  //   try {
  //     const response = await baseUrl.get("Cart");
  //     console.log(response.data.data);

  //     setCart(response.data.data);
  //   } catch (error) {
  //     toast.error("Error Item Loading");
  //   }
  // };
  const getCartItems = async () => {
    try {
      const response = await baseUrl.get("Cart");
      const data = response.data.data;
      console.log(data);

      // Duplicates merge karo agar backend duplicate bhej raha ho
      const merged = data.reduce((acc, item) => {
        const existing = acc.find((i) => i.productId === item.productId);
        console.log("Existing:", existing);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);

      setCart(merged);
    } catch (error) {
      console.log(error);
      toast.error("Error Item Loading");
    }
  };
  // const updateQty = async (item, type) => {
  //   try {
  //     let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

  //     if (newQty === 0) {
  //       await baseUrl.delete(`Cart/${item.id}`);
  //     } else {
  //       await baseUrl.put(`Cart/${item.id}`, {
  //         quantity: newQty,
  //       });
  //     }

  //     getCartItems();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const updateQty = async (item, type) => {
    try {
      let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

      if (newQty === 0) {
        await baseUrl.delete(`Cart/${item.id}`);
      } else {
        await baseUrl.put(`Cart/${item.id}`, {
          quantity: newQty,
        });
      }

      await getCartItems(); // await lagao taaki update ke baad fresh data aaye
    } catch (err) {
      console.log(err);
    }
  };
  // const placeOrder = async () => {
  //   try {
  //     const orderData = {
  //       tableNo: 2,
  //       note: "",
  //       items: cart.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //       })),
  //     };

  //     const response = await baseUrl.post("Order", orderData, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (response.data.succeeded) {
  //       toast.success("Order Place Ho Gaya! 🎉");

  //       // Cart ke saare items delete karo backend se
  //       await Promise.all(cart.map((item) => baseUrl.delete(`Cart/${item.id}`)));

  //       setCart([]); // frontend cart bhi clear karo
  //     }

  //   } catch (error) {
  //     console.log("Order Error:", error.response?.data);
  //     toast.error("Order Place Nahi Hua!");
  //   }
  // };
  // const placeOrder = async () => {
  //   try {
  //     // ── Step 1: Order POST ──
  //     const orderData = {
  //       tableNo: 2,
  //       note: "",
  //       items: cart.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //       })),
  //     };

  //     const orderResponse = await baseUrl.post("Order", orderData, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (orderResponse.data.succeeded) {

  //       // ── Step 2: Products fetch karo ──
  //       const productRes = await baseUrl.get("Product");
  //       const productList = productRes.data.data;

  //       // ── Step 3: Har item ka price products se lo ──
  //       const cartWithPrice = cart.map((item) => {
  //         const product = productList.find((p) => p.id === item.productId);
  //         return {
  //           ...item,
  //           price: product ? product.price : 0,
  //         };
  //       });

  //       // ── Step 4: Total calculate karo ──
  //       const totalAmount = cartWithPrice.reduce((total, item) => {
  //         return total + item.price * item.quantity;
  //       }, 0);

  //       // ── Step 5: Bill POST ──
  // //    const billData = {
  // //   bill: {                        // ← "Bill" property (case-insensitive JSON mein)
  // //     userId: "user1",             // ← UserId required hai backend mein
  // //     tableId: 2,
  // //     totalAmount: totalAmount,
  // //     note: "",
  // //     status: 1,
  // //     isPaid: false,
  // //     items: cartWithPrice.map((item) => ({
  // //       productId: item.productId,
  // //       price: item.price,
  // //       quantity: item.quantity,
  // //       total: item.price * item.quantity,
  // //     })),
  // //   },
  // // };

  // // console.log("Bill Data:", billData); // ← verify karo
  // // await baseUrl.post("Bill", billData, {
  // //   headers: { "Content-Type": "application/json" },
  // // });

  //       toast.success("Order Place Ho Gaya! 🎉");

  //       // ── Step 6: Cart clear karo ──
  //       await Promise.all(cart.map((item) => baseUrl.delete(`Cart/${item.id}`)));
  //       setCart([]);
  //     }

  //   } catch (error) {
  //     console.log("Order Error:", error.response?.data);
  //     toast.error("Order Place Nahi Hua!");
  //   }
  // };
  // const placeOrder = async () => {
  //   try {
  //     // Step 1: Order POST
  //     const orderData = {
  //       tableNo: 2,
  //       note: "",
  //       items: cart.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //       })),
  //     };

  //     const orderResponse = await baseUrl.post("Order", orderData, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     console.log("Order Response:", orderResponse.data);
  //     if (orderResponse.data.succeeded) {
  //       const orderId = orderResponse.data.data; // ← Order ka id lo

  //       // Step 2: Bill POST — orderId query param mein bhejo
  //       await baseUrl.post(
  //         `Bill/from-Order?orderId=${orderId}`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       );
  //       // Step 2: Fresh cart fetch karo aur SAARI entries delete karo
  //       const freshCart = await baseUrl.get("Cart");
  //       const allItems = freshCart.data.data;
  //       await Promise.all(
  //         allItems.map((item) => baseUrl.delete(`Cart/${item.id}`)),
  //       );

  //       setCart([]);
  //       toast.success("Order Place Ho Gaya! 🎉");
  //     }
  //   } catch (error) {
  //     console.log("Order Error:", error.response?.data);
  //     toast.error("Order Place Nahi Hua!");
  //   }
  // };
  const placeOrder = async () => {
  try {
    const orderData = {
      tableNo: 2,
      note: "",
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    const orderResponse = await baseUrl.post("Order", orderData);

    console.log("Order Response:", orderResponse.data);

    // ❌ agar null aa raha hai
    let orderId = orderResponse.data?.data;

    // ✅ fallback hack
    if (!orderId) {
      const res = await baseUrl.get("Order");
      const lastOrder = res.data.data.slice(-1)[0];
      orderId = lastOrder.id;
    }

    console.log("Final OrderId:", orderId);

    const response= await baseUrl.post(`Bill/ from-Order?orderId=${orderId}`);
    console.log(response);
 await Promise.all(
      cart.map((item) => baseUrl.delete(`Cart/${item.id}`))
    );

    setCart([]);
    toast.success("Order Place Ho Gaya 🎉");

  } catch (err) {
    console.log(err.response?.data);
    toast.error("Order Failed ❌");
  }
};
  const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      setProducts(res.data.data);
      console.log(res.data);
      console.log(products);
    } catch (err) {
      console.log(err.response);
    }
  };
  const orderPlacee = () => {
    placeOrder();
    toast.success("Order Placed");
  };

  const removeItem = async (id) => {
    console.log(id);
    try {
      const response = await baseUrl.delete(`Cart/${id}`);
      console.log(response);
      getCartItems();
      // response

      console.log(cart);
    } catch (error) {
      console.log("error");
    }
  };

  // const totalPrice = 100;
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  // const totalPrice = cart.items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0,
  // );
  0;
  useEffect(() => {
    getCartItems();
    productGet();
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
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 bg-white shadow p-4 rounded-xl mb-4"
            >
              <img
                src={`https://apistudent2.codedonor.in${item.profile}`}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                {/* <h2 className="font-bold">{item.productName}</h2> */}
                <h2 className="font-bold">
                  {products.find((p) => p.id === item.productId)?.name}
                </h2>

                <div className="flex items-center justify-between">
                  {/* <p>₹ {item.price}</p> */}
                  <p>
                    $ {products.find((p) => p.id === item.productId)?.price}
                  </p>
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
                onClick={() => removeItem(item.id)}
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
