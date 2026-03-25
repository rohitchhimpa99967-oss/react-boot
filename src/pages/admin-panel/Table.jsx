import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";

const TablePage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  const getTables = async () => {
    try {
      const res = await baseUrl.get("Table");
      setTables(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tables</h1>

        <button
          onClick={() => navigate("/tables/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
        >
          + Add Table
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Table No</th>
              <th className="p-4">Capacity</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {tables.map((table) => (
              <tr
                key={table.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">{table.tableNumber}</td>
                <td className="p-4">{table.capacity}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      table.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {table.isAvailable ? "Available" : "Occupied"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tables.length === 0 && (
          <p className="text-center p-6 text-gray-500">No tables found</p>
        )}
      </div>
    </div>
  );
};

export default TablePage;
