import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { div } from "framer-motion/client";

const TableAdd = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await baseUrl.post("Table", data);
      toast.success("Table added successfully ✅");
      navigate("/tables");
    } catch (err) {
      toast.error("Failed to add table ❌");
    }
  };

  return (
   <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-10 border border-green-100">
  <div className="flex items-center gap-8 mb-8">
    <button
      onClick={() => navigate("/tables")}
      className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg"
    >
      <i className="fa-solid fa-angle-left"></i> Back
    </button>

    <span className="text-3xl font-bold">
      Create New Table
    </span>
  </div>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6"
  >
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Table Number
      </label>
      <div className="relative">
        <i className="fa-solid fa-hashtag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="number"
          placeholder="e.g. 12"
          {...register("tableNumber", {
            required: "Table number is required",
              min: { value: 1, message: "Enter a valid Table Number" }
          })}
          className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      {errors.tableNumber && (
        <p className="text-red-500 text-sm mt-1">
          {errors.tableNumber.message}
        </p>
      )}
    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Seating Capacity
      </label>
      <div className="relative">
        <i className="fa-solid fa-users absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="number"
          placeholder="e.g. 4"
          {...register("capacity", {
            required: "Capacity is required",
            min: { value: 1, message: "Minimum 1 seat required" },
          })}
          className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      {errors.capacity && (
        <p className="text-red-500 text-sm mt-1">
          {errors.capacity.message}
        </p>
      )}
    </div>

    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        defaultChecked
        {...register("isAvailable")}
        className="w-5 h-5 accent-green-600"
      />
      <label className="font-medium text-gray-700">
        Table Available
      </label>
    </div>

    <div className="flex justify-end pt-4">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-lg font-semibold shadow-md"
      >
        Add Table
      </button>
    </div>
  </form>
</div>

  );
};

export default TableAdd;
