
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

export default function Bill() {
  const [bills, setBills] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const [loading, setLoading] = useState(true);
  const [openNote, setOpenNote] = useState(null);

  const getBills = async () => {
    try {
      const res = await baseUrl.get("bill");
      setBills(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Bills load nahi hue!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const getStatusText = (status) => {
    if (status === 1) return "Pending";
    return "Done";
  };

  const getStatusClass = (status) => {
    if (status === 1) return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    return "bg-green-100 text-green-700 border border-green-300";
  };

  const updateStatus = async (billId, newStatus) => {
    try {
      await baseUrl.put(`bill/${billId}`, {
        id: billId,
        status: newStatus,
      });
      setBills((prev) =>
        prev.map((b) => (b.id === billId ? { ...b, status: newStatus } : b))
      );
      toast.success("Status updated!");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Status update nahi hua!");
    }
  };

  const getBillTotal = (bill) => {
    return bill.billItems?.reduce((sum, item) => sum + item.total, 0) ?? 0;
  };

  const handlePrint = (bill) => {
    const itemRows = bill.billItems
      .map(
        (item) => `
        <tr>
          <td>${item.product?.name ?? "Product"}</td>
          <td style="text-align:center">${item.quantity}</td>
          <td style="text-align:right">₹${item.price}</td>
          <td style="text-align:right">₹${item.total}</td>
        </tr>`
      )
      .join("");

    const win = window.open("", "", "width=420,height=620");
    win.document.write(`
      <html>
        <head>
          <title>Bill #${bill.id}</title>
          <style>
            body { font-family: Arial; padding: 24px; font-size: 14px; }
            h2 { text-align: center; margin-bottom: 4px; }
            p { margin: 2px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { padding: 6px 4px; border-bottom: 1px solid #eee; }
            th { text-align: left; background: #f5f5f5; }
            .total { font-weight: bold; font-size: 16px; text-align: right; margin-top: 12px; }
          </style>
        </head>
        <body>
          <h2>Restaurant Bill</h2>
          <p>Table: #${bill.tableId ?? "N/A"}</p>
          <p>Bill #${bill.id}</p>
          <p>Status: ${getStatusText(bill.status)}</p>
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>${itemRows}</tbody>
          </table>
          <p class="total">Grand Total: ₹${getBillTotal(bill)}</p>
          ${bill.note ? `<p style="margin-top:12px">Note: ${bill.note}</p>` : ""}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const filteredBills = bills
    .filter((b) => (activeTab === "current" ? b.status !== 2 : b.status === 2))
    .sort((a, b) => b.id - a.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 font-medium">Bills load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          🧾 Bills
          <span className="ml-3 text-lg font-medium text-gray-400">
            ({filteredBills.length})
          </span>
        </h2>
        <button
          onClick={getBills}
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
          🕐 Pending Bills
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            activeTab === "completed"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
          }`}
        >
          ✅ Done Bills
        </button>
      </div>

      {filteredBills.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-5xl mb-4">🧾</p>
          <p className="text-xl font-medium">Koi bill nahi hai</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.map((bill) => {
            const total = getBillTotal(bill);
            return (
              <div
                key={bill.id}
                className="bg-white rounded-2xl shadow-md border border-green-100 p-5 flex flex-col hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Table #{bill.tableId ?? "N/A"}
                    </h3>
                    <p className="text-xs text-gray-400">Bill #{bill.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(bill.status)}`}>
                    {getStatusText(bill.status)}
                  </span>
                </div>

                <hr className="mb-3" />

                <div className="flex flex-col gap-2 mb-4">
                  {bill.billItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {item.product?.profile ? (
                          <img
                            src={`https://myrestaurentclean.runasp.net/${item.product.profile}`}
                            alt={item.product.name}
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
                            {item.product?.name ?? `Item #${item.id}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-green-700 text-sm">
                        ₹{item.total}
                      </span>
                    </div>
                  ))}
                </div>

                {bill.note && (
                  <>
                    <button
                      onClick={() => setOpenNote(openNote === bill.id ? null : bill.id)}
                      className="flex items-center gap-2 text-sm text-green-700 font-semibold mb-2"
                    >
                      <i className="fa-solid fa-note-sticky"></i>
                      Customer Note {openNote === bill.id ? "▲" : "▼"}
                    </button>
                    {openNote === bill.id && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm mb-3">
                        {bill.note}
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-100">
                  <span className="text-gray-500 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-green-700">₹{total}</span>
                </div>

                <div className="mt-auto flex gap-3">
                  {bill.status === 1 && (
                    <button
                      onClick={() => updateStatus(bill.id, 2)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                      ✅ Done
                    </button>
                  )}
                  <button
                    onClick={() => handlePrint(bill)}
                    className="flex-1 bg-gray-800 hover:bg-black text-white py-2 rounded-lg font-semibold transition-all"
                  >
                    🖨 Print
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}