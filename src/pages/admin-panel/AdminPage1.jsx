
import React, { useEffect, useState } from "react";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";
import { baseUrl } from "../../services/BaseUrl";

export default function AdminPage1() {
  const [dashboard, setDashboard] = useState(null);

  const getDashBoard = async () => {
    try {
      const res = await baseUrl.get("Dashboard");
      setDashboard(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashBoard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 max-w-6xl mx-auto mb-6">
        Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fa-solid fa-bag-shopping text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashboard ? dashboard.totalOrders : "..."}
            </p>
            <p className="text-sm text-gray-500">Orders Today</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              ₹{dashboard ? dashboard.revenue.toLocaleString("en-IN") : "..."}
            </p>
            <p className="text-sm text-gray-500">Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fa-solid fa-burger text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashboard ? dashboard.totalProducts : "..."}
            </p>
            <p className="text-sm text-gray-500">Products</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fa-solid fa-layer-group text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashboard ? dashboard.totalCategories : "..."}
            </p>
            <p className="text-sm text-gray-500">Categories</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto my-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-fire text-green-600"></i>
            Best Selling Products
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between"><span>Paneer Burger</span><span className="font-medium">120 orders</span></li>
            <li className="flex justify-between"><span>Cheese Pizza</span><span className="font-medium">98 orders</span></li>
            <li className="flex justify-between"><span>Cold Coffee</span><span className="font-medium">76 orders</span></li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-chart-pie text-green-600"></i>
            Best Selling Categories
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between"><span>Burgers</span><span className="font-medium">45%</span></li>
            <li className="flex justify-between"><span>Pizzas</span><span className="font-medium">30%</span></li>
            <li className="flex justify-between"><span>Beverages</span><span className="font-medium">25%</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}