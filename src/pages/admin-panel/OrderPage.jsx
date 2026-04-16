
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [openNote, setOpenNote] = useState(null);
  const [activeTab, setActiveTab] = useState("current");
  const [loading, setLoading] = useState(true);

 


  const getOrders = async () => {
    try {
      const response = await baseUrl.get("Order");
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Orders Load Nahi Hue!");
    } finally {
      setLoading(false);
    }
  };
   const productGet = async () => {
    try {
      const res = await baseUrl.get("Product");
      var result=res.data.data;
      setProducts(result);
      console.log(result)
      
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    productGet();
    getOrders();
  }, []);

  const getProduct = (productId) => {
    return products.find((p) => p.id === productId) ;
   
  };

  const getOrderTotal = (items) => {
    return items.reduce((total, item) => {
      const product = getProduct(item.product.id);
     
    
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };


const updateStatus = async (orderId, newStatus) => {
  try {
    await baseUrl.put(`Order/${orderId}`, {
      id: orderId,
      status: newStatus,
    });


    toast.success("Status Updated!");
    await getOrders();
  } catch (error) {
    console.log("Error:", error.response?.data);
    toast.error("Status Update Nahi Hua!");
  }
};


  const getStatusLabel = (status) => {
    switch (status) {
      case 1: return "Pending";
      case 2: return "Preparing";
      case 3: return "Done";
      default: return "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 1: return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case 2: return "bg-orange-100 text-orange-700 border border-orange-300";
      case 3: return "bg-green-100 text-green-700 border border-green-300";
      default: return "bg-gray-100 text-gray-700";
    }
  };

const filteredOrders = orders.filter((order) =>
  activeTab === "current" ? order.status !== 3 : order.status === 3
).sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

console.log("Active Tab:", activeTab);
console.log("Filtered Orders:", filteredOrders); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 font-medium">Orders load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ── Heading ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          🍽️ Kitchen Orders
          <span className="ml-3 text-lg font-medium text-gray-400">
            ({filteredOrders.length})
          </span>
        </h2>
        <button
          onClick={getOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-full text-sm font-semibold hover:bg-green-50 transition-all"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            activeTab === "current"
              ? "bg-orange-500 text-white shadow-md"
              : "bg-white text-gray-700 border border-green-200 hover:bg-orange-50"
          }`}
        >
          🕐 Current Orders
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            activeTab === "delivered"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
          }`}
        >
          ✅ Delivered Orders
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-xl font-medium">Koi order nahi hai</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const total = getOrderTotal(order.items);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md border border-green-100 p-5 flex flex-col hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Table #{order.tableNo}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Order #{order.id} • {new Date(order.createdDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <hr className="mb-3" />

                <div className="flex flex-col gap-2 mb-4">
                  {order.items.map((item) => {
                    const product = getProduct(item.product.id);
                    const itemTotal = product ? product.price * item.quantity : 0;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {product?.profile ? (
                            <img
                              src={product.profile}
                              alt={product.name}
                              className="w-8 h-8 rounded-full object-cover border border-green-200"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs">
                              🍴
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {product ? product.name : `Product #${item.productId}`}
                            </p>
                            <p className="text-xs text-gray-400">
                              ₹{product ? product.price : "?"} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-green-700 text-sm">
                          ₹{itemTotal}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {order.note && (
                  <>
                    <button
                      onClick={() => setOpenNote(openNote === order.id ? null : order.id)}
                      className="flex items-center gap-2 text-sm text-green-700 font-semibold mb-2"
                    >
                      <i className="fa-solid fa-note-sticky"></i>
                      Customer Note {openNote === order.id ? "▲" : "▼"}
                    </button>
                    {openNote === order.id && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm mb-3">
                        {order.note}
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-100">
                  <span className="text-gray-500 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-green-700">₹{total}</span>
                </div>

                {order.status !== 3 && (
                  <div className="mt-auto flex gap-3">
                    {order.status === 1 && (
                      <button
                        onClick={() => updateStatus(order.id, 2)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-2 rounded-lg font-semibold shadow-md transition-all"
                      >
                        🍳 Preparing
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus(order.id, 3)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                      ✅ Done
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}