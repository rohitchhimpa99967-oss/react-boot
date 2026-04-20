
import React, { useEffect, useMemo, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";

const statsConfig = [
  { key: "todaySales", title: "Today's Sales", icon: "fa-calendar-day" },
  { key: "thisWeekSales", title: "This Week", icon: "fa-calendar-week" },
  { key: "thisMonthSales", title: "This Month", icon: "fa-calendar" },
  { key: "totalOrders", title: "Total Orders", icon: "fa-receipt" },
];

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function SalesPage() {
  const [stats, setStats] = useState(statsConfig);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBillTotal = (bill) =>
    bill.billItems?.reduce(
      (sum, item) => sum + Number(item.total || item.price * item.quantity),
      0
    ) ?? 0;

  const getDateLabel = (date) => {
    if (!date) return "-";

    const billDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (billDate.toDateString() === today.toDateString()) return "Today";
    if (billDate.toDateString() === yesterday.toDateString())
      return "Yesterday";

    return billDate.toLocaleDateString("en-IN");
  };

  const fetchData = async () => {
    try {
      const [salesRes, billRes] = await Promise.all([
        baseUrl.get("sale"),
        baseUrl.get("Bill"),
      ]);

      const sales = salesRes.data?.data;
      const bills = billRes.data?.data ?? [];

      if (sales) {
        const updatedStats = statsConfig.map((item) => ({
          ...item,
          value:
            item.key === "totalOrders"
              ? sales[item.key] ?? 0
              : formatCurrency(sales[item.key]),
        }));

        setStats(updatedStats);
      }

      setOrders(
        bills
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Sales Page Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const recentOrders = useMemo(() => {
  return orders.map((bill) => ({
    id: bill.id,
    table: bill.tableId ?? "N/A",

    items:
      bill.billItems?.map(
        (item) =>
          `${item.product?.name ?? `Item #${item.id}`} x${item.quantity}`
      ) ?? [],

    amount: formatCurrency(getBillTotal(bill)),
    date: getDateLabel(bill.createdDate),
    status: bill.status === 2 ? "Paid" : "Pending",
  }));
}, [orders]);
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, icon, value }, index) => (
          <div
            key={index}
            className="bg-white border border-green-100 rounded-xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-green-100 text-green-700">
              <i className={`fa-solid ${icon}`} />
            </div>

            <div>
              <p className="text-xs text-gray-500">{title}</p>
              <h3 className="text-lg font-bold text-gray-800">
                {loading ? "..." : value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-green-700">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-green-50 text-green-700">
              <tr>
                {["Order", "Table", "Amount", "Date", "Status", "Action"].map(
                  (head) => (
                    <th key={head} className="p-3 text-left">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-green-50">
                  <td className="p-3 font-semibold">#{order.id}</td>
                  <td className="p-3">Table {order.table}</td>
                  <td className="p-3 font-semibold text-green-700">
                    {order.amount}
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 text-xs rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {!recentOrders.length && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

             {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Order #{selectedOrder.id}
              </h3>
              <p className="text-sm text-gray-600">
                Table {selectedOrder.table}
              </p>
            </div>

            <ul className="border rounded-lg divide-y">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="p-2 text-sm">
                  🍽 {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
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