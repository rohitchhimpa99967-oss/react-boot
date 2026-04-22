
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("cart");
  const [pendingBill, setPendingBill] = useState(null);

  const getCartItems = async () => {
    try {
      const response = await baseUrl.get("cart");
      const carts = response.data.data;
      if (carts && carts.length > 0) {
        const firstCart = carts[0];
        setCartId(firstCart.id);
        setCartItems(firstCart.items || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading cart");
    }
  };

  const productGet = async () => {
    try {
      const res = await baseUrl.get("product");
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (item, type) => {
    try {
      const newQty =
        type === "inc" ? item.quantity + 1 : item.quantity - 1;

      if (newQty < 1) {
        await removeItem(item);
        return;
      }

      await baseUrl.put(`cart-item/${item.id}`, {
        cartId: item.cartId,
        productId: item.product.id,
        quantity: newQty,
        unitPrice: item.unitPrice,
      });

      await getCartItems();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (item) => {
    try {
      await baseUrl.delete(`cart-item/${item.id}`);
      await getCartItems();
      toast.success("Item removed");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to remove item");
    }
  };

  const getOrCreateBill = async () => {
    try {
      const res = await baseUrl.get("bill");
      const bills = res.data.data;
      const openBill = bills.find((b) => b.status === 1);

      if (openBill) return openBill.id;

      const createRes = await baseUrl.post("bill", {
        tableId: 1,
        note: "",
      });

      const newBill = createRes.data?.data;
      const newBillId = Array.isArray(newBill)
        ? newBill[0]?.id
        : newBill;

      return newBillId;
    } catch (err) {
      console.error(err);
      toast.error("Bill error");
      return null;
    }
  };

  const closeBill = async () => {
    try {
      const res = await baseUrl.get("bill");
      const bills = res.data.data;
      const openBill = bills.find((b) => b.status === 1);

      if (!openBill) {
        toast.info("Koi pending bill nahi hai");
        return;
      }

      await baseUrl.put(`bill/${openBill.id}`, {
        ...openBill,
        status: 2,
      });

      toast.success("Bill closed! 🧾");
      setPendingBill(null);
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Bill close nahi hua");
    }
  };

  const placeOrder = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Cart is empty!");
        return;
      }

      const orderResponse = await baseUrl.post("order", {
        tableId: 1,
        note: "",
      });

      const orderData = orderResponse.data?.data;
      const orderId = Array.isArray(orderData)
        ? orderData[0]?.id
        : orderData;

      if (!orderId) {
        toast.error("Order ID nahi mila!");
        return;
      }

      await Promise.all(
        cartItems.map((item) =>
          baseUrl.post("order-item", {
            orderId: orderId,
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })
        )
      );

      const billId = await getOrCreateBill();

      if (!billId) return;

      await Promise.all(
        cartItems.map((item) =>
          baseUrl.post("bill-item", {
            billId: billId,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.unitPrice,
          })
        )
      );

      await Promise.all(
        cartItems.map((item) =>
          baseUrl.delete(`cart-item/${item.id}`)
        )
      );

      setCartItems([]);
      getPendingBill();
      toast.success("Order placed! Bill mein add ho gaya 🎉");
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(
        `Failed: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const getPendingBill = async () => {
    try {
      const res = await baseUrl.get("bill");
      const bills = res.data.data;
      const openBill = bills.find((b) => b.status === 1);
      setPendingBill(openBill || null);
    } catch (err) {
      console.log(err);
      toast.error("Error loading bill");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  useEffect(() => {
    getCartItems();
    productGet();
    getPendingBill();
  }, []);

  useEffect(() => {
    if (activeTab === "history") {
      getPendingBill();
    }
  }, [activeTab]);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/home")}
        className="flex w-[100px] justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 my-6 rounded-lg font-semibold shadow-md transition"
      >
        Back
      </button>

      <div className="flex border-b-2 border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("cart")}
          className={`px-6 py-3 text-base font-semibold transition-all duration-200 border-b-4 -mb-[2px] ${
            activeTab === "cart"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          My Cart
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 text-base font-semibold transition-all duration-200 border-b-4 -mb-[2px] ${
            activeTab === "history"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Current Bill
        </button>
      </div>

      {activeTab === "cart" && (
        <div>
          <h1 className="text-2xl font-bold mb-6">My Cart</h1>

          {cartItems.length === 0 ? (
            <p>Cart is empty 🛒</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const product = products.find(
                  (p) => p.id === item.product.id
                );

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white shadow p-4 rounded-xl mb-4"
                  >
                    <div className="flex-1">
                      <h2 className="font-bold">
                        {product?.name}
                      </h2>

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-green-600 font-semibold">
                          ₹ {item.unitPrice}
                        </p>

                        <div className="flex items-center gap-3 border rounded-lg px-3 py-1 w-[100px]">
                          <button
                            onClick={() =>
                              updateQty(item, "dec")
                            }
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQty(item, "inc")
                            }
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

              <h2 className="text-xl font-bold mt-6">
                Total: ₹ {totalPrice}
              </h2>
            </>
          )}

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={placeOrder}
              className="w-full mt-6 py-3 rounded-xl bg-green-600 text-white lg:w-[200px]"
            >
              Place Order
            </button>

            <button
              onClick={closeBill}
              className="w-full py-3 rounded-xl bg-red-600 text-white lg:w-[200px]"
            >
              Close Bill
            </button>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Current Bill
          </h1>

          {!pendingBill ||
          pendingBill.billItems.length === 0 ? (
            <p>Koi pending bill nahi hai</p>
          ) : (
            <>
              <div className="bg-white shadow rounded-xl p-5">
                <p className="font-bold mb-4">
                  Bill #{pendingBill.id}
                </p>

                {pendingBill.billItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-3"
                  >
                    <p>
                      {item.product?.name ?? "Product"} x{" "}
                      {item.quantity}
                    </p>

                    <p>₹ {item.total}</p>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4 flex justify-between font-bold">
                  <p>Total</p>
                  <p>₹ {pendingBill.totalAmount}</p>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  onClick={closeBill}
                  className="w-full py-3 rounded-xl bg-red-600 text-white lg:w-[200px]"
                >
                  Close Bill
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCart;