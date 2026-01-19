import React from "react";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";

export default function AdminPage1() {
  return (
    <div className=" lg:flex min-h-screen bg-[#f6faf7]">
      
      {/* Sidebar */}
      <NavBar1 />

      {/* Main Content */}
      <div className="flex-1">
        <DashBoardBar1 name="Dashboard" />

        <div className="p-6">
          
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-800 max-w-6xl mx-auto mb-6">
            Overview
          </h1>

          {/* ===== Stats Cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Orders */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-bag-shopping text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">16</p>
                <p className="text-sm text-gray-500">Orders Today</p>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">₹4,500</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-burger text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">28</p>
                <p className="text-sm text-gray-500">Products</p>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-4 border border-green-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-layer-group text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">6</p>
                <p className="text-sm text-gray-500">Categories</p>
              </div>
            </div>
          </div>

          {/* ===== Bottom Section ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto my-10">

            {/* Best Selling Products */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-fire text-green-600"></i>
                Best Selling Products
              </h2>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Paneer Burger</span>
                  <span className="font-medium">120 orders</span>
                </li>
                <li className="flex justify-between">
                  <span>Cheese Pizza</span>
                  <span className="font-medium">98 orders</span>
                </li>
                <li className="flex justify-between">
                  <span>Cold Coffee</span>
                  <span className="font-medium">76 orders</span>
                </li>
              </ul>
            </div>

            {/* Best Selling Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-chart-pie text-green-600"></i>
                Best Selling Categories
              </h2>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Burgers</span>
                  <span className="font-medium">45%</span>
                </li>
                <li className="flex justify-between">
                  <span>Pizzas</span>
                  <span className="font-medium">30%</span>
                </li>
                <li className="flex justify-between">
                  <span>Beverages</span>
                  <span className="font-medium">25%</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
