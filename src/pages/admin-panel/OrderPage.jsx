import React, { useState } from "react";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";

export default function KitchenPage() {
  const orders = [
    {
      table: 16,
      items: [
        { name: "Margarita Pizza", qty: 1 },
        { name: "Corn Pizza", qty: 1 },
        { name: "Onion Pizza", qty: 1 },
      ],
      status: "Preparing",
      note: "Extra cheese please",
    },
    {
      table: 12,
      items: [
        { name: "Capsicum Pizza", qty: 1 },
        { name: "Corn Pizza", qty: 1 },
        { name: "Farm Pizza", qty: 1 },
      ],
      status: "Pending",
      note: "",
    },
    {
      table: 8,
      items: [
        { name: "Farm Pizza", qty: 1 },
        { name: "Corn Pizza", qty: 1 },
        { name: "Onion Pizza", qty: 1 },
      ],
      status: "Completed",
      note: "No onions",
    },
  ];

  const [openNote, setOpenNote] = useState(null);
  const [activeTab, setActiveTab] = useState("current");

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Preparing":
        return "bg-orange-100 text-orange-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "current") {
      return order.status !== "Completed";
    }
    return order.status === "Completed";
  });

  return (
    <div className="lg:flex min-h-screen bg-[#f6faf7]">
      <NavBar1 />

      <div className="flex-1">
        <DashBoardBar1 name="Kitchen Orders" />

        <div className="p-6">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Orders ({filteredOrders.length})
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("current")}
              className={`px-6 py-2 rounded-full font-semibold transition-all
                ${
                  activeTab === "current"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-green-200 hover:bg-orange-50"
                }`}
            >
              Current Orders
            </button>

            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-6 py-2 rounded-full font-semibold transition-all
                ${
                  activeTab === "delivered"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
                }`}
            >
              Delivered Orders
            </button>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md border border-green-100 p-5 flex flex-col hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    Table #{order.table}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <hr className="mb-3" />

                {/* Items */}
                <div className="flex flex-col gap-2 mb-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-green-50 px-3 py-2 rounded-md"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold">x{item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Customer Note */}
                {order.note && (
                  <>
                    <button
                      onClick={() =>
                        setOpenNote(openNote === idx ? null : idx)
                      }
                      className="flex items-center gap-2 text-sm text-green-700 font-semibold mb-2"
                    >
                      <i className="fa-solid fa-note-sticky"></i>
                      Customer Note
                    </button>

                    {openNote === idx && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm mb-3">
                        {order.note}
                      </div>
                    )}
                  </>
                )}

                {/* Actions */}
                {order.status !== "Completed" && (
                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-2 rounded-lg font-semibold shadow-md transition-all">
                      Preparing
                    </button>

                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                      Done
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
