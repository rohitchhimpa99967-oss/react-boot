// import React, { useState, useRef, useEffect } from "react";
// import NavBar1 from "../../components/layout/NavBar1";
// import DashBoardBar1 from "../../components/layout/DashBoardBar1";
// import { baseUrl } from "../../services/BaseUrl";

// export default function Bill() {
//   const printRef = useRef();

//   const orders = [
//     {
//       table: 16,
//       items: [
//         { name: "Margarita Pizza", qty: 1, price: 250 },
//         { name: "Corn Pizza", qty: 1, price: 220 },
//         { name: "Onion Pizza", qty: 1, price: 200 },
//       ],
//       status: "Preparing",
//       note: "Extra cheese please",
//     },
//     {
//       table: 12,
//       items: [
//         { name: "Capsicum Pizza", qty: 1, price: 210 },
//         { name: "Corn Pizza", qty: 1, price: 220 },
//       ],
//       status: "Pending",
//       note: "",
//     },
//     {
//       table: 8,
//       items: [
//         { name: "Farm Pizza", qty: 1, price: 280 },
//         { name: "Corn Pizza", qty: 1, price: 220 },
//       ],
//       status: "Completed",
//       note: "No onions",
//     },
//   ];
//   const orderGet=async()=>
//   {
//     try
//     {
// const response = await baseUrl.get("Bill");
// const data= response;
// console.log(data);
//     }
//     catch(error)
//     {
// console.log("Bill not fetched")
//     }
//   };

//   const [activeTab, setActiveTab] = useState("current");

//   const getStatusClass = (status) => {
//     if (status === "Pending") return "bg-yellow-100 text-yellow-700";
//     if (status === "Preparing") return "bg-orange-100 text-orange-700";
//     return "bg-green-100 text-green-700";
//   };

//   const filteredOrders = orders.filter((o) =>
//     activeTab === "current"
//       ? o.status !== "Completed"
//       : o.status === "Completed",
//   );
// useEffect(()=>
// {
//   orderGet();
// },[]);
//   const handlePrint = () => {
//     const content = printRef.current.innerHTML;
//     const win = window.open("", "", "width=400,height=600");
//     win.document.write(`
//       <html>
//         <head>
//           <title>Print Bill</title>
//           <style>
//             body { font-family: Arial; padding: 20px; }
//             h2 { text-align: center; }
//             table { width: 100%; border-collapse: collapse; }
//             td, th { padding: 6px 0; border-bottom: 1px dashed #ccc; }
//             .total { font-weight: bold; margin-top: 10px; }
//           </style>
//         </head>
//         <body>${content}</body>
//       </html>
//     `);
//     win.document.close();
//     win.print();
//   };

//   return (
//     <div className="p-6">
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab("current")}
//           className={`px-5 py-2 rounded-full font-semibold ${
//             activeTab === "current"
//               ? "bg-orange-500 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Current
//         </button>
//         <button
//           onClick={() => setActiveTab("delivered")}
//           className={`px-5 py-2 rounded-full font-semibold ${
//             activeTab === "delivered"
//               ? "bg-green-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Completed
//         </button>
//       </div>

//       {/* Bills */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredOrders.map((order, idx) => {
//           const total = order.items.reduce(
//             (sum, i) => sum + i.qty * i.price,
//             0,
//           );

//           return (
//             <div key={idx} className="bg-white rounded-xl shadow-md border p-5">
//               {/* HEADER */}
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-bold text-lg">Table #{order.table}</h3>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
//                     order.status,
//                   )}`}
//                 >
//                   {order.status}
//                 </span>
//               </div>

//               {/* BILL CONTENT */}
//               <div ref={printRef}>
//                 <h2 className="font-bold mb-2">Restaurant Bill</h2>
//                 <table>
//                   <tbody>
//                     {order.items.map((item, i) => (
//                       <tr key={i}>
//                         <td>{item.name}</td>
//                         <td>x{item.qty}</td>
//                         <td align="right">₹{item.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 <div className="total">Total: ₹{total}</div>
//               </div>

//               {/* NOTE */}
//               {order.note && (
//                 <div className="mt-2 text-sm bg-yellow-50 p-2 rounded">
//                   📝 {order.note}
//                 </div>
//               )}

//               {/* ACTIONS */}
//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={handlePrint}
//                   className="flex-1 bg-gray-800 text-white py-2 rounded-lg"
//                 >
//                   🖨 Print
//                 </button>

//                 {order.status !== "Completed" && (
//                   <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">
//                     Done
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../../services/BaseUrl";

export default function Bill() {
  const [bills, setBills] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const printRef = useRef();

  const getBills = async () => {
    try {
      const res = await baseUrl.get("Bill");
      setBills(res.data.data);
      console.log("Bills:", res.data.data);
    } catch (err) {
      console.log("Error fetching bills");
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  // 🔥 status mapping
  const getStatusText = (status) => {
    if (status === 1) return "Pending";
    if (status === 2) return "Preparing";
    return "Completed";
  };

  const getStatusClass = (status) => {
    if (status === 1) return "bg-yellow-100 text-yellow-700";
    if (status === 2) return "bg-orange-100 text-orange-700";
    return "bg-green-100 text-green-700";
  };

  const filteredBills = bills.filter((b) =>
    activeTab === "current" ? b.status !== 3 : b.status === 3
  );

  const handlePrint = (bill) => {
    const win = window.open("", "", "width=400,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>Restaurant Bill</h2>
          <p>Table: ${bill.tableNo}</p>
          <p>Total: ₹${bill.totalAmount}</p>
          <p>Status: ${getStatusText(bill.status)}</p>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="p-6">

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-5 py-2 rounded-full ${
            activeTab === "current"
              ? "bg-orange-500 text-white"
              : "bg-white border"
          }`}
        >
          Current
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-5 py-2 rounded-full ${
            activeTab === "completed"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Bills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="bg-white p-5 rounded-xl shadow">

            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="font-bold">Table #{bill.tableNo}</h3>
              <span className={`px-3 py-1 rounded ${getStatusClass(bill.status)}`}>
                {getStatusText(bill.status)}
              </span>
            </div>

            {/* Content */}
            <p className="text-gray-600">Total: ₹{bill.totalAmount}</p>

            {bill.note && (
              <p className="text-sm mt-2 bg-yellow-50 p-2 rounded">
                📝 {bill.note}
              </p>
            )}

            {/* Actions */}
            <div className="mt-4">
              <button
                onClick={() => handlePrint(bill)}
                className="w-full bg-black text-white py-2 rounded"
              >
                🖨 Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}