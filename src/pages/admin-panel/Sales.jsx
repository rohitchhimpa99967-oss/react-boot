import React, { useState } from "react";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";

export default function SalesPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const salesStats = [
    { title: "Today's Sales", value: "₹4,250", icon: "fa-calendar-day" },
    { title: "This Week", value: "₹28,600", icon: "fa-calendar-week" },
    { title: "This Month", value: "₹1,12,400", icon: "fa-calendar" },
    { title: "Total Orders", value: "342", icon: "fa-receipt" },
  ];

  const salesData = [
    {
      id: 1,
      table: 12,
      items: ["Pizza", "Coke", "Garlic Bread"],
      amount: "₹690",
      date: "Today",
      status: "Paid",
    },
    {
      id: 2,
      table: 8,
      items: ["Burger", "Fries"],
      amount: "₹420",
      date: "Today",
      status: "Paid",
    },
    {
      id: 3,
      table: 16,
      items: ["Pasta", "Cold Coffee", "Brownie"],
      amount: "₹1,150",
      date: "Yesterday",
      status: "Paid",
    },
  ];

  return (
    <div className="lg:flex min-h-screen bg-[#f6faf7]">
      <NavBar1 />

      <div className="flex-1">
        <DashBoardBar1 name="Sales" />

        <div className="p-4 sm:p-6">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {salesStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-green-100 rounded-xl p-4 shadow flex items-center gap-4"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                  <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                  <h3 className="text-lg font-bold text-gray-800">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow border border-green-100 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-green-700">
                Recent Orders
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-green-700">
                  <tr>
                    <th className="p-3">Order</th>
                    <th className="p-3">Table</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {salesData.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-b hover:bg-green-50"
                    >
                      <td className="p-3 font-semibold">#{sale.id}</td>
                      <td className="p-3">Table {sale.table}</td>
                      <td className="p-3 font-semibold text-green-700">
                        {sale.amount}
                      </td>
                      <td className="p-3">{sale.date}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          {sale.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelectedOrder(sale)}
                          className="px-3 py-1.5 text-xs rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Order #{selectedOrder.id}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Table: {selectedOrder.table}
            </p>

            <ul className="border rounded-lg divide-y mb-4">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx} className="p-2 text-sm">
                  🍽 {item}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <span className="font-bold text-green-700">
                {selectedOrder.amount}
              </span>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
