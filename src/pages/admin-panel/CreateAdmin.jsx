
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

const ROLES = [
  { value: "1", label: "Admin" },
  { value: "2", label: "Chef" },
  { value: "3", label: "Server" },
  { value: "4", label: "Receptionist" },
];

const FormField = ({ label, error, children }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const CreateAdmin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized. Please login again.");
        navigate("/");
        return;
      }

      await baseUrl.post(
        "user",
        { ...data, role: Number(data.role) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User created successfully!");
      reset();
      navigate("/staff");
    } catch (error) {
      const msg = error.response?.data?.message;
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Access denied. Admins only.");
      } else {
        toast.error(msg || "Something went wrong.");
      }
    }
  };

  const inputClass = "w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-green-400";

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/staff")}
            className="w-32 bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold ms-6 text-gray-800">Create User</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Full Name" error={errors.name?.message}>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              className={inputClass}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className={inputClass}
            />
          </FormField>

          <FormField label="Phone" error={errors.mobileNo?.message}>
            <input
              type="text"
              {...register("mobileNo", {
                required: "Mobile no. is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
              })}
              className={inputClass}
            />
          </FormField>

          <FormField label="Role" error={errors.role?.message}>
            <select
              {...register("role", { required: "Role is required" })}
              className={inputClass}
            >
              <option value="">-- Select Role --</option>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={inputClass}
            />
          </FormField>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-44 bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;