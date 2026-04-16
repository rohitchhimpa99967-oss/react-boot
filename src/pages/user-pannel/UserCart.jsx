
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]); 
  const [products, setProducts] = useState([]);


  const getCartItems = async () => {
    try {
      const response = await baseUrl.get("Cart");
      const carts = response.data.data;

      if (carts && carts.length > 0) {
        const firstCart = carts[0];
        setCartId(firstCart.id);
        setCartItems(firstCart.items || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading cart");
    }
  };

  const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };



const updateQty = async (item, type) => {
  try {
    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

    if (newQty < 1) {
      await removeItem(item);
      return;
    }

    console.log("Updating CartItem:", item.id, "with:", {
      cartId: item.cartId,
      productId: item.productId,
      quantity: newQty,
      unitPrice: item.unitPrice,
    });

    const res = await baseUrl.put(`CartItem/${item.id}`, {
      cartId: item.cartId,
      productId: item.productId,
      quantity: newQty,
      unitPrice: item.unitPrice,
    });

    console.log("Update response:", res.data);
    await getCartItems();
  } catch (err) {
    console.log("Update error:", err.response?.data || err.message);
    toast.error("Failed to update quantity");
  }
};

const removeItem = async (item) => {
  try {
    console.log("Deleting CartItem:", item.id);
    const res = await baseUrl.delete(`CartItem/${item.id}`);
    console.log("Delete response:", res.data);
    await getCartItems();
    toast.success("Item removed");
  } catch (error) {
    console.log("Delete error:", error.response?.data || error.message);
    toast.error("Failed to remove item");
  }
};

  // ── Place Order ──
  const placeOrder = async () => {
    try {
      const orderData = {
        tableNo: 1,
        note: "",
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await baseUrl.post("Order", orderData);
      let orderId = orderResponse.data?.data;

      if (!orderId) {
        const res = await baseUrl.get("Order");
        const lastOrder = res.data.data.slice(-1)[0];
        orderId = lastOrder.id;
      }

      await baseUrl.post(`Bill/from-Order?orderId=${orderId}`);

      // Clear all cart items
      await Promise.all(cartItems.map((item) => baseUrl.delete(`CartItem/${item.id}`)));

      setCartItems([]);
      toast.success("Order Placed! 🎉");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Order Failed ❌");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

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

      {cartItems.length === 0 ? (
        <p>Cart is empty 🛒</p>
      ) : (
        <>
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white shadow p-4 rounded-xl mb-4"
              >
                <img
                  src={`https://myrestaurentclean.runasp.net//${product?.profile}`}
                  className="w-24 h-24 object-cover rounded"
                  alt="product"
                  onError={(e) => (e.target.style.display = "none")}
                />

                <div className="flex-1">
                  <h2 className="font-bold">{product?.name}</h2>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-green-600 font-semibold">
                      ₹ {item.unitPrice}
                    </p>
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

                  <p className="text-sm text-gray-500 mt-1">
                    Subtotal: ₹ {item.totalPrice}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <h2 className="text-xl font-bold mt-6">Total: ₹ {totalPrice}</h2>
        </>
      )}

      <div className="flex justify-center">
        <button
          onClick={placeOrder}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold flex items-center justify-center gap-3 hover:from-black hover:to-gray-800 hover:scale-[1.02] transition-all duration-300 lg:w-[200px]"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default UserCart;